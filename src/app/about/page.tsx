/**
 * About Page Component
 * 
 * This component represents the "About Us" page of the platform. It provides information about the platform's mission, vision, features, and team.
 * The page is structured into several sections: Hero, Introduction, Mission and Vision, Features, Team, and Footer.
 * 
 * @component
 * @example
 * return (
 *   <About />
 * )
 */
"use client";
import Image from "next/image";
import { FaBuilding, FaUsers, FaHandshake, FaChartLine } from "react-icons/fa";
import profilepic from '@/assets/images/profielpic.jpg';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="relative h-[400px] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white max-w-2xl px-4">
                        <h1 className="text-5xl font-bold mb-6">About Us</h1>
                        <p className="text-xl">
                            Discover the story behind our mission to revolutionize property
                            listings.
                        </p>
                    </div>
                </div>
            </div>

            {/* Introduction Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-[#244856] mb-6">
                        Welcome to Our Platform
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        Our platform is designed to make property hunting seamless,
                        efficient, and enjoyable. Whether you are looking to buy, rent, or
                        explore special offers, we provide a comprehensive solution tailored
                        to your needs.
                    </p>
                </div>
            </div>

            {/* Mission and Vision Section */}
            <div className="bg-[#244856] text-white py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-gray-300 text-lg">
                                Our mission is to empower users by providing a transparent,
                                user-friendly platform for property listings. We aim to simplify
                                the process of finding the perfect home or investment property.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                            <p className="text-gray-300 text-lg">
                                We envision a world where everyone can easily access and explore
                                property listings, making informed decisions with confidence and
                                ease.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-[#244856] mb-8 text-center">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <FaBuilding className="text-4xl text-[#e74833] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-[#244856] mb-2">
                            Extensive Listings
                        </h3>
                        <p className="text-gray-600">
                            Explore thousands of properties for sale and rent across the
                            country.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <FaUsers className="text-4xl text-[#e74833] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-[#244856] mb-2">
                            User-Friendly
                        </h3>
                        <p className="text-gray-600">
                            Our platform is designed to be intuitive and easy to navigate.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <FaHandshake className="text-4xl text-[#e74833] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-[#244856] mb-2">
                            Trusted Partners
                        </h3>
                        <p className="text-gray-600">
                            We collaborate with trusted real estate agents and property owners.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <FaChartLine className="text-4xl text-[#e74833] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-[#244856] mb-2">
                            Market Insights
                        </h3>
                        <p className="text-gray-600">
                            Get access to the latest market trends and insights.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-[#f8f9fa] py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-[#244856] mb-8 text-center">
                        Meet Our Team
                    </h2>
                    <div className="flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="relative h-48 w-48 mx-auto mb-4">
                                <Image
                                    src={profilepic} // Replace with actual image paths
                                    alt="Team Member 1"
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-[#244856] mb-2">
                                Mazen Youssef
                            </h3>
                            <p className="text-gray-600">Full Stack Developer</p>
                        </div>
                    </div>
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