import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";

const EditTeamMemberModal = ({ show, onClose, onSave, member }) => {
  const [name, setName] = useState("");
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
      onClose();
    } catch (err) {
      console.error("Error updating team member:", err);
      setError("Không thể cập nhật thành viên. Vui lòng thử lại.");
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
                <Form.Label>Ảnh (URL)</Form.Label>
                <Form.Control
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
                {imageUrl && <p>Đã nhập URL: {imageUrl}</p>}
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
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTeamMemberModal;
