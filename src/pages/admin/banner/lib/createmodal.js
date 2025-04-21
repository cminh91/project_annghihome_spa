import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import bannerService from "../../../functionservice/BannerService";

const CreateSliderModal = ({ show, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    url: "",
    link: "",
    isActive: true,
    order: 1,
    buttonText: "",
    mobileUrl: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "order" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await bannerService.createBanner(formData); // Sending data as FormData
      if (onSaved) onSaved(); // Callback to reload list if needed
      resetForm();
      onClose();
    } catch (error) {
      alert("Không thể tạo slider. Vui lòng kiểm tra lại.");
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      url: "",
      link: "",
      isActive: true,
      order: 1,
      buttonText: "",
      mobileUrl: "",
      description: "",
    });
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm Mới Slider</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Phụ đề</Form.Label>
              <Form.Control
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>URL Ảnh</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>URL Ảnh Di động</Form.Label>
              <Form.Control
                type="text"
                name="mobileUrl"
                value={formData.mobileUrl}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Thứ tự</Form.Label>
              <Form.Control
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
              />
            </Col>
            <Col md={3} className="d-flex align-items-center">
              <Form.Check
                type="checkbox"
                label="Hiển thị"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Văn bản nút</Form.Label>
              <Form.Control
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu Slider"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSliderModal;
