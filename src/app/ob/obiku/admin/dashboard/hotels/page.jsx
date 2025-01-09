"use client";
import { useState } from "react";
import axios from "axios";
export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!image) return;

      const formData = new FormData();
      formData.append("myImage", image);

      const { data } = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type is set
        },
      });

      setStatus("Upload successful!", data);
    } catch (error) {
      setStatus("Upload failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <p>{status}</p>
      {imageUrl && <img src={imageUrl} alt="Uploaded image" />}
    </div>
  );
}
