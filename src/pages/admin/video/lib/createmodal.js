import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CreateImageModal = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    url: "",
    alt: "",
    productId: "",
    serviceId: "",
    newsId: "",
    aboutId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra chỉ liên kết với 1 bảng
    const linkedTables = ["productId", "serviceId", "newsId", "aboutId"].filter(
      (key) => formData[key]
    );
    if (linkedTables.length > 1) {
      alert("Chỉ được liên kết ảnh với một bảng!");
      return;
    }

    onSave(formData);
    onClose();
    setFormData({
      url: "",
      alt: "",
      productId: "",
      serviceId: "",
      newsId: "",
      aboutId: "",
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm ảnh mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>URL ảnh</Form.Label>
            <Form.Control
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Alt (mô tả)</Form.Label>
            <Form.Control
              type="text"
              name="alt"
              value={formData.alt}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Liên kết với:</Form.Label>
            <Form.Control
              type="text"
              name="productId"
              placeholder="ID sản phẩm (nếu có)"
              value={formData.productId}
              onChange={handleChange}
            />
            <Form.Control
              type="text"
              name="serviceId"
              placeholder="ID dịch vụ (nếu có)"
              value={formData.serviceId}
              onChange={handleChange}
              className="mt-2"
            />
            <Form.Control
              type="text"
              name="newsId"
              placeholder="ID tin tức (nếu có)"
              value={formData.newsId}
              onChange={handleChange}
              className="mt-2"
            />
            <Form.Control
              type="text"
              name="aboutId"
              placeholder="ID giới thiệu (nếu có)"
              value={formData.aboutId}
              onChange={handleChange}
              className="mt-2"
            />
            <Form.Text className="text-muted">
              Chỉ điền **một** ID trong số các trường trên.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Lưu ảnh
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateImageModal;
