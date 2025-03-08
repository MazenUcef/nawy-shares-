/**
 * @file Home component for displaying the main landing page.
 * @module Home
 * @description This component serves as the main landing page of the application. It includes a hero section,
 * a grid of property listings fetched from an API, and a footer. It also handles loading states and error messages.
 * 
 * @returns {JSX.Element} The rendered Home component.
 * 
 * @example
 * // Usage in a Next.js route
 * <Home />
 */

import Link from 'next/link';
import img1 from "@/assets/images/download (1).jpeg";
import img2 from "@/assets/images/download (2).jpeg";
import img3 from "@/assets/images/download (3).jpeg";
import img4 from "@/assets/images/download.jpeg";
import img5 from "@/assets/images/Modern Living Room Penthouse minimalist Apartment skyline sunset view of NYC with modern sofa couch.jpeg";
import Image from 'next/image';
import { FaBath, FaBed } from 'react-icons/fa';

// Define the type for a listing
interface Listing {
  _id: string;
  projectName: string;
  address: string;
  beds: number;
  baths: number;
  regularPrice: number;
  image?: string;
}

/**
 * @function Home
 * @description The main landing page component. It displays a hero section, a grid of property listings,
 * and a footer. It fetches listings from an API and handles loading and error states.
 * 
 * @returns {JSX.Element} The rendered Home component.
 */
export default async function Home() {
  const images = [img1, img2, img3, img4, img5]; // Array of placeholder images
  let allListings: Listing[] | { title: string } = []; // State for fetched listings

  try {
    // Fetch listings from the API
    const result = await fetch('http://localhost:3000/api/listing/get', {
      method: 'POST',
      body: JSON.stringify({
        limit: 8,
        order: 'asc',
      }),
      cache: 'no-store',
    });
    const data = await result.json();
    allListings = data; // Update the listings state with fetched data
  } catch (error) {
    console.error("Error fetching listings:", error);
    allListings = { title: 'Failed to load listing' }; // Fallback to an error state
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-5xl font-bold mb-6">Find Your Dream Home</h1>
            <p className="text-xl mb-8">
              Explore thousands of Apartmentes for sale and rent across the
              country.
            </p>
            <Link href={'/search'} className="bg-[#e74833] text-white px-8 py-3 rounded-lg text-lg hover:bg-[#d1402e] transition-colors">
              Browse Listings
            </Link>
          </div>
        </div>
      </div>

      {/* All Listings */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-[#244856] mb-8 text-center">
          Apartmentes For Sale Or Rent
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.isArray(allListings) && allListings.length > 0 ? (
            allListings.map((listing: Listing, index: number) => (
              <Link
                href={`/listing/${listing._id}`}
                key={listing._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={listing.image || images[index % images.length]}
                    alt={listing.projectName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#244856] mb-2">
                    {listing.projectName}
                  </h3>
                  <p className="text-gray-600 mb-4">{listing.address}</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <FaBed className="text-[#e74833]" />
                      <span className="ml-2 text-gray-600">
                        {listing.beds} Beds
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="text-[#e74833]" />
                      <span className="ml-2 text-gray-600">
                        {listing.baths} Baths
                      </span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#e74833]">
                    ${listing.regularPrice}{" "}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No Apartmentes available.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#244856] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}