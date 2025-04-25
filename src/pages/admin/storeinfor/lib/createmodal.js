// components/admin/storeinfo/CreateStoreInfoModal.js
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import storeinforService from "../../../functionservice/storeinforService";

const CreateStoreInfoModal = ({ show, onClose, onCreate }) => {
  const [form, setForm] = useState({
    logo: "",
    favicon: "",
    facebook: "",
    youtube: "",
    googleMap: "",
    hotline: "",
    zalo: "",
    workingHours: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const createdStore = await storeinforService.createStoreinfo(form);
      if (onCreate) onCreate(createdStore);
      onClose();
      setForm({
        logo: "",
        favicon: "",
        facebook: "",
        youtube: "",
        googleMap: "",
        hotline: "",
        zalo: "",
        workingHours: "",
      });
    } catch (error) {
      console.error("Lỗi khi tạo cửa hàng:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Thêm Thông tin Cửa hàng</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Logo</Form.Label>
                <Form.Control
                  type="url"
                  name="logo"
                  value={form.logo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Favicon</Form.Label>
                <Form.Control
                  type="url"
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
              <Form.Group className="mb-3">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  type="url"
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Youtube</Form.Label>
                <Form.Control
                  type="url"
                  name="youtube"
                  value={form.youtube}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Google Map</Form.Label>
                <Form.Control
                  type="url"
                  name="googleMap"
                  value={form.googleMap}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Zalo</Form.Label>
                <Form.Control
                  type="url"
                  name="zalo"
                  value={form.zalo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giờ làm việc</Form.Label>
                <Form.Control
                  name="workingHours"
                  value={form.workingHours}
                  onChange={handleChange}
                />
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
