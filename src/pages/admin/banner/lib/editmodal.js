import React, { useState, useEffect } from "react";
// Import necessary components and services
import { Modal, Button, Form, Row, Col, Image, Spinner } from "react-bootstrap";
import bannerService from "../../../functionservice/BannerService";
import uploadService from "../../../functionservice/uploadService"; // Import upload service

// Define backend base URL (same as in createmodal.js)
const BACKEND_BASE_URL = "http://127.0.0.1:5000";

const EditSliderModal = ({ show, onClose, onSave, sliderData }) => {
  // Use a single formData state object
  const [formData, setFormData] = useState({
    id: null, // Keep track of the ID
    shortTitle: "",
    longTitle: "",
    imageUrl: "", // Stores the current or newly uploaded URL
    link: "",
    order: 0,
  });
  const [selectedFile, setSelectedFile] = useState(null); // For the new file object
  const [uploading, setUploading] = useState(false); // Upload loading state
  const [loading, setLoading] = useState(false); // General saving state
  const [error, setError] = useState(null); // General error state
  const [uploadError, setUploadError] = useState(null); // Upload specific error

  // Populate form when sliderData changes
  useEffect(() => {
    if (sliderData) {
      setFormData({
        id: sliderData.id,
        shortTitle: sliderData.shortTitle || "",
        longTitle: sliderData.longTitle || "",
        imageUrl: sliderData.imageUrl || "", // Initial image URL
        link: sliderData.link || "",
        order: sliderData.order || 0,
      });
      // Reset file/upload states when data changes
      setSelectedFile(null);
      setUploading(false);
      setUploadError(null);
      setError(null);
    }
  }, [sliderData]); // Dependency array includes sliderData

  // Handle changes in regular form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "order" ? parseInt(value) : value,
    }));
  };

  // Handle file input change (adapted from createmodal.js)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    setSelectedFile(file);
    setUploading(true);
    setUploadError(null);
    setError(null);

    try {
      const imageUrls = await uploadService.uploadImages([file]); // Pass file in array

      console.log('Image URLs received from service:', imageUrls);

      let relativeImageUrl = null;
      if (Array.isArray(imageUrls) && imageUrls.length > 0) {
        relativeImageUrl = imageUrls[0];
      }

      console.log('Relative image URL extracted:', relativeImageUrl);

      if (!relativeImageUrl || typeof relativeImageUrl !== 'string') {
         console.error("Extracted relative URL is not a valid string:", relativeImageUrl);
         throw new Error("Invalid relative image URL received or processed from server.");
      }

       const fullImageUrl = `${BACKEND_BASE_URL}${relativeImageUrl.startsWith('/') ? '' : '/'}${relativeImageUrl}`;
       console.log('Full image URL constructed:', fullImageUrl);

       if (typeof fullImageUrl !== 'string' || !fullImageUrl.startsWith('http')) {
           console.error("Constructed full URL is invalid:", fullImageUrl);
           throw new Error("Failed to construct a valid full image URL.");
       }

      // Update only the imageUrl in formData
      setFormData((prev) => ({
        ...prev,
        imageUrl: fullImageUrl,
      }));
    } catch (err) {
      console.error("Error during file upload or URL processing:", err);
      setUploadError("Không thể tải lên hình ảnh. Vui lòng thử lại."); // Vietnamese error
      // Optionally revert imageUrl if upload fails? Or keep the old one?
      // setFormData((prev) => ({ ...prev, imageUrl: sliderData.imageUrl || "" })); // Revert to original
      setSelectedFile(null);
    } finally {
      setUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setUploadError(null);

    // Basic validation
    if (!formData.imageUrl) { // Check if there's an image URL (either old or new)
        setError("Vui lòng cung cấp hình ảnh."); // Vietnamese error
        setLoading(false);
        return;
    }
     if (uploading) { // Don't submit if upload is in progress
        setError("Vui lòng đợi quá trình tải lên hình ảnh hoàn tất."); // Vietnamese error
        setLoading(false);
        return;
    }

    // Prepare data for API (excluding ID if your service takes it separately)
    const updatedSliderData = {
      shortTitle: formData.shortTitle,
      longTitle: formData.longTitle,
      imageUrl: formData.imageUrl, // Use the current URL in state
      link: formData.link || "",
      order: Number(formData.order) || 0,
    };

    try {
      // Pass ID and data to the edit service
      const response = await bannerService.editBanner(formData.id, updatedSliderData);
      onSave(response); // Pass the updated data back to the list
      handleClose(); // Use handleClose to reset and close
    } catch (error) {
      setError(error.message || "Đã xảy ra lỗi không mong muốn khi cập nhật."); // Vietnamese error
      console.error("Failed to update slider:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form state (useful for closing)
   const resetForm = () => {
    if (sliderData) { // Reset to original data if available
         setFormData({
            id: sliderData.id,
            shortTitle: sliderData.shortTitle || "",
            longTitle: sliderData.longTitle || "",
            imageUrl: sliderData.imageUrl || "",
            link: sliderData.link || "",
            order: sliderData.order || 0,
         });
    } else { // Fallback reset (shouldn't happen if modal opens correctly)
        setFormData({ id: null, shortTitle: "", longTitle: "", imageUrl: "", link: "", order: 0 });
    }
    setSelectedFile(null);
    setUploading(false);
    setLoading(false);
    setError(null);
    setUploadError(null);
  };

  // Handle modal close action
  const handleClose = () => {
    resetForm(); // Reset the form before closing
    onClose();
  };


  return (
    // Use handleClose for onHide
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        {/* Vietnamese title */}
        <Modal.Title>Chỉnh Sửa Slider</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Row 1: Titles */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Tiêu đề ngắn</Form.Label>
              <Form.Control
                type="text"
                name="shortTitle" // Add name attribute
                placeholder="Nhập tiêu đề ngắn"
                value={formData.shortTitle}
                onChange={handleChange}
                disabled={loading || uploading} // Disable when loading/uploading
              />
            </Col>
            <Col md={6}>
              <Form.Label>Tiêu đề dài</Form.Label>
              <Form.Control
                type="text"
                name="longTitle" // Add name attribute
                placeholder="Nhập tiêu đề dài"
                value={formData.longTitle}
                onChange={handleChange}
                disabled={loading || uploading}
              />
            </Col>
          </Row>

          {/* Row 2: Image Upload and Link */}
          <Row className="mb-3">
            <Col md={6}>
              {/* Changed to File Input */}
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                name="imageFile" // Can be different from state key
                onChange={handleFileChange}
                accept="image/*"
                disabled={loading || uploading}
              />
              {/* Uploading Indicator */}
              {uploading && (
                 <div className="d-flex align-items-center mt-2">
                    <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                    <span className="ms-2">Đang tải lên...</span>
                 </div>
              )}
              {/* Upload Error Message */}
              {uploadError && <p className="text-danger mt-1">{uploadError}</p>}
              {/* Image Preview */}
              {/* Show preview if imageUrl exists, not uploading, and no upload error */}
              {formData.imageUrl && !uploading && !uploadError && (
                <div className="mt-2">
                  <p className="mb-1 small">Ảnh hiện tại:</p>
                  <Image src={formData.imageUrl} thumbnail width={150} alt="Xem trước hình ảnh"/>
                </div>
              )}
               {/* Show placeholder if no image and not uploading */}
               {!formData.imageUrl && !uploading && (
                 <div className="mt-2 text-muted">
                    Chưa có hình ảnh. Tải lên một ảnh mới.
                 </div>
                )}
            </Col>
            <Col md={6}>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link" // Add name attribute
                placeholder="Nhập link"
                value={formData.link}
                onChange={handleChange}
                disabled={loading || uploading}
              />
            </Col>
          </Row>

          {/* Row 3: Order */}
          <Row className="mb-3">
            <Col md={3}> {/* Adjusted column size */}
              <Form.Label>Thứ tự</Form.Label>
              <Form.Control
                type="number"
                name="order" // Add name attribute
                value={formData.order}
                onChange={handleChange}
                disabled={loading || uploading}
              />
            </Col>
          </Row>
        </Form>
        {/* Display general submission error */}
        {error && <p className="text-danger mt-2">{typeof error === 'string' ? error : error.message || "Đã xảy ra lỗi."}</p>}
      </Modal.Body>
      <Modal.Footer>
        {/* Use handleClose for the close button */}
        <Button variant="secondary" onClick={handleClose} disabled={loading || uploading}>
          Đóng
        </Button>
        {/* Disable save button when loading/uploading or if no image URL */}
        <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={loading || uploading || !formData.imageUrl}
        >
          {/* Vietnamese button text */}
          {loading ? "Đang lưu..." : "Lưu Thay Đổi"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSliderModal;
