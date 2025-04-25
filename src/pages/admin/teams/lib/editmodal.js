import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Modal, Button, Form } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor"; 
import teamService from "../../../functionservice/teamService"; 
=======
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
>>>>>>> main

const EditTeamMemberModal = ({ show, onClose, onSave, member }) => {
  const [name, setName] = useState("");
<<<<<<< HEAD
  const [description, setDescription] = useState("");  
  const [image, setImage] = useState("");
    const [error, setError] = useState(null);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setDescription(member.bio || ""); 
      setImage(member.image || "");
    }
  }, [member]);

  const handleUpdate = async () => {
    if (!name || !image || !description) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const updatedMember = {
        ...member,
        name,
        description,
        image: image || '', 
        updatedAt: new Date().toISOString(),
      };

      const updatedData = await teamService.editTeam(member.id, updatedMember);
      onUpdate(updatedData);
=======
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load dữ liệu từ props.member khi mở modal
  useEffect(() => {
    if (member) {
      setName(member.name || "");
      setImageUrl(member.image || "");
      setDescription(member.description || "");
    }
  }, [member]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedMember = {
        ...member,
        name,
        image: imageUrl,
        description,
      };

      await onSave(updatedMember);
>>>>>>> main
      onClose();
    } catch (err) {
      console.error("Error updating team member:", err);
      setError("Không thể cập nhật thành viên. Vui lòng thử lại.");
<<<<<<< HEAD
=======
    } finally {
      setLoading(false);
>>>>>>> main
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thành viên nhóm</Modal.Title>
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
                <DescriptionEditor 
                  value={description} 
                  onChange={setDescription} 
=======
              <Form.Group controlId="image">
                <Form.Label>Ảnh (URL)</Form.Label>
                <Form.Control
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
>>>>>>> main
                />
                {imageUrl && <p>Đã nhập URL: {imageUrl}</p>}
              </Form.Group>
            </div>

            <div className="col-md-12">
<<<<<<< HEAD
              <Form.Group controlId="image">
                <Form.Label>URL ảnh</Form.Label>
                <Form.Control
                  type="text"
                  value={image || ""}
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
        <Button variant="primary" onClick={handleUpdate} disabled={!name || !image || !description}>
=======
        <Button variant="primary" onClick={handleSave} disabled={loading}>
>>>>>>> main
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTeamMemberModal;
