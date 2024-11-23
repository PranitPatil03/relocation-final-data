const fs = require("fs");

// Function to update the JSON file
function updateJsonFile(updatedFile, mainFile, outputFile) {
  try {
    // Read and parse the updated JSON file
    const updatedData = JSON.parse(fs.readFileSync(updatedFile, "utf-8"));

    // Read and parse the main JSON file
    const mainData = JSON.parse(fs.readFileSync(mainFile, "utf-8"));

    // Update the data in updated.json
    updatedData.forEach((entry) => {
      const cityKey = entry.city.toLowerCase(); // Convert city to lowercase for matching
      if (mainData[cityKey]) {
        entry.data = mainData[cityKey].data; // Update the data field
      }
    });

    // Write the updated data to the output file
    fs.writeFileSync(outputFile, JSON.stringify(updatedData, null, 2), "utf-8");
    console.log(`Updated JSON saved to ${outputFile}`);
  } catch (error) {
    console.error("Error updating JSON:", error.message);
  }
}

// Specify the file paths
const updatedFile = "./updated_op_7.json"; // Input file to be updated
const mainFile = "./a/trans_8.json"; // Main JSON file with data
const outputFile = "./updated_op_8.json"; // Output file to save the result

// Call the function to update the JSON
updateJsonFile(updatedFile, mainFile, outputFile);
