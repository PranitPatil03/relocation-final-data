const axios = require('axios');
const fs = require('fs');

// Function to fetch placeMasterId based on a search term
async function fetchPlaceMasterId(searchTerm, stateCode) {
    try {
        const url = `https://www.coldwellbanker.com/api/places/search?term=${encodeURIComponent(searchTerm)}`;
        console.log(`Fetching URL: ${url}`);

        // Make the GET request
        const response = await axios.get(url);

        // Ensure the response contains valid data
        if (response.data && response.data.places && response.data.places.length > 0) {
            // Filter places based on the state code
            const matchingPlace = response.data.places.find(
                place => place.stateOrProvince === stateCode && place.city.toLowerCase() === searchTerm.toLowerCase()
            );

            if (matchingPlace) {
                return {
                    placeName: matchingPlace.placeName,
                    placeMasterId: matchingPlace.placeMasterId,
                    city: matchingPlace.city,
                    state: matchingPlace.stateOrProvince,
                    zipCode: matchingPlace.zipCode,
                };
            } else {
                console.warn(`No matching place found for "${searchTerm}" with state code "${stateCode}".`);
                return null;
            }
        } else {
            console.error(`No valid data found for "${searchTerm}". Response:`, response.data);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching placeMasterId for "${searchTerm}":`, error.message);
        return null;
    }
}

// Main function to process the input JSON file
async function processCities(inputFile, outputFile) {
    try {
        // Read the input file
        const data = fs.readFileSync(inputFile, 'utf-8');
        const cities = JSON.parse(data);

        // Process all cities (removed the limit)
        // const limitedCities = cities.slice(0, 10); // Limit to first 10 cities
        const limitedCities = cities; // Process all cities

        // Initialize an array to store results
        const results = [];

        for (const cityObj of limitedCities) {
            console.log(`Fetching data for city: ${cityObj.city}, state code: ${cityObj.state_code}`);
            const cityData = await fetchPlaceMasterId(cityObj.city, cityObj.state_code);

            // Add the data if it exists
            if (cityData) {
                results.push({
                    city: cityObj.city,
                    state_code: cityObj.state_code,
                    placeMasterId: cityData.placeMasterId,
                    placeName: cityData.placeName,
                    state: cityData.state,
                    zipCode: cityData.zipCode,
                });
            }
        }

        // Write the results to the output file
        fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf-8');
        console.log(`Results saved successfully to ${outputFile}`);
    } catch (error) {
        console.error(`Error processing cities:`, error.message);
    }
}

// Specify input and output file names
const inputFile = './bb/city_code_15.json'; // Replace with your input JSON file
const outputFile = './cc/city_code_master_id_15.json'; // The name of the output JSON file

// Call the main function
processCities(inputFile, outputFile);
