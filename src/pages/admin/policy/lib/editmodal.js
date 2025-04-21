import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const EditPolicyModal = ({ show, onClose, policyData, onSave }) => {
  const [editedPolicyData, setEditedPolicyData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    isPublished: true,
    isActive: true,
  });

  useEffect(() => {
    if (policyData) setEditedPolicyData(policyData);
  }, [policyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPolicyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditedPolicyData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleContentChange = (value) => {
    setEditedPolicyData((prevState) => ({
      ...prevState,
      content: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedPolicyData);
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa Chính sách</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            {/* Cột trái */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editedPolicyData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  name="slug"
                  value={editedPolicyData.slug}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tóm tắt</Form.Label>
                <Form.Control
                  type="text"
                  name="excerpt"
                  value={editedPolicyData.excerpt}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Check
                type="checkbox"
                label="Hoạt động"
                name="isActive"
                checked={editedPolicyData.isActive}
                onChange={handleCheckboxChange}
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                label="Đã xuất bản"
                name="isPublished"
                checked={editedPolicyData.isPublished}
                onChange={handleCheckboxChange}
              />
            </Col>

            {/* Cột phải */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nội dung</Form.Label>
                <DescriptionEditor
                  value={editedPolicyData.content}
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
            Lưu
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditPolicyModal;
