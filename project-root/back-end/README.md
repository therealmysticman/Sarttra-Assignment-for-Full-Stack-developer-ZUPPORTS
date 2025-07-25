# Restaurant Finder Backend

A Node.js/Express backend with SQLite database for the Restaurant Finder application.

  

## Frameworks Used

  

- **Node.js** - JavaScript runtime, use for initialize back-end.

- **Express** - Web application framework, use for creating API connection.

- **MySQL** - Main SQL file, data written in this file is mock-up.

- **SQLite** - Lightweight database use to link with front-end.

- **SQLite3** - SQLite database driver to link import-data from SQL to SQL Lite.

- **CORS** - Cross-Origin Resource Sharing middleware, use to make different server port between front-end and back-end sync.


  

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   //or
   npm i
   ```

2. Import data from SQL file:
   ```bash
   npm run import-data
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## How to Run and Test the App

### Running the Server
- The server runs on port 4000 by default
- Access the API at `http://localhost:4000/api/restaurants`

### Testing the API
You can test the API using:

1. The built-in test script:
   ```bash
   npm test
   ```

2. Direct API calls in your browser:
   - All restaurants: http://localhost:4000/api/restaurants
   - Search: http://localhost:4000/api/restaurants/search?query=your_search_term
   - By ID: http://localhost:4000/api/restaurants/001

3. Using tools like Postman or cURL:
   ```bash
   curl http://localhost:4000/api/restaurants
   ```

## API Endpoints

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/search?query=term` - Search restaurants by name or address
- `GET /api/restaurants/:id` - Get restaurant by ID
- `DELETE /api/cache` - Clear the search cache (admin/testing purpose)

## Project Structure

```
back-end/
├── dataset/                    # Data files
│   ├── import-data.js          # Script to import data
│   ├── restaurants_mock_data.sql # SQL data file
│   └── database.sqlite         # SQLite database file
│
├── server/                     # Server files
│   └── server.js               # Main server file
│
├── package.json                # Project dependencies
└── README.md                   # This file
```

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

- Cannot directly parse MySQL database: have to create import-data.js to pull data from .sql file
- No page seperation : All result return once, it will be issues for more data.
- Data edit complexity: If fix one dataset in mysql have to reboot all database by npm run import-data

### Limitations

- Data only mock-up : not precisely match with  real world scenarios
- Less mock up data : restaurants database only have 12 restaurants.
