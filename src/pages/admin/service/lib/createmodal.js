import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const ServiceForm = ({ initialData, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    price: "",
    featured: false,
    categoryId: "",
    features: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLongDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, longDescription: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col sm={6}>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả ngắn</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả chi tiết</Form.Label>
            <DescriptionEditor
              value={formData.longDescription}
              onChange={handleLongDescriptionChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col sm={6}>
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Danh mục</Form.Label>
              <Form.Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Đặc điểm</Form.Label>
            <Form.Control
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Ví dụ: Bền, Nhẹ, Dễ sử dụng"
            />
          </Form.Group>

          <Row className="mb-3">
            <Col sm={4}>
              <Form.Label>Meta Title</Form.Label>
              <Form.Control
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
              />
            </Col>
            <Col sm={4}>
              <Form.Label>Meta Description</Form.Label>
              <Form.Control
                type="text"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
              />
            </Col>
            <Col sm={4}>
              <Form.Label>Meta Keywords</Form.Label>
              <Form.Control
                type="text"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-between">
            <Form.Check
              type="checkbox"
              label="Hiển thị"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Nổi bật"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
          </div>

          <div className="text-end mt-3">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Lưu
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceForm;
