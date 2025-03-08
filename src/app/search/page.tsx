/**
 * @file SearchPage component for searching and displaying property listings.
 * @module SearchPage
 * @description This component allows users to search for property listings based on various filters (e.g., search term, sell/rent, parking, furnished, offer).
 * It fetches listings from an API, displays them in a grid, and provides a "Show More" button for pagination.
 * 
 * @returns {JSX.Element} The rendered SearchPage component.
 * 
 * @example
 * // Usage in a Next.js route
 * <SearchPage />
 */

"use client";
import { useEffect, useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaBed, FaBath } from "react-icons/fa";
import img1 from "@/assets/images/download (1).jpeg";
import img2 from "@/assets/images/download (2).jpeg";
import img3 from "@/assets/images/download (3).jpeg";
import img4 from "@/assets/images/download.jpeg";
import img5 from "@/assets/images/Modern Living Room Penthouse minimalist Apartment skyline sunset view of NYC with modern sofa couch.jpeg";
import Link from "next/link";

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

// Define the type for the sidebar data
interface SidebarData {
    searchTerm: string;
    sell: boolean;
    rent: boolean;
    parkingSpot: boolean;
    furnished: boolean;
    offer: boolean;
}

/**
 * @function SearchPage
 * @description The main component for searching and displaying property listings.
 * It includes a sidebar for search filters and a main content area for displaying the listings.
 * 
 * @returns {JSX.Element} The rendered SearchPage component.
 */
export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State for search filters and listings
    const [sidebardata, setSidebardata] = useState<SidebarData>({
        searchTerm: "",
        sell: true,
        rent: false,
        parkingSpot: false,
        furnished: false,
        offer: false,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [listings, setListings] = useState<Listing[]>([]); // Ensure listings is always an array
    const [showMore, setShowMore] = useState<boolean>(false);

    // Array of placeholder images
    const placeholderImages = [img1, img2, img3, img4, img5];

    /**
     * @function fetchListings
     * @description Fetches listings from the API based on the current search filters.
     * Updates the `listings` state and handles pagination with the `showMore` state.
     * 
     * @async
     * @returns {Promise<void>}
     */
    const fetchListings = useCallback(async () => {
        setLoading(true);
        setShowMore(false);
        try {
            const res = await fetch("/api/listing/get", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    searchTerm: sidebardata.searchTerm,
                    sell: sidebardata.sell,
                    rent: sidebardata.rent,
                    parkingSpot: sidebardata.parkingSpot,
                    furnished: sidebardata.furnished,
                    offer: sidebardata.offer,
                    startIndex: 0,  // Starting index for pagination
                    limit: 9         // Number of listings to fetch per request
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to fetch listings.");
            }

            const data = await res.json();

            // Ensure data is an array
            if (Array.isArray(data)) {
                if (data.length > 8) {
                    setShowMore(true);
                }
                setListings(data);
            } else {
                console.error("API response is not an array:", data);
                setListings([]); // Fallback to an empty array
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
            setListings([]); // Fallback to an empty array
        } finally {
            setLoading(false);
        }
    }, [sidebardata]); // Add sidebardata as a dependency

    /**
     * @function useEffect
     * @description Updates the `sidebardata` state based on URL search parameters when the component mounts or searchParams change.
     */
    useEffect(() => {
        const urlParams = new URLSearchParams(searchParams);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const sellFromUrl = urlParams.get("sell");
        const rentFromUrl = urlParams.get("rent");
        const parkingFromUrl = urlParams.get("parkingSpot");
        const furnishedFromUrl = urlParams.get("furnished");
        const offerFromUrl = urlParams.get("offer");

        if (
            searchTermFromUrl ||
            sellFromUrl ||
            rentFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || "",
                sell: sellFromUrl === "true" ? true : false,
                rent: rentFromUrl === "true" ? true : false,
                parkingSpot: parkingFromUrl === "true" ? true : false,
                furnished: furnishedFromUrl === "true" ? true : false,
                offer: offerFromUrl === "true" ? true : false,
            });
        }
    }, [searchParams]);

    /**
     * @function useEffect
     * @description Fetches listings whenever the `fetchListings` function changes (e.g., when `sidebardata` is updated).
     */
    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    /**
     * @function handleChange
     * @description Handles changes to the search filters in the sidebar form.
     * Updates the `sidebardata` state based on the input field that triggered the change.
     * 
     * @param {ChangeEvent<HTMLInputElement>} e - The change event from the input field.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, checked } = e.target;

        if (id === "searchTerm") {
            setSidebardata({ ...sidebardata, searchTerm: value });
        } else if (id === "sell" || id === "rent") {
            setSidebardata({ ...sidebardata, [id]: checked });
        } else if (id === "parking" || id === "furnished" || id === "offer") {
            setSidebardata({ ...sidebardata, [id]: checked });
        }
    };

    /**
     * @function handleSubmit
     * @description Handles the form submission for the search filters.
     * Updates the URL with the current search parameters and triggers a new fetch for listings.
     * 
     * @param {FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sidebardata.searchTerm);
        urlParams.set("sell", sidebardata.sell.toString());
        urlParams.set("rent", sidebardata.rent.toString());
        urlParams.set("parking", sidebardata.parkingSpot.toString());
        urlParams.set("furnished", sidebardata.furnished.toString());
        urlParams.set("offer", sidebardata.offer.toString());
        const searchQuery = urlParams.toString();
        router.push(`/search?${searchQuery}`);
    };

    /**
     * @function onShowMoreClick
     * @description Handles the "Show More" button click to fetch additional listings for pagination.
     * Updates the `listings` state with the new data and hides the "Show More" button if no more listings are available.
     * 
     * @async
     * @returns {Promise<void>}
     */
    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(searchParams);
        urlParams.set("startIndex", startIndex.toString());
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
            if (data.length < 9) {
                setShowMore(false);
            }
            setListings([...listings, ...data]);
        } else {
            console.error("API response is not an array:", data);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="p-7 border-b-2 md:border-r-2">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Search Term */}
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Search Button */}
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
                        Search
                    </button>
                </form>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
                    Listing results:
                </h1>
                <div className="p-7 flex flex-wrap gap-4">
                    {/* Loading State */}
                    {loading && (
                        <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
                    )}

                    {/* No Listings Found */}
                    {!loading && listings.length === 0 && (
                        <p className="text-xl text-slate-700">No listings found!</p>
                    )}

                    {/* Display Listings */}
                    {!loading && listings.length > 0 &&
                        listings.map((listing, index) => (
                            <Link
                                href={`/listing/${listing._id}`}
                                key={listing._id}
                                className="bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-[48%] lg:w-[31%]"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={listing.image || placeholderImages[index % placeholderImages.length]}
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
                                            <span className="ml-2 text-gray-600">{listing.beds} Beds</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaBath className="text-[#e74833]" />
                                            <span className="ml-2 text-gray-600">{listing.baths} Baths</span>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-[#e74833]">
                                        ${listing.regularPrice}{" "}
                                        <span className="text-lg text-gray-600">/ month</span>
                                    </p>
                                </div>
                            </Link>
                        ))}

                    {/* Show More Button */}
                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className="text-green-700 hover:underline p-7 text-center w-full"
                        >
                            Show more
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}