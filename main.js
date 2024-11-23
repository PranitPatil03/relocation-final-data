const fs = require('fs');
const path = require('path');

// List of JSON files to merge
const jsonFiles = [
  "./cc/city_code_master_id_1.json",
  "./cc/city_code_master_id_2.json",
  "./cc/city_code_master_id_3.json",
  "./cc/city_code_master_id_4.json",
  "./cc/city_code_master_id_5.json",
  "./cc/city_code_master_id_6.json",
  "./cc/city_code_master_id_7.json",
  "./cc/city_code_master_id_8.json",
  "./cc/city_code_master_id_9.json",
  "./cc/city_code_master_id_10.json",
  "./cc/city_code_master_id_11.json",
  "./cc/city_code_master_id_12.json",
  "./cc/city_code_master_id_13.json",
  "./cc/city_code_master_id_14.json",
  "./cc/city_code_master_id_15.json",
  "./cc/city_code_master_id_16.json"
];

// Output file name
const outputFile = "merged_city_code_master.json";

// Array to hold all merged data
let allData = [];

// Read and merge data from each JSON file
jsonFiles.forEach((file) => {
  try {
    const filePath = path.resolve(__dirname, file);
    const rawData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);

    if (Array.isArray(jsonData)) {
      allData = allData.concat(jsonData);
    } else {
      allData.push(jsonData);
    }
  } catch (error) {
    console.error(`Error reading file ${file}:`, error.message);
  }
});

// Write the merged data into the output file
try {
  fs.writeFileSync(outputFile, JSON.stringify(allData, null, 2));
  console.log(`All JSON files merged into ${outputFile}`);
} catch (error) {
  console.error(`Error writing to file ${outputFile}:`, error.message);
}
