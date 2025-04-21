import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const CreatePolicyModal = ({ show, onClose, onCreate }) => {
  const [newPolicy, setNewPolicy] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    isPublished: true,
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPolicy((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewPolicy((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleContentChange = (value) => {
    setNewPolicy((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ ...newPolicy, id: Date.now().toString() }); // Tạo id tạm
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Thêm Chính sách</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            {/* Cột trái: Form nhập thông tin */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={newPolicy.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  name="slug"
                  value={newPolicy.slug}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tóm tắt</Form.Label>
                <Form.Control
                  type="text"
                  name="excerpt"
                  value={newPolicy.excerpt}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Check
                type="checkbox"
                label="Hoạt động"
                name="isActive"
                checked={newPolicy.isActive}
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Đã xuất bản"
                name="isPublished"
                checked={newPolicy.isPublished}
                onChange={handleCheckboxChange}
              />
            </Col>

            {/* Cột phải: Nội dung mô tả (rich editor) */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nội dung</Form.Label>
                <DescriptionEditor
                  value={newPolicy.content}
                  onChange={handleContentChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="primary" type="submit">
            Thêm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreatePolicyModal;
