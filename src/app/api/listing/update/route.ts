import Listing from "@/lib/modals/listing.modal";
import { connect } from "@/lib/mongod/mongoose";

/**
 * POST API Route Handler for Updating a Listing
 * 
 * This function updates an existing property listing in the database. It uses the `listingId` to find the listing and applies
 * the updates provided in the `formData` object. If the listing is not found, it returns a 404 error. If the update is successful,
 * it returns the updated listing's ID and a success message. In case of any server errors, it returns a 500 error.
 * 
 * @async
 * @function
 * @param {Request} req - The incoming HTTP request object containing the `listingId` and updated `formData` in JSON format.
 * @returns {Response} - Returns a JSON response indicating success or failure, along with appropriate status codes.
 * 
 * @example
 * // Example request body:
 * // {
 * //   "listingId": "650a1b2c3d4e5f6a7b8c9d0",
 * //   "formData": {
 * //     "projectName": "Sunrise Apartments",
 * //     "unitName": "Unit A",
 * //     "unitNumber": "101",
 * //     "description": "A spacious 2-bedroom apartment.",
 * //     "address": "123 Main St, City, Country",
 * //     "sell": true,
 * //     "rent": false,
 * //     "parkingSpot": true,
 * //     "furnished": true,
 * //     "offer": false,
 * //     "beds": 2,
 * //     "baths": 2,
 * //     "regularPrice": 2000
 * //   }
 * // }
 * 
 * // Example response for successful update:
 * // {
 * //   "id": "650a1b2c3d4e5f6a7b8c9d0",
 * //   "success": true
 * // }
 * 
 * // Example response if listing is not found:
 * // {
 * //   "success": false,
 * //   "message": "Listing not found"
 * // }
 * 
 * // Example response for server error:
 * // {
 * //   "success": false,
 * //   "message": "Error updating post"
 * // }
 */
export const POST = async (req: Request) => {
    try {
        // Connect to the MongoDB database
        await connect();

        // Parse the request body to extract the listingId and formData
        const data = await req.json();

        // Find and update the listing by its ID
        const updatedPost = await Listing.findByIdAndUpdate(
            data.listingId, // The ID of the listing to update
            {
                $set: {
                    projectName: data.formData.projectName,
                    unitName: data.formData.unitName,
                    unitNumber: data.formData.unitNumber,
                    description: data.formData.description,
                    address: data.formData.address,
                    sell: data.formData.sell,
                    rent: data.formData.rent,
                    parkingSpot: data.formData.parkingSpot,
                    furnished: data.formData.furnished,
                    offer: data.formData.offer,
                    beds: data.formData.beds,
                    baths: data.formData.baths,
                    regularPrice: data.formData.regularPrice,
                },
            },
            { new: true } // Return the updated document
        );

        // If the listing is not found, return a 404 error
        if (!updatedPost) {
            return new Response(JSON.stringify({ success: false, message: "Listing not found" }), {
                status: 404,
            });
        }

        // Return the updated listing's ID and success status
        return new Response(JSON.stringify({ id: updatedPost._id, success: true }), {
            status: 200,
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.log('Error updating post:', error);

        // Return a 500 error for server errors
        return new Response(JSON.stringify({ success: false, message: "Error updating post" }), {
            status: 500,
        });
    }
};