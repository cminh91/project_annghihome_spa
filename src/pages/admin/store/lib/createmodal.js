import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";  // Import DescriptionEditor component
import storeService from "../../../functionservice/storeService";  // Import storeService

const CreateStoreModal = ({ show, onClose, onStoreCreated }) => {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      description: content,  // Update description content
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const newStore = await storeService.createStore(formData);
      setSuccessMessage("Cửa hàng đã được tạo thành công!");
      onStoreCreated(newStore);  // Notify parent to refresh the list or update UI
      onClose();  // Close modal
    } catch (err) {
      setError("Có lỗi xảy ra khi tạo cửa hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Thêm cửa hàng mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Success or Error message */}
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form>
          <Row>
            {/* Column 1 - Store Information */}
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

              <Form.Group controlId="address">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>Thành phố</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="province">
                <Form.Label>Tỉnh</Form.Label>
                <Form.Control
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="postalCode">
                <Form.Label>Mã bưu điện</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="openingHours">
                <Form.Label>Giờ mở cửa</Form.Label>
                <Form.Control
                  type="text"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="socialLinks">
                <Form.Label>Liên kết mạng xã hội</Form.Label>
                <Form.Control
                  type="text"
                  name="socialLinks"
                  value={formData.socialLinks}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group controlId="description">
                <Form.Label>Mô tả</Form.Label>
                {/* DescriptionEditor for rich-text content */}
                <DescriptionEditor
                  value={formData.description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
            </Col>

            {/* Column 2 - SEO Information */}
            <Col md={6}>
              <Form.Group controlId="metaTitle">
                <Form.Label>Meta Title</Form.Label>
                <Form.Control
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  placeholder="Nhập meta title"
                />
                <Form.Text className="text-muted">
                  Nếu để trống, tên cửa hàng sẽ được sử dụng làm meta title.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="metaDescription">
                <Form.Label>Meta Description</Form.Label>
                <Form.Control
                  type="text"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="Nhập meta description"
                />
                <Form.Text className="text-muted">
                  Mô tả ngắn gọn về cửa hàng, hiển thị trong kết quả tìm kiếm.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="metaKeywords">
                <Form.Label>Meta Keywords</Form.Label>
                <Form.Control
                  type="text"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleChange}
                  placeholder="Từ khóa 1, Từ khóa 2, Từ khóa 3"
                />
                <Form.Text className="text-muted">
                  Các từ khóa liên quan đến cửa hàng, phân cách bằng dấu phẩy.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="googleMapsUrl">
                <Form.Label>Google Maps URL</Form.Label>
                <Form.Control
                  type="text"
                  name="googleMapsUrl"
                  value={formData.googleMapsUrl}
                  onChange={handleChange}
                  placeholder="Nhập URL Google Maps"
                />
              </Form.Group>

              <Form.Group controlId="latitude">
                <Form.Label>Vĩ độ (Latitude)</Form.Label>
                <Form.Control
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="longitude">
                <Form.Label>Kinh độ (Longitude)</Form.Label>
                <Form.Control
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Đang lưu...' : 'Lưu cửa hàng'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateStoreModal;
