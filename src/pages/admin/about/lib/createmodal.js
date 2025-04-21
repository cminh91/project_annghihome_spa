import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const CreateAboutModal = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mission: "",
    vision: "",
    history: "",
  });

  useEffect(() => {
    if (show) {
      // Reset khi mở modal
      setFormData({
        title: "",
        content: "",
        mission: "",
        vision: "",
        history: "",
      });
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = () => {
    const newItem = {
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSave(newItem);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Thêm mục Giới thiệu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="title" className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Nhập tiêu đề"
                />
              </Form.Group>
              <Form.Group controlId="mission" className="mb-3">
                <Form.Label>Sứ mệnh</Form.Label>
                <Form.Control
                  type="text"
                  name="mission"
                  value={formData.mission}
                  onChange={handleChange}
                  placeholder="Nhập sứ mệnh"
                />
              </Form.Group>
              <Form.Group controlId="vision" className="mb-3">
                <Form.Label>Tầm nhìn</Form.Label>
                <Form.Control
                  type="text"
                  name="vision"
                  value={formData.vision}
                  onChange={handleChange}
                  placeholder="Nhập tầm nhìn"
                />
              </Form.Group>
              <Form.Group controlId="history" className="mb-3">
                <Form.Label>Lịch sử</Form.Label>
                <Form.Control
                  type="text"
                  name="history"
                  value={formData.history}
                  onChange={handleChange}
                  placeholder="Nhập lịch sử phát triển"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="content" className="mb-3">
                <Form.Label>Nội dung</Form.Label>
                <DescriptionEditor
                  value={formData.content}
                  onChange={handleEditorChange}
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
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAboutModal;
