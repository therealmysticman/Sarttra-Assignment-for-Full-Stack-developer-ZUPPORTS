# Restaurant Finder Frontend

  

A responsive React application for searching and displaying restaurant information.

  

## Frameworks Used

  

- **React** - UI library for building component-based interfaces

- **Vite** - Fast build tool and development server, use to initialize react project

- **Leaflet & React-Leaflet** - Interactive maps for restaurant locations

- **CSS** - Custom styling with responsive design

- **Fetch API** - is on App.jsx, use for making API calls to the backend

  

## Setup Instructions

  

1. Install dependencies:

   ```bash

   npm install

   ```

  

2. Ensure the backend server is running (on port 4000/or your prefer if want to edit)

  

3. Start the development server:

   ```bash

   npm run dev

   ```

  

## How to Run and Test the App

  

### Running the Application

- The development server runs on port 5173 by default

- Access the application at `http://localhost:5173`

- Enter keywords in the search bar to find restaurants by name or address

- Click "View Details" on any restaurant card to see more information and location map

  

### Testing

- The application includes fallback mock data if the backend is unavailable

- Test the responsive design by resizing your browser window

- Test the map functionality by clicking "View Details" on a restaurant card

  

## Project Structure

  

```

front-end/

├── public/                     # Static files

├── src/                        # Source code

│   ├── assets/                 # Images and assets

│   │   └── image/              # Application icons

│   ├── components/             # React components

│   │   ├── Header/             # Header component

│   │   ├── search/             # Search component

│   │   ├── restaurantCard/     # Restaurant card component

│   │   ├── RestaurantList/     # Restaurant list component

│   │   └── RestaurantDetail/   # Restaurant detail component with map

│   ├── mainstyles/             # Global CSS styles

│   ├── App.jsx                 # Main application component

│   └── main.jsx                # Application entry point

├── index.html                  # HTML template

├── vite.config.js              # Vite configuration

├── package.json                # Project dependencies

└── README.md                   # This file

```

  

## Known Issues and Limitations

### Issues

- Fallback data is not real : the restaurant when didn't have backend will return this data but it not reflect real place.
- Map pinpoint is not real: the pinpoint is pin on nearby location not precise.
- Restaurant detail card use the data which already showing in restaurant card: 


### Limitations

- No Search history: web application doesn't have search history to show to select for suitable select query
- Node.js Compatibility : May require specific configuration with Node.js 21+
- Unable to do filter search : can search only be name and address, the rest is not able to search