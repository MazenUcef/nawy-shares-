Nawy Shares Task
A Next.js-based property listing application for browsing, viewing, and managing property listings.

This project is a full-stack web application built with Next.js and MongoDB that allows users to browse property listings, view detailed information about each listing, and manage listings (create, update, delete). It includes features like search functionality, error handling, and responsive design.

Features
Browse Listings: View a list of available properties with details like price, beds, baths, and more.

Search Functionality: Search for properties based on filters like price, location, and amenities.

Detailed View: View detailed information about a specific property, including images, description, and features.

Manage Listings: Create, update, and delete property listings (admin functionality).

Error Handling: Graceful error handling for failed API requests or missing data.

Responsive Design: Optimized for desktop, tablet, and mobile devices.

Technologies Used
Frontend:

Next.js (React framework for server-side rendering and static site generation)

Tailwind CSS (Utility-first CSS framework)

React Icons (Icon library)

React Hot Toast (Toast notifications)

Backend:

MongoDB (NoSQL database)

Mongoose (MongoDB object modeling for Node.js)

Development Tools:

TypeScript (Static typing for JavaScript)

ESLint (Code linting)

Prettier (Code formatting)

Getting Started
Clone the Repository:

bash
Copy
git clone https://github.com/MazenUcef/nawy-shares-.git
cd nawy-shares-task
Install Dependencies:

bash
Copy
npm install
Set Up Environment Variables:
Create a .env.local file and add your MongoDB connection string:

env
Copy
Generly we have to put the database connection in the env file but i did put it hard coded i teh code base to be more easy to you to test

Run the Application:

bash
Copy
npm run dev
Open in Browser:
Visit http://localhost:3000 to view the application.
