const fs = require("fs");
const path = require("path");

// Function to transform data
function transformData(inputFiles, outputFile) {
  try {
    // Initialize the combined transformed data object
    const combinedData = {};

    // Loop through each input file
    inputFiles.forEach((inputFile) => {
      // Read the input JSON file
      const rawData = fs.readFileSync(inputFile, "utf-8");
      const jsonData = JSON.parse(rawData);

      // Process each entry in the input data
      jsonData.forEach((entry) => {
        const sourceCityName = entry.sourceCity;
        const destinationCityName = entry.destinationCity;

        // Add source city data
        if (!combinedData[sourceCityName]) {
          combinedData[sourceCityName] = { data: entry.sourceCityData };
        }

        // Add destination city data
        if (!combinedData[destinationCityName]) {
          combinedData[destinationCityName] = { data: entry.destinationCityData };
        }
      });
    });

    // Write the combined transformed data to the output file
    fs.writeFileSync(
      outputFile,
      JSON.stringify(combinedData, null, 2),
      "utf-8"
    );
    console.log(`Transformed data saved successfully to ${outputFile}`);
  } catch (error) {
    console.error("Error in transforming data:", error.message);
  }
}

// Specify the input files and output file
const inputDir = "./finalR"; // Directory containing the input files
const outputFile = "./aaa/trans_combined.json"; // Output file name

// Collect all input file paths (results_1.json to results_10.json)
const inputFiles = Array.from({ length: 10 }, (_, i) =>
  path.join(inputDir, `results_${i + 1}.json`)
);

// Call the function to transform the data
transformData(inputFiles, outputFile);
