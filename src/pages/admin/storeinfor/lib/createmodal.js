import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const CreateStoreInfoModal = ({ show, onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    logo: "",
    favicon: "",
    hotline: "",
    footer: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFooterChange = (value) => {
    setForm((prev) => ({
      ...prev,
      footer: value,
    }));
  };

  const handleSubmit = () => {
    const timestamp = new Date().toISOString();
    onCreate({
      ...form,
      id: Date.now().toString(),
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Thêm Thông tin Cửa hàng</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Modal.Body>
          <Row>
            {/* Cột trái */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  name="logo"
                  value={form.logo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Favicon</Form.Label>
                <Form.Control
                  name="favicon"
                  value={form.favicon}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hotline</Form.Label>
                <Form.Control
                  name="hotline"
                  value={form.hotline}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            {/* Cột phải */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Footer</Form.Label>
                <DescriptionEditor value={form.footer} onChange={handleFooterChange} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Tạo mới
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateStoreInfoModal;
