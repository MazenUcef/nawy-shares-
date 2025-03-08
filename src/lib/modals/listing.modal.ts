/**
 * @file Listing schema and model for MongoDB.
 * @module Listing
 * @description This file defines the schema and model for property listings in the MongoDB database.
 * It includes fields for project name, unit name, unit number, description, address, and various listing options.
 * 
 * @requires mongoose
 */

import mongoose from "mongoose";

/**
 * @constant listingSchema
 * @description The schema for property listings in the MongoDB database.
 * It defines the structure and validation rules for listing documents.
 * 
 * @type {mongoose.Schema}
 * @property {string} projectName - The name of the project. Required.
 * @property {string} unitName - The name of the unit. Required and unique.
 * @property {number} unitNumber - The number of the unit. Required and unique.
 * @property {string} description - A description of the listing. Required.
 * @property {string} address - The address of the listing. Required.
 * @property {boolean} sell - Indicates if the listing is for sale. Required.
 * @property {boolean} rent - Indicates if the listing is for rent. Required.
 * @property {boolean} parkingSpot - Indicates if the listing includes a parking spot. Required.
 * @property {boolean} furnished - Indicates if the listing is furnished. Required.
 * @property {boolean} offer - Indicates if the listing has a special offer. Required.
 * @property {number} beds - The number of beds in the listing. Required.
 * @property {number} baths - The number of baths in the listing. Required.
 * @property {number} regularPrice - The regular price of the listing. Required.
 */
const listingSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
    },
    unitName: {
        type: String,
        required: true,
        unique: true,
    },
    unitNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    sell: {
        type: Boolean,
        required: true,
    },
    rent: {
        type: Boolean,
        required: true,
    },
    parkingSpot: {
        type: Boolean,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
    },
    baths: {
        type: Number,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
});

/**
 * @constant Listing
 * @description The Mongoose model for property listings.
 * It is created using the `listingSchema` and ensures that the model is not redefined if it already exists.
 * 
 * @type {mongoose.Model}
 */
const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);

export default Listing;