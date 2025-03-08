import Listing from "@/lib/modals/listing.modal";
import { connect } from "@/lib/mongod/mongoose";

/**
 * POST API Route Handler for Fetching Listings
 * 
 * This function retrieves property listings based on search criteria, pagination, and sorting. It supports filtering by `userId`,
 * `listingId`, and a search term that can match `projectName`, `unitName`, or `unitNumber`. The results are paginated and sorted
 * by the `updatedAt` field in either ascending or descending order.
 * 
 * @async
 * @function
 * @param {Request} req - The incoming HTTP request object containing the search criteria, pagination, and sorting parameters in JSON format.
 * @returns {Response} - Returns a JSON response containing the fetched listings or an error message, along with appropriate status codes.
 * 
 * @example
 * // Example request body:
 * // {
 * //   "startIndex": 0, // Starting index for pagination (default: 0)
 * //   "limit": 9,      // Number of listings to return per page (default: 9)
 * //   "order": "desc", // Sorting order ("asc" or "desc", default: "desc")
 * //   "searchTerm": "Sunrise Apartments", // Search term for projectName, unitName, or unitNumber
 * //   "userId": "650a1b2c3d4e5f6a7b8c9d0", // Optional: Filter by userId
 * //   "listingId": "650a1b2c3d4e5f6a7b8c9d1" // Optional: Filter by listingId
 * // }
 * 
 * // Example response for successful fetch:
 * // [
 * //   {
 * //     "_id": "650a1b2c3d4e5f6a7b8c9d0",
 * //     "projectName": "Sunrise Apartments",
 * //     "unitName": "Unit A",
 * //     "unitNumber": 101,
 * //     "description": "A spacious 2-bedroom apartment.",
 * //     "address": "123 Main St, City, Country",
 * //     "sell": true,
 * //     "rent": false,
 * //     "parkingSpot": true,
 * //     "furnished": true,
 * //     "offer": false,
 * //     "beds": 2,
 * //     "baths": 2,
 * //     "regularPrice": 2000,
 * //     "updatedAt": "2023-10-01T12:34:56.789Z"
 * //   },
 * //   ...
 * // ]
 * 
 * // Example response for server error:
 * // {
 * //   "success": false,
 * //   "message": "Internal Server Error"
 * // }
 */
export const POST = async (req: Request) => {
    // Connect to the MongoDB database
    await connect();

    // Parse the request body to extract search criteria, pagination, and sorting parameters
    const data = await req.json();

    try {
        // Parse pagination and sorting parameters
        const startIndex = parseInt(data.startIndex) || 0; // Default start index: 0
        const limit = parseInt(data.limit) || 9; // Default limit: 9
        const sortDirection = data.order === 'asc' ? 1 : -1; // Sort direction: 1 for ascending, -1 for descending

        // Determine if the search term is numeric
        const isNumericSearch = !isNaN(Number(data.searchTerm?.trim()));

        // Fetch listings based on search criteria
        const listings = await Listing.find({
            ...(data.userId && { userId: data.userId }), // Filter by userId if provided
            ...(data.listingId && { _id: data.listingId }), // Filter by listingId if provided
            ...(data.searchTerm?.trim() && {
                $or: isNumericSearch
                    ? [
                        { unitNumber: Number(data.searchTerm.trim()) }, // Search unitNumber if search term is numeric
                    ]
                    : [
                        { projectName: { $regex: data.searchTerm.trim().toLowerCase(), $options: 'i' } }, // Case-insensitive search for projectName
                        { unitName: { $regex: data.searchTerm.trim().toLowerCase(), $options: 'i' } }, // Case-insensitive search for unitName
                    ],
            }),
        })
            .sort({ updatedAt: sortDirection }) // Sort by updatedAt field
            .skip(startIndex) // Skip results for pagination
            .limit(limit); // Limit the number of results

        // Return the fetched listings
        return new Response(JSON.stringify(listings), {
            status: 200,
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.log('Error getting posts:', error);

        // Return a 500 error for server errors
        return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
            status: 500,
        });
    }
};