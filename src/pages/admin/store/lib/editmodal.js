import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const EditStoreModal = ({ show, onClose, onSave, storeData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    email: "",
    openingHours: "",
    socialLinks: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    googleMapsUrl: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (storeData) {
      setFormData({ ...storeData });
    }
  }, [storeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa cửa hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Cột thông tin chính */}
          <Col md={8}>
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="name">
                    <Form.Label>Tên cửa hàng</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="phone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="openingHours">
                    <Form.Label>Giờ mở cửa</Form.Label>
                    <Form.Control
                      type="text"
                      name="openingHours"
                      value={formData.openingHours}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group controlId="city">
                    <Form.Label>Thành phố</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="province">
                    <Form.Label>Tỉnh</Form.Label>
                    <Form.Control
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="postalCode">
                    <Form.Label>Mã bưu điện</Form.Label>
                    <Form.Control
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group controlId="latitude">
                    <Form.Label>Vĩ độ</Form.Label>
                    <Form.Control
                      type="number"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="longitude">
                    <Form.Label>Kinh độ</Form.Label>
                    <Form.Control
                      type="number"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="googleMapsUrl">
                <Form.Label>Google Maps URL</Form.Label>
                <Form.Control
                  type="text"
                  name="googleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="socialLinks">
                <Form.Label>Liên kết mạng xã hội</Form.Label>
                <Form.Control
                  type="text"
                  name="socialLinks"
                  value={formData.socialLinks}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Mô tả</Form.Label>
                <DescriptionEditor
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
            </Form>
          </Col>

          {/* Cột thông tin SEO */}
          <Col md={4}>
            <Card>
              <Card.Header className="fw-bold">Thông tin SEO</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3" controlId="metaTitle">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="metaDescription">
                  <Form.Label>Meta Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="metaKeywords">
                  <Form.Label>Meta Keywords</Form.Label>
                  <Form.Control
                    type="text"
                    name="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStoreModal;
