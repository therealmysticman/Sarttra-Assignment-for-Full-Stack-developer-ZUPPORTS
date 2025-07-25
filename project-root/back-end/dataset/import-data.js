import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
//THIS IS THE FILE THAT I USED TO IMPORT THE DATA(restaurants_mock_data.sql) INTO THE sqlite DATABASE. VERY IMPORTANT!!
// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const sqlFilePath = path.join(__dirname, 'restaurants_mock_data.sql');
const dbPath = path.join(__dirname, 'database.sqlite');

async function importData() {
  try {
    console.log('Reading SQL file...');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('Connecting to SQLite database...');
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database //initialise the database
    });
    
    // Create restaurants table
    console.log('Creating restaurants table...');
    await db.exec(`
      DROP TABLE IF EXISTS restaurants_data;
      CREATE TABLE restaurants_data (
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
    
    // Extract CREATE TABLE statement to understand structure
    const createTableMatch = sqlContent.match(/create\s+table\s+if\s+not\s+exists\s+restaurants_data\s*\(([^;]+)\)/i); //find the CREATE TABLE statement in the SQL file
    if (!createTableMatch) {
      throw new Error('Could not find CREATE TABLE statement in SQL file');
    }
    
    // Extract INSERT statement
    const insertMatch = sqlContent.match(/insert\s+into\s+restaurants_data\s*\([^)]+\)\s*value\s*([\s\S]+?);/i); //find the INSERT statement in the SQL file
    if (!insertMatch) {
      throw new Error('Could not find INSERT statement in SQL file');
    }
    
    // Parse values from INSERT statement
    const valuesText = insertMatch[1];
    const valueRegex = /\(\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*([^,]+)\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\)/g;
    
    let match;
    const restaurants_sqlite = [];
    
    while ((match = valueRegex.exec(valuesText)) !== null) { //extract the data from the SQL file
      restaurants_sqlite.push({
        RestaurantID: match[1],
        RestaurantName: match[2],
        Rating: parseFloat(match[3]),
        OpeningTime: match[4],
        ClosingTime: match[5],
        Address: match[6],
        Image: match[7]
      });
    }
    
    if (restaurants_sqlite.length === 0) { //if no restaurant data is found in the SQL file, throw an error
      throw new Error('No restaurant data found in SQL file');
    }
    
    console.log(`Found ${restaurants_sqlite.length} restaurants in SQL file`);
    
    // Insert data into SQLite database
    console.log('Inserting data into SQLite database...');
    const stmt = await db.prepare(`
      INSERT INTO restaurants_data (RestaurantID, RestaurantName, Rating, OpeningTime, ClosingTime, Address, Image) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    for (const restaurant_sqlite2 of restaurants_sqlite) { //insert the data into the SQLite database
      await stmt.run(
        restaurant_sqlite2.RestaurantID,
        restaurant_sqlite2.RestaurantName,
        restaurant_sqlite2.Rating,
        restaurant_sqlite2.OpeningTime,
        restaurant_sqlite2.ClosingTime,
        restaurant_sqlite2.Address,
        restaurant_sqlite2.Image
      );
    }
    
    await stmt.finalize();
    
    console.log('Data import completed successfully!');
    console.log(`Imported ${restaurants_sqlite.length} restaurants into SQLite database`);
    
    // Display sample data
    console.log('\nSample data from database:');
    const sampleData = await db.all('SELECT * FROM restaurants_data LIMIT 3');
    console.table(sampleData);
    
    await db.close();
    
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
}

// Run the import
importData(); 