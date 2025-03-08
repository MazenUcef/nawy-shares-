import Listing from "@/lib/modals/listing.modal";
import { connect } from "@/lib/mongod/mongoose";

/**
 * DELETE API Route Handler for Deleting a Listing
 * 
 * This function handles the deletion of a property listing by its `listingId`. It first connects to the MongoDB database,
 * then attempts to find and delete the listing. If the listing is not found, it returns a 404 error. If the deletion is
 * successful, it returns a success message. In case of any server errors, it returns a 500 error.
 * 
 * @async
 * @function
 * @param {Request} req - The incoming HTTP request object containing the `listingId` in JSON format.
 * @returns {Response} - Returns a JSON response indicating success or failure, along with appropriate status codes.
 * 
 * @example
 * // Example request body:
 * // {
 * //   "listingId": "650a1b2c3d4e5f6a7b8c9d0"
 * // }
 * 
 * // Example response for successful deletion:
 * // {
 * //   "success": true,
 * //   "message": "Property deleted successfully."
 * // }
 * 
 * // Example response if listing is not found:
 * // {
 * //   "success": false,
 * //   "message": "Property not found."
 * // }
 * 
 * // Example response for server error:
 * // {
 * //   "success": false,
 * //   "message": "Internal Server Error"
 * // }
 */
export const DELETE = async (req: Request) => {
    // Connect to the MongoDB database
    await connect();

    // Parse the request body to extract the listingId
    const data = await req.json();

    try {
        // Attempt to find and delete the listing by its ID
        const deletedListing = await Listing.findByIdAndDelete(data.listingId);

        // If the listing is not found, return a 404 error
        if (!deletedListing) {
            return new Response(JSON.stringify({ success: false, message: "Property not found." }), {
                status: 404,
            });
        }

        // Return a success message if the listing is deleted
        return new Response(JSON.stringify({ success: true, message: "Property deleted successfully." }), {
            status: 200,
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.log("Error deleting property:", error);

        // Return a 500 error for server errors
        return new Response(JSON.stringify({ success: false, message: "Internal Server Error" }), {
            status: 500,
        });
    }
};