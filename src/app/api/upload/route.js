import { IncomingForm } from "formidable";
import { Client } from "basic-ftp";
import nextConnect from "next-connect"; // Make sure you're using the correct import style

// Disable the default body parser for file uploads
export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle multipart form data
  },
};

const handler = nextConnect();

// Use formidable to parse the form data
handler.use((req, res, next) => {
  const form = new IncomingForm();

  // Set the upload directory for the files
  form.uploadDir = "./tmp"; // Temp directory to store uploaded files
  form.keepExtensions = true; // Keep the file extensions

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "File parsing error", details: err });
    }
    req.files = files; // Attach parsed files to the request object
    req.fields = fields; // Attach form fields to the request object
    next();
  });
});

// Handle the POST request
handler.post(async (req, res) => {
  try {
    const { files } = req;
    let realPath = "";
    let fileName = "";

    if (Array.isArray(files.myImage)) {
      if (files.myImage.length > 0) {
        realPath = files.myImage[0].filepath;
        fileName = files.myImage[0].originalFilename;
      } else {
        return res.status(400).json({ error: "No file uploaded" });
      }
    } else {
      realPath = files.myImage.filepath;
      fileName = files.myImage.originalFilename;
    }

    // Step 2: Upload file to FTP server
    await uploadToFTP(realPath, fileName);

    // Step 3: Optionally update the database
    await stampProfilePictureInDatabase("/path/", fileName);

    // Send response back
    res.status(200).json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error("Error processing upload:", error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to upload file to FTP
const uploadToFTP = async (realPath, fileName) => {
  const client = new Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      port: parseInt(process.env.FTP_PORT || "21", 10),
      secure: true,
      secureOptions: { rejectUnauthorized: false },
    });

    await client.ensureDir("/path");
    const remotePath = `/path/${fileName}`;

    await client.uploadFrom(realPath, remotePath);
    console.log("File uploaded successfully to FTP server!");
  } catch (err) {
    console.error("FTP upload failed:", err);
    throw new Error("FTP upload failed");
  } finally {
    client.close();
  }
};

// Placeholder for database update (this is just a mock function)
const stampProfilePictureInDatabase = async (remotePath, fileName) => {
  console.log("Updating database with new file path:", remotePath + fileName);
  // Here, you would update your database with the file path or other details
  // Example: await db.update({ profilePicture: remotePath + fileName });
};

export default handler;
