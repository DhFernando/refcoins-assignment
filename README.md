
# Property Management Platform

This is a property management platform built with NestJS for the backend and Next.js for the frontend, both written in TypeScript. The backend utilizes MongoDB as the database and Prisma for the ORM.

## Features

- **Create Property**: Users can create new property listings with detailed information.
- **Update Property**: Property details can be updated as needed.
- **Delete Property**: Unwanted property listings can be removed from the system.
- **Filter Properties**: Properties can be filtered based on type, status, and location.
- **Pagination**: Property listings are paginated for easier navigation.
- **Total Property Count**: Provides the total count of properties based on filters.
- **Image Uploads**: Utilizes Azure Blob Storage for handling image uploads in the frontend.

## Installation

1. Clone the repository: `git clone [text](https://github.com/DhFernando/refcoins-assignment)`

### Backend
1. Navigate to the backend directory: `cd refcoins-be`
2. Install dependencies: `npm install`
3. Set up MongoDB and configure the connection in `.env` file.
4. Start the server: `npm run start:dev`

### Frontend

1. Navigate to the frontend directory: `cd refcoins-fe`
2. Install dependencies: `npm install`
3. Set up Azure Blob Storage for image uploads and configure the connection details in `.env.local` file:


# API Endpoints

### Properties

- **POST /property**: Create a new property.
- **GET /property**: Get a paginated list of properties with optional filters.
- **GET /property/:id**: Get details of a specific property by ID.
- **PATCH /property/:id**: Update details of a specific property by ID.
- **DELETE /property/:id**: Delete a property by ID.
- **GET /property/totalPropertyCount**: Get the total count of properties based on filters.

# Environment Variables

## Backend

- **MONGODB_URI**: MongoDB connection URI.
- *Add other necessary environment variables as per your configuration.*

## Frontend

- **NEXT_PUBLIC_DEFAULT_PROPERTY_IMAGE**: Default image URL for properties.
- **NEXT_PUBLIC_STORAGE_ACCOUNT_NAME**: Azure Blob Storage account name.
- **NEXT_PUBLIC_SAS_TOKEN**: Shared Access Signature (SAS) token for Azure Blob Storage.

# State Management with Zustand

Zustand is utilized for state management in the frontend.


# Acknowledgements

- NestJS
- Next.js
- MongoDB
- Prisma
- React Hook Form
- Tailwind CSS
- SweetAlert2
- Azure Blob Storage
- Zustand
