/**
 * @file DeleteButton component for deleting a property listing.
 * @module DeleteButton
 * @description This component provides a button to delete a property listing. It sends a DELETE request to the server
 * and handles the response, displaying success or error messages using toast notifications.
 * 
 * @param {Object} props - The props passed to the component.
 * @param {string} props.listingId - The ID of the listing to be deleted.
 * @returns {JSX.Element} The rendered DeleteButton component.
 * 
 * @example
 * // Usage in a parent component
 * <DeleteButton listingId="12345" />
 */

"use client"; // Mark this as a Client Component

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



interface PageProps {
    listingId: string;
}
/**
 * @function DeleteButton
 * @description A button component that deletes a property listing when clicked.
 * It sends a DELETE request to the server and handles the response, displaying success or error messages.
 * 
 * @param {Object} props - The props passed to the component.
 * @param {string} props.listingId - The ID of the listing to be deleted.
 * @returns {JSX.Element} The rendered DeleteButton component.
 */
export default function DeleteButton({ listingId }: PageProps) {
    const router = useRouter(); // Next.js router for navigation

    /**
     * @function handleDelete
     * @description Handles the deletion of a property listing.
     * Sends a DELETE request to the server and handles the response.
     * 
     * @async
     * @returns {Promise<void>}
     */
    const handleDelete = async () => {
        try {
            const response = await fetch('/api/listing/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ listingId }), // Send the listing ID to the server
            });

            const result = await response.json(); // Parse the response

            if (result.success) {
                toast.success('Property deleted successfully.'); // Display success message
                router.push('/'); // Redirect to home page after deletion
            } else {
                toast.error(result.message || 'Failed to delete property.'); // Display error message
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            toast.error('Internal Server Error'); // Display generic error message
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-[#e74933] cursor-pointer rounded-md h-10 w-20 flex justify-center items-center text-white"
        >
            Delete
        </button>
    );
}