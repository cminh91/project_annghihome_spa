import React, { useState } from "react";
<<<<<<< HEAD
import { Modal, Button, Form } from "react-bootstrap";
import teamService from "../../../functionservice/teamService";

const CreateTeamMemberModal = ({ show, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      // Prepare data for API
      const teamData = {
        name,
        image,
        description,
      };

      const response = await teamService.createTeam(teamData);

      const newMember = {
        id: response.id.toString(),
        name: response.name,
        position: "N/A", 
        bio: response.description || "N/A",
        image: response.image || "",
        socialLinks: "", 
        order: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onSave(newMember);
      setName("");
      setDescription("");
      setImage("");
      setError(null);
      onClose();
    } catch (err) {
      console.error("Error creating team member:", err);
      setError("Không thể tạo thành viên. Vui lòng thử lại.");
=======
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
>>>>>>> main
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm thành viên nhóm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
<<<<<<< HEAD
        {error && <div className="alert alert-danger">{error}</div>}
=======
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
>>>>>>> main
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
<<<<<<< HEAD
              <Form.Group controlId="description">
                <Form.Label>Thông tin về thành viên</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
=======
              <Form.Group controlId="image">
                <Form.Label>Ảnh (URL)</Form.Label>
                <Form.Control
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)} // Handle URL input
                  required
>>>>>>> main
                />
                {imageUrl && <p>Đã nhập URL: {imageUrl}</p>} {/* Display entered URL */}
              </Form.Group>
            </div>

            <div className="col-md-12">
<<<<<<< HEAD
              <Form.Group controlId="image">
                <Form.Label>URL ảnh</Form.Label>
                <Form.Control
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Nhập URL ảnh (ví dụ: https://example.com/image.jpg)"
=======
              <Form.Group controlId="description">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
>>>>>>> main
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
<<<<<<< HEAD
        <Button variant="primary" onClick={handleSave} disabled={!name || !image || !description}>
=======
        <Button variant="primary" onClick={handleSave} disabled={loading}>
>>>>>>> main
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTeamMemberModal;
