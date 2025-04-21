import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const EditModal = ({ show, onClose, onSave, initialData, categories }) => {
  const [formData, setFormData] = useState({
    id: "",
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLongDescriptionChange = (value) => {
    setFormData((prevData) => ({ ...prevData, longDescription: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa dịch vụ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Tiêu đề */}
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Slug */}
          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Mô tả ngắn */}
          <Form.Group className="mb-3">
            <Form.Label>Mô tả ngắn</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
            />
          </Form.Group>

          {/* Mô tả dài */}
          <Form.Group className="mb-3">
            <Form.Label>Mô tả chi tiết</Form.Label>
            <DescriptionEditor
              value={formData.longDescription}
              onChange={handleLongDescriptionChange}
            />
          </Form.Group>

          {/* Giá */}
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Danh mục */}
          <Form.Group className="mb-3">
            <Form.Label>Danh mục</Form.Label>
            <Form.Control
              as="select"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Features */}
          <Form.Group className="mb-3">
            <Form.Label>Features</Form.Label>
            <Form.Control
              as="textarea"
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>

          {/* Meta Title */}
          <Form.Group className="mb-3">
            <Form.Label>Meta Title</Form.Label>
            <Form.Control
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Meta Description */}
          <Form.Group className="mb-3">
            <Form.Label>Meta Description</Form.Label>
            <Form.Control
              as="textarea"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows={2}
            />
          </Form.Group>

          {/* Meta Keywords */}
          <Form.Group className="mb-3">
            <Form.Label>Meta Keywords</Form.Label>
            <Form.Control
              type="text"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Checkboxes */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Nổi bật (featured)"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <Form.Check
              type="checkbox"
              label="Hoạt động (isActive)"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Submit */}
          <Button type="submit" variant="primary">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
