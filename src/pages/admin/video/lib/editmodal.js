import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditImageModal = ({ show, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    url: "",
    alt: "",
    productId: "",
    serviceId: "",
    newsId: "",
    aboutId: "",
  });

  // Khi modal mở, cập nhật form với dữ liệu ban đầu
  useEffect(() => {
    if (initialData) {
      setFormData({
        url: initialData.url,
        alt: initialData.alt,
        productId: initialData.productId || "",
        serviceId: initialData.serviceId || "",
        newsId: initialData.newsId || "",
        aboutId: initialData.aboutId || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Gửi dữ liệu sửa đổi lên cha
    onClose(); // Đóng modal sau khi lưu
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa ảnh</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Alt Text</Form.Label>
            <Form.Control
              type="text"
              name="alt"
              value={formData.alt}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sản phẩm ID</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dịch vụ ID</Form.Label>
            <Form.Control
              type="text"
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tin tức ID</Form.Label>
            <Form.Control
              type="text"
              name="newsId"
              value={formData.newsId}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Giới thiệu ID</Form.Label>
            <Form.Control
              type="text"
              name="aboutId"
              value={formData.aboutId}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditImageModal;
