Nawy Shares Task
This project is a Next.js application that allows users to browse, view, and manage property listings. It includes features like fetching listing data, displaying detailed information, and handling errors gracefully.

Table of Contents
Prerequisites

Getting Started

Clone the Repository

Install Dependencies

Set Up Environment Variables

Running the Project

Development Mode

Production Build

Project Structure

Technologies Used

Contributing

License

Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher)

npm (v9 or higher) or Yarn (v1 or higher)

MongoDB (for database setup)

Getting Started
Clone the Repository
Open your terminal or command prompt.

Run the following command to clone the repository:

bash
Copy
git clone https://github.com/your-username/nawy-shares-task.git
Navigate to the project directory:

bash
Copy
cd nawy-shares-task
Install Dependencies
Install the required dependencies using npm or Yarn:

bash
Copy
npm install
or

bash
Copy
yarn install
Set Up Environment Variables
Create a .env.local file in the root directory of the project.

Add the following environment variables:


Running the Project
Development Mode
To run the project in development mode:

bash
Copy
npm run dev
or

bash
Copy
yarn dev
This will start the development server at http://localhost:3000. Open this URL in your browser to view the application.

Production Build
To build the project for production:

bash
Copy
npm run build
or

bash
Copy
yarn build
To start the production server:

bash
Copy
npm run start
or

bash
Copy
yarn start
Project Structure
Here’s an overview of the project structure:

Copy
nawy-shares-task/
├── public/               # Static assets (images, icons, etc.)
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and libraries
│   ├── styles/           # Global styles and Tailwind configuration
│   └── types/            # TypeScript type definitions
├── .env.local            # Environment variables
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Files and directories to ignore in Git
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
└── tailwind.config.js    # Tailwind CSS configuration
Technologies Used
Frontend:

Next.js (React framework)

Tailwind CSS (Styling)

React Icons (Icon library)

React Hot Toast (Toast notifications)

Backend:

MongoDB (Database)

Mongoose (MongoDB ODM)

Development Tools:

TypeScript (Static typing)

ESLint (Code linting)

Prettier (Code formatting)