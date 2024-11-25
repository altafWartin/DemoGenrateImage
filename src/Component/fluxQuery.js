// src/fluxQuery.js

// It's better to store the API key in environment variables to avoid exposing it in the codebase
const HUGGING_FACE_API_KEY = "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";

// Query to Hugging Face API (for generating images, etc.)
export async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
    {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`, // Use the key from environment variables
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from Hugging Face API");
  }

  const result = await response.blob();
  return result;
}

// Query for Face Swap (this is just a placeholder, replace with the actual face swap API)
export async function faceSwap(file) {
  const formData = new FormData();
  formData.append("image", file); // Assuming the API accepts an 'image' field

  const response = await fetch(
    "https://your-face-swap-api-endpoint.com/swap", // Replace with the actual API endpoint
    {
      headers: {
        Authorization: `Bearer ${HUGGING_FACE_API_KEY}`, // Replace with your face swap API key if needed
      },
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to swap faces");
  }

  const result = await response.blob(); // Assuming the result is returned as a Blob
  return result;
}
