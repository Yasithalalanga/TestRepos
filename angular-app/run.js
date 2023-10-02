"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var filePath = "fonts/gilmer-regular.woff"; // Replace with the actual path to your .woff file
fs.readFile(filePath, function (err, data) {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    var fontContent = data;
    fs.writeFileSync("font.txt", data.toString("base64"));
    // Now you can use the fontContent variable for further processing or saving.
});
