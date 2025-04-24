import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import bannerService from "../../../functionservice/BannerService";

const CreateSliderModal = ({ show, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    shortTitle: "",
    longTitle: "",
    imageUrl: "",
    link: "",
    order: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "order" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const bannerData = {
        shortTitle: formData.shortTitle,
        longTitle: formData.longTitle,
        imageUrl: formData.imageUrl,
        link: formData.link || "",
        order: formData.order || 0,
        // createdAt và updatedAt sẽ được backend xử lý
      };

      const response = await bannerService.createBanner(bannerData);
      if (onSaved) onSaved(response);
      resetForm();
      onClose();
    } catch (error) {
      setError(error);
      console.error("Error creating slider:", error);
      alert("Không thể tạo slider. Vui lòng kiểm tra lại.");
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
              <Form.Label>Tiêu đề ngắn</Form.Label>
              <Form.Control
                type="text"
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Tiêu đề dài</Form.Label>
              <Form.Control
                type="text"
                name="longTitle"
                value={formData.longTitle}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Hình ảnh URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Nhập URL ảnh"
              />
            </Col>
            <Col md={6}>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
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
              />
            </Col>
            
            {/* Bạn có thể thêm các input khác nếu cần cho createdAt và updatedAt (thường là read-only hoặc backend quản lý) */}
          </Row>
        </Form>
        {error && <p className="text-danger">{error.message}</p>}
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