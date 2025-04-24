import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import storeService from "../../../functionservice/storeService";

const CreateStoreModal = ({ show, onClose, onStoreCreated }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    zipCode: "",
    isDefault: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Reset form and messages when modal opens/closes
  useEffect(() => {
    if (show) {
      setFormData({
        fullName: "",
        phoneNumber: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        zipCode: "",
        isDefault: false,
      });
      setError(null);
      setSuccessMessage(null);
      setLoading(false);
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.street || !formData.city) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc (Tên cửa hàng, Số điện thoại, Đường, Thành phố).");
      return false;
    }
    // Optional: Add phone number format validation
    if (!/^\d{10,11}$/.test(formData.phoneNumber)) {
      setError("Số điện thoại phải có 10 hoặc 11 chữ số.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const newStore = await storeService.createaddresses(formData);
      setSuccessMessage("Địa chỉ đã được tạo thành công!");
      onStoreCreated(newStore); // Notify parent to refresh the list
      setTimeout(() => {
        onClose(); // Delay closing to show success message
      }, 1000);
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm địa chỉ mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Success or Error message */}
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="fullName">
                <Form.Label>Tên cửa hàng</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phoneNumber">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="street">
                <Form.Label>Đường</Form.Label>
                <Form.Control
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="ward">
                <Form.Label>Phường/Xã</Form.Label>
                <Form.Control
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="district">
                <Form.Label>Quận/Huyện</Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={formData.district}
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
                  required
                />
              </Form.Group>

              <Form.Group controlId="zipCode">
                <Form.Label>Mã bưu điện</Form.Label>
                <Form.Control
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="isDefault">
                <Form.Check
                  type="checkbox"
                  name="isDefault"
                  label="Đặt làm mặc định"
                  checked={formData.isDefault}
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
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu địa chỉ"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateStoreModal;