import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import path from 'path';

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Search cache to store previous search results
const searchCache = new Map();
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Database connection
const dbPath = path.join(__dirname,'../dataset/database.sqlite');

// Initialize database
async function initializeDatabase() {
  try {
    // Open the database
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    
    console.log('Connected to SQLite database');
    
    // Create restaurants table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS restaurants_data (
        RestaurantID TEXT PRIMARY KEY,
        RestaurantName TEXT NOT NULL,
        Rating REAL,
        OpeningTime TEXT,
        ClosingTime TEXT,
        Address TEXT,
        Image TEXT,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create search_cache table to persist cache between server restarts
    await db.exec(`
      CREATE TABLE IF NOT EXISTS search_cache (
        query TEXT PRIMARY KEY,
        results TEXT NOT NULL,
        timestamp INTEGER NOT NULL
      )
    `);
    
    // Load existing cache from database
    await loadCacheFromDatabase(db);
    
    // Check if we have data in the restaurants table
    const count = await db.get('SELECT COUNT(*) as count FROM restaurants_data');
    
    if (count.count === 0) {
      console.log('No data found in restaurants table.');
      console.log('Please run "npm run import-data" to import data from the SQL file.');
    } else {
      console.log(`Found ${count.count} restaurants in the database.`);
    }
    
    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

// Load existing cache from database
async function loadCacheFromDatabase(db) {
  try {
    const currentTime = Date.now();
    const cacheEntries = await db.all('SELECT * FROM search_cache');
    
    cacheEntries.forEach(entry => {
      // Only load non-expired cache entries
      if (currentTime - entry.timestamp < CACHE_EXPIRATION) {
        searchCache.set(entry.query, {
          results: JSON.parse(entry.results),
          timestamp: entry.timestamp
        });
      }
    });
    
    console.log(`Loaded ${searchCache.size} cache entries from database`);
  } catch (error) {
    console.error('Error loading cache from database:', error);
  }
}

// Save cache entry to database
async function saveCacheToDatabase(db, query, results) {
  try {
    const timestamp = Date.now();
    await db.run(
      'INSERT OR REPLACE INTO search_cache (query, results, timestamp) VALUES (?, ?, ?)',
      [query, JSON.stringify(results), timestamp]
    );
  } catch (error) {
    console.error('Error saving cache to database:', error);
  }
}

// Clean expired cache entries periodically
function cleanupExpiredCache() {
  const currentTime = Date.now();
  
  // Clean memory cache
  for (const [key, value] of searchCache.entries()) {
    if (currentTime - value.timestamp > CACHE_EXPIRATION) {
      searchCache.delete(key);
    }
  }
  
  // Clean database cache
  if (db) {
    db.run(
      'DELETE FROM search_cache WHERE timestamp < ?',
      [currentTime - CACHE_EXPIRATION]
    );
  }
}

// Run cache cleanup every minute
setInterval(cleanupExpiredCache, 60 * 1000);

// Initialize database and start server
let db;
(async () => {
  db = await initializeDatabase();
  
  // API Routes
  
  // Get all restaurants
  app.get('/api/restaurants', async (req, res) => {
    try {
      const restaurants_query = await db.all('SELECT * FROM restaurants_data');
      res.json(restaurants_query);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
  });
  
  // Search restaurants with caching
  app.get('/api/restaurants/search', async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
      }
      
      // Check if we have a cached result for this query
      if (searchCache.has(query)) {
        const cachedData = searchCache.get(query);
        const currentTime = Date.now();
        
        // Check if cache is still valid
        if (currentTime - cachedData.timestamp < CACHE_EXPIRATION) {
          console.log(`Using cached results for query: "${query}"`);
          return res.json(cachedData.results);
        }
      }
      
      // If no cache or expired, perform the search
      const searchTerm = `%${query}%`;
      const restaurants_query = await db.all(
        `SELECT * FROM restaurants_data 
         WHERE RestaurantName LIKE ? OR Address LIKE ?`,
        [searchTerm, searchTerm]
      );
      
      // Store in cache
      const timestamp = Date.now();
      searchCache.set(query, { results: restaurants_query, timestamp });
      
      // Save to database cache
      await saveCacheToDatabase(db, query, restaurants_query);
      
      console.log(`Cached new results for query: "${query}"`);
      res.json(restaurants_query);
    } catch (error) {
      console.error('Error searching restaurants:', error);
      res.status(500).json({ error: 'Failed to search restaurants' });
    }
  });
  
  // Get restaurant by ID
  app.get('/api/restaurants/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant_query = await db.get('SELECT * FROM restaurants_data WHERE RestaurantID = ?', [id]);
      
      if (!restaurant_query) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      
      res.json(restaurant_query);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
  });
  
  // API endpoint to clear cache (for testing/admin purposes)
  app.delete('/api/cache', async (req, res) => {
    try {
      // Clear memory cache
      searchCache.clear();
      
      // Clear database cache
      await db.run('DELETE FROM search_cache');
      
      res.json({ message: 'Cache cleared successfully' });
    } catch (error) {
      console.error('Error clearing cache:', error);
      res.status(500).json({ error: 'Failed to clear cache' });
    }
  });
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})(); 