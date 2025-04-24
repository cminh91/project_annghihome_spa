import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import uploadService from "../../../functionservice/uploadService"; // Import uploadService

const EditTeamMemberModal = ({ show, onClose, member, onUpdate }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [imageUrl, setImageUrl] = useState(""); // State to store the current image URL
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Khi modal mở, gán giá trị của thành viên vào các trường
  useEffect(() => {
    if (member) {
      setName(member.name);
      setImageUrl(member.image); // Set current image URL
      setDescription(member.description);
      setImageFile(null); // Reset image file state
    }
  }, [member]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      let finalImageUrl = imageUrl; // Start with the current image URL

      if (imageFile) { // If a new file is selected, upload it
        const uploadedUrls = await uploadService.uploadImages([imageFile]);
        if (uploadedUrls && uploadedUrls.length > 0) {
          finalImageUrl = uploadedUrls[0]; // Use the new uploaded image URL
        }
      }

      const updatedMemberData = {
        id: member.id, // Keep the original ID
        name,
        image: finalImageUrl, // Use the final image URL
        description,
      };

      onUpdate(updatedMemberData); // Call onUpdate with the updated data
      onClose(); // Close modal on successful update
    } catch (err) {
      console.error("Error updating team member:", err);
      setError("Không thể cập nhật thành viên đội ngũ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thành viên nhóm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <div className="row">
            <div className="col-md-12">
              <Form.Group controlId="name">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-12">
              <Form.Group controlId="image">
                <Form.Label>Ảnh</Form.Label>
                <Form.Control
                  type="file" // Changed to file input
                  onChange={handleImageChange}
                />
                {imageFile && <p>Đã chọn tệp mới: {imageFile.name}</p>} {/* Display selected file name */}
                {!imageFile && imageUrl && <p>Ảnh hiện tại: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>} {/* Display current image URL if no new file selected */}
              </Form.Group>
            </div>

            <div className="col-md-12">
              <Form.Group controlId="description">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={loading}>
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTeamMemberModal;
