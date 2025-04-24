const uploadImages = async (files) => {
  if (!files || files.length === 0) {
    return [];
  }

  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/upload-images`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      console.error("Upload failed with status:", response.status);
      const text = await response.text();
      console.error("Response body:", text);
      throw new Error('Failed to upload images');
    }

    const data = await response.json();
    return data.imageUrls; // API returns { imageUrls: [...] }

  } catch (error) {
    console.error('Error uploading images:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default {
  uploadImages,
};