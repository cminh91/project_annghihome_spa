import React, { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import uploadService from "../../../functionservice/uploadService"; // Import uploadService

const CreateTeamMemberModal = ({ show, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected file
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      let imageUrl = "";
      if (imageFile) {
        const uploadedUrls = await uploadService.uploadImages([imageFile]);
        if (uploadedUrls && uploadedUrls.length > 0) {
          imageUrl = uploadedUrls[0]; // Get the first uploaded image URL
        }
      }

      const newMemberData = {
        name,
        image: imageUrl, // Use the uploaded image URL
        description,
      };

      onSave(newMemberData);
      setName("");
      setImageFile(null); // Reset file state
      setDescription("");
      onClose(); // Close modal on successful save
    } catch (err) {
      console.error("Error saving team member:", err);
      setError("Không thể lưu thành viên đội ngũ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm thành viên nhóm</Modal.Title>
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
                  required
                />
                 {imageFile && <p>Đã chọn tệp: {imageFile.name}</p>} {/* Display selected file name */}
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
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTeamMemberModal;
