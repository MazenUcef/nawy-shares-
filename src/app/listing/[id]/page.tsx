/**
 * @file Post component for displaying detailed information about a listing.
 * @module Post
 * @description This component fetches listing data based on the provided `listingId` parameter,
 * displays the listing details, and includes functionality to edit or delete the listing.
 * It also handles error states when the listing cannot be loaded.
 * 
 * @param {Object} params - The parameters passed to the component.
 * @param {string} params.id - The ID of the listing to fetch and display.
 * @returns {JSX.Element} The rendered Post component.
 * 
 * @example
 * // Usage in a Next.js route
 * <Post params={{ id: "12345" }} />
 */

import img1 from "@/assets/images/download (1).jpeg";
import img2 from "@/assets/images/download (2).jpeg";
import img3 from "@/assets/images/download (3).jpeg";
import img4 from "@/assets/images/download.jpeg";
import img5 from "@/assets/images/Modern Living Room Penthouse minimalist Apartment skyline sunset view of NYC with modern sofa couch.jpeg";
import DeleteButton from "@/components/DeleteButton";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic'; // Force dynamic rendering (SSR)

/**
 * @async
 * @function Post
 * @param {Object} params - The parameters passed to the component.
 * @param {string} params.id - The ID of the listing to fetch and display.
 * @returns {JSX.Element} The rendered Post component.
 */

interface Params {
        id: string;
}

export default async function Post({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params; // Await the promise
    noStore(); // Ensure no caching for dynamic rendering
    let listing = null;
    const images = [img1, img2, img3, img4, img5];

    try {
        const res = await fetch('http://localhost:3000/api/listing/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listingId: resolvedParams.id }),
            cache: 'no-store', // Ensure no caching
        });
        const data = await res.json();
        listing = data[0];
    } catch (error) {
        console.error("Error fetching listing:", error);
        listing = { title: "Failed to Load listing" };
    }


    // Display an error message if the listing cannot be loaded
    if (!listing || listing.name === "Failed to load listing") {
        return (
            <main className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <h1 className="text-3xl font-bold text-[#244856] mb-4">
                        Listing Not Found
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Oops! The listing you are looking for could not be loaded. It may have been removed or there might be an issue with the connection.
                    </p>
                    <div className="flex flex-col space-y-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-[#e74833] text-white px-6 py-2 rounded-md hover:bg-[#d1402e] transition-colors"
                        >
                            Retry
                        </button>
                        <Link
                            href="/"
                            className="text-[#244856] hover:underline"
                        >
                            Go Back Home
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // Render the listing details
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Listing Header */}
                <div className="bg-white rounded-lg shadow-lg flex w-full justify-between p-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-[#244856] mb-4">
                            {listing.projectName}
                        </h1>
                        <p className="text-gray-600 mb-4">{listing.address}</p>
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="bg-[#e74833] text-white px-3 py-1 rounded-full text-sm">
                                {listing.sell ? "For Sale" : "For Rent"}
                            </span>
                            {listing.offer && (
                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                    Special Offer
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Link className={`bg-[#e74833] rounded-md h-10 w-20 flex justify-center items-center text-white`} href={`/update-listing/${listing._id}`}>
                            Edit Post
                        </Link>
                        <DeleteButton listingId={listing._id} /> {/* Use the DeleteButton */}
                    </div>
                </div>

                {/* Listing Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="relative h-96 rounded-lg overflow-hidden">
                        <Image
                            src={images[0]} // Use the first image as the main image
                            alt={'Main Listing Image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {images.slice(1).map((img, index) => ( // Loop through the remaining images
                            <div
                                key={index}
                                className="relative h-48 rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={img}
                                    alt={`Listing Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Listing Details */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-[#244856] mb-4">
                        Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <p className="text-gray-600">Unit Name</p>
                            <p className="text-[#244856] font-semibold">
                                {listing.unitName}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Unit Number</p>
                            <p className="text-[#244856] font-semibold">
                                {listing.unitNumber}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Beds</p>
                            <p className="text-[#244856] font-semibold">
                                {listing.beds}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Baths</p>
                            <p className="text-[#244856] font-semibold">
                                {listing.baths}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Parking Spot</p>
                            <p className="text-[#244856] font-semibold">
                                {listing.parkingSpot ? "Yes" : "No"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Furnished</p>
                            <p className="text-[#244856] font-semibold">
                                {listing.furnished ? "Yes" : "No"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-[#244856] mb-4">
                        Description
                    </h2>
                    <p className="text-gray-600">{listing.description}</p>
                </div>

                {/* Price */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-[#244856] mb-4">
                        Price
                    </h2>
                    <p className="text-3xl font-bold text-[#e74833]">
                        ${listing.regularPrice}{" "}
                        <span className="text-lg text-gray-600"></span>
                    </p>
                </div>
            </div>
        </div>
    );
}