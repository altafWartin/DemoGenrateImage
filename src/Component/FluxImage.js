// src/FluxImage.js

import React, { useState } from "react";
import { query } from "./fluxQuery";
import { FaUpload } from "react-icons/fa"; // Upload icon from react-icons

const FluxImage = () => {
  const [image, setImage] = useState(null);
  const [inputText, setInputText] = useState(""); // For handling the textarea input
  const [loading, setLoading] = useState(false); // For tracking loading state

  const fetchImage = async () => {
    if (!inputText) return; // Prevent sending if the input is empty
    setLoading(true); // Set loading to true when the process starts
    try {
      const response = await query({ inputs: inputText }); // Send the input text to the query
      const url = URL.createObjectURL(response); // Convert the Blob into an image URL
      setImage(url);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false); // Set loading to false after the process is done
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value); // Update textarea value
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url); // Display uploaded image
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Describe the image you want to generate..."
        rows={4}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={fetchImage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Generating..." : "Send"}
        </button>
        <label htmlFor="imageUpload" className="cursor-pointer">
          <FaUpload size={24} className="text-gray-700" />
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>
      {loading && (
        <div className="mt-4 text-gray-500">Loading... Please wait.</div> // Display loading message
      )}
      {image && !loading && (
        <div className="mt-8">
          <img src={image} alt="Generated" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default FluxImage;
