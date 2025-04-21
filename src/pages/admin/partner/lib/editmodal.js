import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditPartnerModal = ({ show, onClose, partner, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    isActive: true,
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        name: partner.name || "",
        logo: partner.logo || "",
        website: partner.website || "",
        isActive: partner.isActive ?? true,
      });
    }
  }, [partner]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.logo || !formData.website) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const updatedPartner = {
      ...partner,
      ...formData,
      updatedAt: new Date().toISOString(),
    };
    onUpdate(updatedPartner);
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa đối tác</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Tên đối tác</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên đối tác"
            />
          </Form.Group>

          <Form.Group controlId="logo" className="mb-3">
            <Form.Label>Logo (URL)</Form.Label>
            <Form.Control
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="Nhập đường dẫn logo"
            />
          </Form.Group>

          <Form.Group controlId="website" className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Nhập website"
            />
          </Form.Group>

          <Form.Group controlId="isActive" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Hiển thị đối tác"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPartnerModal;
