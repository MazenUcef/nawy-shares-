import Listing from "@/lib/modals/listing.modal";
import { connect } from "@/lib/mongod/mongoose";

/**
 * POST API Route Handler for Creating a New Listing
 * 
 * This function handles the creation of a new property listing. It ensures that the `unitName` and `unitNumber` are unique
 * before creating the listing. If duplicates are found, it returns an error response. Otherwise, it creates and saves the
 * new listing to the database.
 * 
 * @async
 * @function
 * @param {Request} req - The incoming HTTP request object containing the listing data in JSON format.
 * @returns {Response} - Returns a JSON response indicating success or failure, along with appropriate status codes.
 * 
 * @example
 * // Example request body:
 * // {
 * //   "projectName": "Sunrise Apartments",
 * //   "unitName": "Unit A",
 * //   "unitNumber": "101",
 * //   "description": "A spacious 2-bedroom apartment.",
 * //   "address": "123 Main St, City, Country",
 * //   "sell": true,
 * //   "rent": false,
 * //   "parkingSpot": true,
 * //   "furnished": true,
 * //   "offer": false,
 * //   "beds": 2,
 * //   "baths": 2,
 * //   "regularPrice": 2000
 * // }
 * 
 * // Example response for success:
 * // {
 * //   "id": "650a1b2c3d4e5f6a7b8c9d0",
 * //   "success": true
 * // }
 * 
 * // Example response for duplicate unitName:
 * // {
 * //   "success": false,
 * //   "message": "Unit Name already exists. Please choose a unique Unit Name."
 * // }
 * 
 * // Example response for duplicate unitNumber:
 * // {
 * //   "success": false,
 * //   "message": "Unit Number already exists. Please choose a unique Unit Number."
 * // }
 * 
 * // Example response for server error:
 * // {
 * //   "success": false,
 * //   "message": "Internal Server Error. Please try again later."
 * // }
 */
export const POST = async (req: Request) => {
    try {
        // Connect to the MongoDB database
        await connect();

        // Parse the request body to extract listing data
        const data = await req.json();

        // Check for duplicate unitName
        const existingUnitName = await Listing.findOne({ unitName: data.unitName });
        if (existingUnitName) {
            return new Response(
                JSON.stringify({ success: false, message: "Unit Name already exists. Please choose a unique Unit Name." }),
                { status: 400 }
            );
        }

        // Check for duplicate unitNumber
        const existingUnitNumber = await Listing.findOne({ unitNumber: data.unitNumber });
        if (existingUnitNumber) {
            return new Response(
                JSON.stringify({ success: false, message: "Unit Number already exists. Please choose a unique Unit Number." }),
                { status: 400 }
            );
        }

        // Create a new listing if no duplicates are found
        const newListing = await Listing.create({
            projectName: data.projectName,
            unitName: data.unitName,
            unitNumber: data.unitNumber,
            description: data.description,
            address: data.address,
            sell: data.sell,
            rent: data.rent,
            parkingSpot: data.parkingSpot,
            furnished: data.furnished,
            offer: data.offer,
            beds: data.beds,
            baths: data.baths,
            regularPrice: data.regularPrice,
        });

        // Save the new listing to the database
        await newListing.save();

        // Return the created listing's ID and success status
        return new Response(JSON.stringify({ id: newListing._id, success: true }), {
            status: 200,
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.log('Error creating post:', error);

        // Return a generic error message for server errors
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error. Please try again later." }),
            { status: 500 }
        );
    }
};