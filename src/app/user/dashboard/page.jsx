"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // To store file preview

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Generate a preview URL for the selected file (for image files)
      setFilePreview(URL.createObjectURL(file));
    }
  };

  // Handle file upload
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    // Send file to API endpoint
    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = await response.json();
    setBlob(newBlob); // Store the returned blob details
  };

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form onSubmit={handleSubmit}>
        {/* File input to select the file */}
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/*" // Only allow image files
          required
          onChange={handleFileChange}
        />

        {/* Display file preview if selected */}
        {filePreview && (
          <div style={{ marginTop: "20px" }}>
            <h3>Selected File:</h3>
            <img
              src={filePreview}
              alt="File preview"
              style={{
                maxWidth: "200px",
                maxHeight: "150px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        {/* Upload button */}
        <button type="submit">Upload</button>
      </form>

      {/* Display uploaded blob URL */}
      {blob && (
        <div>
          <p>Upload Successful!</p>
          <p>
            Blob URL: <a href={blob.url}>{blob.url}</a>
          </p>
        </div>
      )}
    </>
  );
}
