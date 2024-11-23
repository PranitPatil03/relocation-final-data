const fs = require('fs');
const path = require('path');

// Input and output file details
const inputFile = './finalfinal.json'; // Source JSON file
const outputFileWithData = './final/with_data.json'; // File with complete data
const outputFileWithoutData = './final/without_data.json'; // File without data

// Helper function to check if any field in "data" has a value
const hasAnyData = (data) => {
  if (!data) return false;

  const fieldsToCheck = [
    data?.["Housing Affordability"]?.["Home Price"],
    data?.["Housing Affordability"]?.["Property Tax"],
    data?.["Housing Affordability"]?.["Home Appreciation Rate"],
    data?.["Housing Affordability"]?.["Price Per Square Foot"],

    data?.["Quality of Life"]?.["Education"],
    data?.["Quality of Life"]?.["Healthcare + Fitness"],
    data?.["Quality of Life"]?.["Weather Grade"],
    data?.["Quality of Life"]?.["Air Quality Index"],
    data?.["Quality of Life"]?.["Commute / Transit Score"],
    data?.["Quality of Life"]?.["Accessibility"],
    data?.["Quality of Life"]?.["Culture / Entertainment"],

    data?.["Job Market Strength"]?.["Unemployment Rate"],
    data?.["Job Market Strength"]?.["Recent Job Growth"],
    data?.["Job Market Strength"]?.["Future Job Growth Index"],
    data?.["Job Market Strength"]?.["Median Household Income"],

    data?.["Living Affordability"]?.["State Income Tax"],
    data?.["Living Affordability"]?.["Utilities"],
    data?.["Living Affordability"]?.["Food / Groceries"],
    data?.["Living Affordability"]?.["Sales Tax"],
    data?.["Living Affordability"]?.["Transportation Cost"],
  ];

  // Check if any field is non-empty
  return fieldsToCheck.some((field) => field && field.trim() !== "");
};

try {
  // Read the large JSON file
  const rawData = fs.readFileSync(path.resolve(__dirname, inputFile), 'utf8');
  const jsonData = JSON.parse(rawData);

  // Arrays to hold the separated data
  const withData = [];
  const withoutData = [];

  // Split data based on the presence of any valid field in "data"
  jsonData.forEach((item) => {
    if (hasAnyData(item.data)) {
      withData.push(item);
    } else {
      withoutData.push(item);
    }
  });

  // Write the separated data into respective files
  fs.writeFileSync(outputFileWithData, JSON.stringify(withData, null, 2));
  fs.writeFileSync(outputFileWithoutData, JSON.stringify(withoutData, null, 2));

  console.log(`Created ${outputFileWithData} with ${withData.length} records.`);
  console.log(`Created ${outputFileWithoutData} with ${withoutData.length} records.`);
} catch (error) {
  console.error('Error processing the file:', error.message);
}
