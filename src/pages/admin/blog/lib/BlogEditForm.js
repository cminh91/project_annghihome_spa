import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor"; // Đảm bảo đường dẫn chính xác

const BlogEditForm = ({ show, handleClose, initialData, onSave }) => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    author: "", // Sửa "name" thành "author" để rõ nghĩa hơn
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Nhóm: Hình ảnh */}
          <Form.Group className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            {formData.image && (
              <img
                src={formData.image}
                alt="preview"
                className="mt-2"
                style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
              />
            )}
          </Form.Group>

          {/* Nhóm: Thông tin cơ bản */}
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Nhập tiêu đề"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Nhóm: Mô tả - Sử dụng DescriptionEditor */}
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <DescriptionEditor
              value={formData.description}
              onChange={handleDescriptionChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tác giả</Form.Label>
            <Form.Control
              type="text"
              name="author"
              placeholder="Nhập tên tác giả"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Nút submit */}
          <Button type="submit" variant="primary">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BlogEditForm;
