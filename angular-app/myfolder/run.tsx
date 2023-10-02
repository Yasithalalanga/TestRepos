import * as fs from "fs";

const filePath = "myfolder/folder/gilmer-regular.woff"; // Replace with the actual path to your .woff file

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const fontContent = data;
  fs.writeFileSync("font.txt", data.toString("base64"));

  // Now you can use the fontContent variable for further processing or saving.
});
