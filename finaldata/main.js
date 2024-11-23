const fs = require('fs');
const path = require('path');

// Input and output details
const inputFile = '../split_city_code_master_2.json'; // Large JSON file
const outputFilePrefix = './finaldata/d/split_city_code_master_'; // Prefix for output files
const numberOfFiles = 10; // Number of destination files

try {
  // Read the large JSON file
  const rawData = fs.readFileSync(path.resolve(__dirname, inputFile), 'utf8');
  const jsonData = JSON.parse(rawData);

  // Calculate size of each file
  const totalRecords = jsonData.length;
  const recordsPerFile = Math.ceil(totalRecords / numberOfFiles);

  // Split data into multiple files
  for (let i = 0; i < numberOfFiles; i++) {
    const start = i * recordsPerFile;
    const end = start + recordsPerFile;
    const splitData = jsonData.slice(start, end);

    // Write to a new file
    const outputFileName = `${outputFilePrefix}${i + 1}.json`;
    fs.writeFileSync(outputFileName, JSON.stringify(splitData, null, 2));
    console.log(`Created file: ${outputFileName} with ${splitData.length} records`);
  }
} catch (error) {
  console.error('Error processing the file:', error.message);
}
