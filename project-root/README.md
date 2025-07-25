# Restaurant Finder Application


<img width="902" height="438" alt="image" src="https://github.com/user-attachments/assets/2255b3f3-5f3d-4337-8f56-2dd247fb8095" />


<img width="1914" height="932" alt="image" src="https://github.com/user-attachments/assets/19cffcdb-33d6-402b-8566-de341ca062c9" />


A responsive web application to search and display restaurant information. The application consists of a React frontend and a Node.js/Express backend with SQLite database.

## Overview

This project is a full-stack restaurant search application that allows users to:
- Search for restaurants by name or address
- View restaurant details including ratings, hours, and location
- See restaurant locations on an interactive map
- Access the application even when the backend is unavailable (using fallback data)

## Project Structure

```
project-root/
  ├── back-end/                 # Express.js backend
  │   ├── dataset/              # Data files and import scripts
  │   │   ├── import-data.js    # Script to import data
  │   │   └── restaurants_mock_data.sql # SQL data file
  │   ├── server/               # Server files
  │   │   └── server.js         # Main server file
  │   └── package.json          # Backend dependencies
  │
  ├── front-end/                # React frontend
  │   ├── src/                  # Source code
  │   │   ├── assets/           # Images and assets
  │   │   ├── components/       # React components
  │   │   └── mainstyles/       # Global CSS styles
  │   ├── public/               # Static files
  │   └── package.json          # Frontend dependencies
  │
  └── database.sqlite           # SQLite database file (created on first run)
```

## Key Features

- **Restaurant Search**: Find restaurants by name or address
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Maps**: View restaurant locations on a map using Leaflet
- **Search Caching**: Repeated searches use cached results for better performance
- **Detailed View**: Click on a restaurant to see more information
- **Fallback Data**: Works even when backend is unavailable
- **RESTful API**: Clean API endpoints for restaurant data

## Technologies Used

### Frontend
- **React** - UI library for building component-based interfaces
- **Vite** - Fast build tool and development server
- **Leaflet & React-Leaflet** - Interactive maps for restaurant locations
- **CSS** - Custom styling with responsive design
- **Fetch API** - For making API calls to the backend

### Backend
- **Node.js** - JavaScript runtime environment for server-side code
- **Express** - Web application framework for creating RESTful APIs
- **SQLite** - Lightweight, file-based relational database
- **sqlite3** - Low-level Node.js driver for SQLite
- **sqlite** - High-level Promise-based wrapper for sqlite3
- **CORS** - Cross-Origin Resource Sharing middleware for secure API access

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd back-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Import data from SQL file:
   ```bash
   npm run import-data
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on port 4000 by default. (but user can change to preferable port)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd front-end
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on port 5173 by default.

## API Endpoints

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/search?query=term` - Search restaurants by name or address
- `GET /api/restaurants/:id` - Get restaurant by ID
- `DELETE /api/cache` - Clear the search cache (admin/testing purpose)

## Data Structure

The restaurant data is stored with the following structure:

```
restaurants_data
├── RestaurantID (TEXT) - Primary key
├── RestaurantName (TEXT) - Restaurant name
├── Rating (REAL) - Rating (0-5)
├── OpeningTime (TEXT) - Opening time
├── ClosingTime (TEXT) - Closing time
├── Address (TEXT) - Restaurant address
├── Image (TEXT) - URL to restaurant image
└── CreatedAt (TIMESTAMP) - Creation timestamp
```

The search cache is stored in the following table:

```
search_cache
├── query (TEXT) - Primary key, the search term
├── results (TEXT) - JSON string of search results
└── timestamp (INTEGER) - When the cache entry was created
```

## Known Issues and Limitations

### Issues
- **Mock Data**: Restaurant data and map locations are not from real-world sources
- **Data Import Process**: The system requires a custom import script for SQL data
- **No Pagination**: All results are returned at once, which may cause performance issues with large datasets

### Limitations
- **Limited Search**: Search is limited to name and address fields only
- **No Data Modification**: API is read-only; no endpoints for adding, updating, or deleting restaurants
- **No Authentication**: No user authentication or authorization mechanisms
- **Node.js Compatibility**: May require specific configuration with Node.js 21+

## Development

The application is set up with a development environment that includes:
- Hot module replacement for frontend
- Automatic server restart for backend (using nodemon)
- SQLite database for easy development

## Testing

### Backend Testing
You can test the backend API using:
1. The built-in test script: `npm test`
2. Direct API calls in your browser
3. Tools like Postman or cURL

### Frontend Testing
- The application includes fallback mock data if the backend is unavailable
- Test the responsive design by resizing your browser window
- Test the map functionality by clicking "View Details" on a restaurant card 
