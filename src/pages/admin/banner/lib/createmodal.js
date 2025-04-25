import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Image, Spinner } from "react-bootstrap"; // Added Image, Spinner
import bannerService from "../../../functionservice/BannerService";
import uploadService from "../../../functionservice/uploadService"; // Make sure this service has an upload method

// Comment removed
const BACKEND_BASE_URL = "http://127.0.0.1:5000"; // Or process.env.REACT_APP_API_BASE_URL

const CreateSliderModal = ({ show, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    shortTitle: "",
    longTitle: "",
    imageUrl: "", // This will store the URL after upload
    link: "",
    order: 0,
  });
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file object
  const [uploading, setUploading] = useState(false); // State for upload loading indicator
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadError, setUploadError] = useState(null); // Specific error for upload

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "order" ? parseInt(value) : value,
    }));
  };

  // New handler for file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return; // No file selected
    }

    setSelectedFile(file);
    setUploading(true);
    setUploadError(null);
    setError(null);

    try {
      // Pass the file as an array to uploadImages, as expected by the service
      // The service will handle creating FormData internally
      const imageUrls = await uploadService.uploadImages([file]); // Pass [file]

      console.log('Image URLs received from service:', imageUrls); // Log the array of URLs

      // Check if the response is an array and get the first URL
      let relativeImageUrl = null;
      if (Array.isArray(imageUrls) && imageUrls.length > 0) {
        relativeImageUrl = imageUrls[0]; // Get the first URL from the returned array
      }

      console.log('Relative image URL extracted:', relativeImageUrl);

      // Now check if the extracted relativeImageUrl is a valid string
      if (!relativeImageUrl || typeof relativeImageUrl !== 'string') {
         console.error("Extracted relative URL is not a valid string:", relativeImageUrl);
         throw new Error("Invalid relative image URL received or processed from server.");
      }

       // Prepend the base URL to create the full URL
       // Ensure no double slashes if relativeImageUrl already starts with /
       const fullImageUrl = `${BACKEND_BASE_URL}${relativeImageUrl.startsWith('/') ? '' : '/'}${relativeImageUrl}`;

       console.log('Full image URL constructed:', fullImageUrl); // Log the full URL

       // Validate the constructed full URL (optional, basic check)
       if (typeof fullImageUrl !== 'string' || !fullImageUrl.startsWith('http')) {
           console.error("Constructed full URL is invalid:", fullImageUrl);
           throw new Error("Failed to construct a valid full image URL.");
       }

      setFormData((prev) => ({
        ...prev,
        imageUrl: fullImageUrl, // Update formData with the full URL
      }));
    } catch (err) {
      console.error("Error during file upload or URL processing:", err); // Updated log
      setUploadError("Failed to upload image or process URL. Please try again."); // Updated message
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
      setSelectedFile(null);
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setUploadError(null); // Clear upload error on submit attempt

    // Basic validation: Check if image URL is present after potential upload attempt
    if (!formData.imageUrl && !uploading) {
        setError("Please upload an image.");
        setLoading(false);
        return;
    }
     if (uploading) {
        setError("Please wait for the image upload to complete.");
        setLoading(false);
        return;
    }


    try {
      const bannerData = {
        shortTitle: formData.shortTitle,
        longTitle: formData.longTitle,
        imageUrl: formData.imageUrl, // Use the URL from state
        link: formData.link || "",
        order: formData.order || 0,
      };

      const response = await bannerService.createBanner(bannerData);
      if (onSaved) onSaved(response);
      resetForm();
      onClose(); // Close modal on success
    } catch (error) {
      setError(error.message || "An unexpected error occurred."); // Show specific error message
      console.error("Error creating slider:", error);
      // Keep modal open on error
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      shortTitle: "",
      longTitle: "",
      imageUrl: "",
      link: "",
      order: 0,
    });
    setSelectedFile(null);
    setUploading(false);
    setError(null);
    setUploadError(null);
  };

   // Use a different handler for closing to ensure reset
   const handleClose = () => {
    resetForm(); // Reset form state when closing modal
    onClose();
  };


  return (
    <Modal show={show} onHide={handleClose} centered size="lg"> {/* Use handleClose */}
      <Modal.Header closeButton>
        <Modal.Title>Thêm Mới Slider</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Tiêu đề ngắn</Form.Label>
              <Form.Control
                type="text"
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleChange}
                disabled={loading || uploading}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Tiêu đề dài</Form.Label>
              <Form.Control
                type="text"
                name="longTitle"
                value={formData.longTitle}
                onChange={handleChange}
                 disabled={loading || uploading}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Changed Image URL input to File input */}
            <Col md={6}>
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                name="imageFile" // Name can be different, not directly tied to formData state key
                onChange={handleFileChange}
                accept="image/*" // Suggest acceptable image types
                disabled={loading || uploading} // Disable while uploading/saving
              />
              {uploading && (
                 <div className="d-flex align-items-center mt-2">
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Đang tải lên...</span>
                 </div>
                )}
              {uploadError && <p className="text-danger mt-1">{uploadError}</p>}
              {/* Image Preview */}
              {formData.imageUrl && !uploading && !uploadError && (
                <div className="mt-2">
                  <Image src={formData.imageUrl} thumbnail width={150} />
                </div>
              )}
            </Col>
            <Col md={6}>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                 disabled={loading || uploading}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Label>Thứ tự</Form.Label>
              <Form.Control
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                 disabled={loading || uploading}
              />
            </Col>
          </Row>
        </Form>
        {/* Display general submission error */}
        {error && <p className="text-danger">{typeof error === 'string' ? error : error.message || "An error occurred."}</p>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading || uploading}> {/* Use handleClose */}
          Đóng
        </Button>
        <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading || uploading || !formData.imageUrl} // Disable if loading, uploading, or no image URL
        >
          {loading ? "Đang lưu..." : "Lưu Slider"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSliderModal;