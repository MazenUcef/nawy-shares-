"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

/**
 * CreateListing Component
 * 
 * This component provides a form for creating a new property listing. It includes fields for project details, unit information,
 * listing options, and pricing. The form data is submitted to the `/api/listing/create` endpoint. Upon successful submission,
 * the user is redirected to the newly created listing's page. Error handling and loading states are also managed.
 * 
 * @component
 * @example
 * return (
 *   <CreateListing />
 * )
 */
export default function CreateListing() {
    const [loading, setLoading] = useState(false); // Loading state for form submission
    const router = useRouter(); // Next.js router for navigation

    // State to manage form data
    const [formData, setFormData] = useState({
        projectName: '',
        unitName: '',
        unitNumber: '',
        description: '',
        address: '',
        sell: false,
        rent: true,
        parkingSpot: true,
        furnished: true,
        offer: true,
        beds: 1,
        baths: 1,
        regularPrice: 0,
    });

    /**
     * Handles changes to form inputs.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value, // Handle checkboxes and other inputs differently
        }));
    };

    /**
     * Handles form submission.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true); // Set loading state to true

            // Log the form data being sent
            console.log("Form data being sent:", formData);

            // Send a POST request to the API endpoint
            const res = await fetch(`/api/listing/create`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            // Handle API response
            if (data.success === false) {
                console.log(data);
                toast.error(data.message); // Display error message from the backend
            } else {
                toast.success("Post created successfully"); // Display success message
                router.push(`/listing/${data.id}`); // Redirect to the new listing's page
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred. Please try again."); // Display generic error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="bg-gray-100 p-6 min-h-screen flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-[#244856] mb-6">Create a Listing</h1>
                <form onSubmit={handleSubmit}>
                    {/* Project Name, Unit Name, and Unit Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-[#244856]">Project Name</label>
                            <input
                                type="text"
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#244856] rounded-md shadow-sm focus:outline-none focus:ring-[#e74833] focus:border-[#e74833]"
                                placeholder="Project Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#244856]">Unit Name</label>
                            <input
                                type="text"
                                name="unitName"
                                value={formData.unitName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#244856] rounded-md shadow-sm focus:outline-none focus:ring-[#e74833] focus:border-[#e74833]"
                                placeholder="Unit Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#244856]">Unit Number</label>
                            <input
                                type="number"
                                name="unitNumber"
                                value={formData.unitNumber}
                                onChange={handleChange}
                                min={0}
                                className="mt-1 block w-full px-3 py-2 border border-[#244856] rounded-md shadow-sm focus:outline-none focus:ring-[#e74833] focus:border-[#e74833]"
                                placeholder="Unit Number"
                                required
                            />
                        </div>
                    </div>

                    {/* Description and Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-[#244856]">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#244856] rounded-md shadow-sm focus:outline-none focus:ring-[#e74833] focus:border-[#e74833]"
                                placeholder="Description"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#244856]">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#244856] rounded-md shadow-sm focus:outline-none focus:ring-[#e74833] focus:border-[#e74833]"
                                placeholder="Address"
                                required
                            />
                        </div>
                    </div>

                    {/* Listing Options */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-[#244856] mb-4">Listing Options</h2>
                        <div className="space-y-4">
                            {['sell', 'rent', 'parkingSpot', 'furnished'].map((option) => (
                                <label key={option} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name={option}
                                        checked={formData[option as keyof typeof formData] as boolean}
                                        onChange={handleChange}
                                        className="form-checkbox h-5 w-5 text-[#e74833]"
                                    />
                                    <span className="ml-2 text-[#244856] capitalize">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Beds, Baths, and Price */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-[#244856]">Beds</label>
                            <input
                                type="number"
                                name="beds"
                                value={formData.beds}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#244856] rounded-md shadow-sm focus:outline-none focus:ring-[#e74833] focus:border-[#e74833]"
                                min={1}
                                max={10}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#244856]">Baths</label>
                            <input
                                type="number"
                                name="baths"
                                value={formData.baths}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#244856] rounded-md shadow-sm focus:outline-none focus:ring-[#e74833] focus:border-[#e74833]"
                                min={1}
                                max={10}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#244856]">
                                Regular price ($)
                            </label>
                            <input
                                type="number"
                                name="regularPrice"
                                value={formData.regularPrice}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-[#244856] rounded-md shadow-sm focus:outline-none focus:ring-[#e74833] focus:border-[#e74833]"
                                min={0}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex w-full">
                        <button
                            type="submit"
                            disabled={loading} // Disable the button when loading
                            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${loading ? 'bg-[#e74833]/50 cursor-not-allowed' : 'bg-[#e74833] hover:bg-[#d1402e]'
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e74833] w-full`}
                        >
                            {loading ? 'Creating...' : 'Create Post'} {/* Change button text based on loading state */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}