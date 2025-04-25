import React, { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";

const CreateTeamMemberModal = ({ show, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // State to store the image URL
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const newMemberData = {
        name,
        image: imageUrl, // Use the entered image URL
        description,
      };

      onSave(newMemberData);
      setName("");
      setImageUrl(""); // Reset URL state
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
                <Form.Label>Ảnh (URL)</Form.Label>
                <Form.Control
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)} // Handle URL input
                  required
                />
                {imageUrl && <p>Đã nhập URL: {imageUrl}</p>} {/* Display entered URL */}
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
