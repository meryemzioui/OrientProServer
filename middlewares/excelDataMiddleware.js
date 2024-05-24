const multer = require("multer");
const xlsx = require("xlsx");

// Create an instance of multer and configure it
const upload = multer({ dest: "uploads/" });

// Define the middleware
function excelDataMiddleware(req, res, next) {
  // Handle file upload
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).send("Error handling file upload");
    }

    try {
      // File path of the uploaded file
      const filePath = req.file.path;

      // Read the Excel file
      const workbook = xlsx.readFile(filePath);

      // Extract the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON using the first row as headers
      const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

      // Attach the formatted data to the request object
      req.formattedData = data;

      // Proceed to the next middleware or route handler
     return next();
    } catch (error) {
      console.error("Error reading Excel file:", error);
      return res.status(500).send("Error reading Excel file");
    } finally {
      // Optionally, you can delete the uploaded file after processing
      // fs.unlink(filePath, (err) => {
      //     if (err) console.error('Error deleting file:', err);
      // });
    }
  });
}

module.exports = excelDataMiddleware;
