/**
 * @file Header component for the application.
 * @module Header
 * @description This component provides the main header for the application, including a logo, search bar, and navigation links.
 * It handles search functionality by updating the URL with the search term and redirecting to the search page.
 * 
 * @returns {JSX.Element} The rendered Header component.
 * 
 * @example
 * // Usage in a Next.js app
 * <Header />
 */

"use client"; // Mark this as a Client Component

import Logo from '@/assets/icons/Logo';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

/**
 * @function Header
 * @description The main header component for the application. It includes a logo, search bar, and navigation links.
 * It handles search functionality by updating the URL with the search term and redirecting to the search page.
 * 
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
    const searchParams = useSearchParams(); // Access URL search parameters
    const router = useRouter(); // Next.js router for navigation
    const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search term

    /**
     * @function useEffect
     * @description Updates the search term state based on the URL search parameters when the component mounts or searchParams change.
     */
    useEffect(() => {
        const urlParams = new URLSearchParams(searchParams);
        const searchTermsFromUrl = urlParams.get('searchTerm');
        if (searchTermsFromUrl) {
            setSearchTerm(searchTermsFromUrl); // Set the search term from the URL
        }
    }, [searchParams]);

    /**
     * @function handleSubmit
     * @description Handles the form submission for the search bar.
     * Updates the URL with the search term and redirects to the search page.
     * 
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(searchParams);
        urlParams.set('searchTerm', searchTerm); // Set the search term in the URL
        const searchQuery = urlParams.toString();
        router.push(`/search?${searchQuery}`); // Redirect to the search page
    };

    return (
        <header className='bg-[#244857] shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                {/* Logo */}
                <Link href={'/'}>
                    <h1 className='font-bold text-sm sm:text-xl flex items-center gap-2 flex-wrap'>
                        <Logo />
                        <span className='text-[#e74933] font-bold'>Nawy</span>
                    </h1>
                </Link>

                {/* Search Bar */}
                <form
                    onSubmit={handleSubmit}
                    className='bg-[#90aeae] p-3 rounded-lg flex items-center'
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                    />
                    <button type="submit">
                        <FaSearch className='text-[#e74933]' />
                    </button>
                </form>

                {/* Navigation Links */}
                <ul className='flex gap-4 items-center font-bold'>
                    <Link href={'/'}>
                        <li className='hidden md:inline text-[#e74933] hover:text-[#90aeae]'>
                            Home
                        </li>
                    </Link>
                    <Link href={'/about'}>
                        <li className='hidden md:inline text-[#e74933] hover:text-[#90aeae]'>
                            About
                        </li>
                    </Link>
                    <Link href={'/create-listing'}>
                        <li className='inline text-[#e74933] hover:text-[#90aeae]'>
                            Create Post
                        </li>
                    </Link>
                </ul>
            </div>
        </header>
    );
};

export default Header;