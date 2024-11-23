const fs = require('fs');

// Function to count items in a JSON file
function countItemsInJson(filePath) {
    try {
        // Read the JSON file
        const data = fs.readFileSync(filePath, 'utf-8');
        // Parse the JSON data
        const jsonArray = JSON.parse(data);
        // Count the items
        const count = jsonArray.length;
        console.log(`File: ${filePath} - Total items: ${count}`);
    } catch (error) {
        console.error(`Error reading or processing the JSON file (${filePath}):`, error.message);
    }
}

// Function to process multiple files
function countItemsInMultipleFiles(filePaths) {
    filePaths.forEach(filePath => {
        countItemsInJson(filePath);
    });
}

// Specify the file paths
const filePaths = [
    './cc/city_code_master_id_1.json',
    './cc/city_code_master_id_2.json',
    './cc/city_code_master_id_3.json',
    './cc/city_code_master_id_4.json',
    './cc/city_code_master_id_5.json',
    './cc/city_code_master_id_6.json',
    './cc/city_code_master_id_7.json',
    './cc/city_code_master_id_8.json',
    // './cc/city_code_master_id_9.json',
    // './cc/city_code_master_id_10.json',
    // './cc/city_code_master_id_12.json',
    // './cc/city_code_master_id_13.json',
    // './cc/city_code_master_id_14.json',
    // './cc/city_code_master_id_15.json',
    // './cc/city_code_master_id_16.json'

]; // Replace with your JSON file paths

// Call the function to process all files
countItemsInMultipleFiles(filePaths);