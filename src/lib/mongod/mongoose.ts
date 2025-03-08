/**
 * @file Database connection utility.
 * @module connect
 * @description This utility function connects to a MongoDB database using Mongoose.
 * It implements a caching mechanism to avoid creating multiple connections to the database.
 * 
 * @requires mongoose
 */

import mongoose from "mongoose";

// Define a type for the cached connection
interface CachedConnection {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include the mongoose connection
declare global {
    // Use `let` instead of `var`
    let mongoose: CachedConnection;
}

// Initialize the cached connection object
let cached: CachedConnection = (global as typeof global & { mongoose: CachedConnection }).mongoose;

if (!cached) {
    cached = (global as typeof global & { mongoose: CachedConnection }).mongoose = { conn: null, promise: null };
}

/**
 * @function connect
 * @description Connects to the MongoDB database using Mongoose.
 * Implements a caching mechanism to reuse the existing connection if available.
 * 
 * @returns {Promise<typeof mongoose>} A promise that resolves to the Mongoose connection object.
 * 
 * @example
 * // Usage in a Next.js API route or server-side function
 * import connect from "@/utils/connect";
 * 
 * const db = await connect();
 */
export const connect = async (): Promise<typeof mongoose> => {
    // Return the cached connection if it exists
    if (cached.conn) {
        return cached.conn;
    }

    // Create a new connection if one doesn't exist
    if (!cached.promise) {
        mongoose.set("strictQuery", true); // Enable strict query mode
        cached.promise = mongoose
            .connect(
                process.env.MONGO_URL as string
            )
            .then(() => {
                console.log("Database initialized successfully");
                return mongoose;
            })
            .catch((err) => {
                console.error("Error initializing database:", err);
                throw err;
            });
    }

    // Wait for the connection promise to resolve and cache the connection
    cached.conn = await cached.promise;
    return cached.conn;
};