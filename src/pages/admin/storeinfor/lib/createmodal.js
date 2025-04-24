import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import storeinfnorService from "../../../functionservice/storeinforService"; // Đảm bảo đường dẫn đúng

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
      // Gọi API để tạo cửa hàng mới
      const createdStore = await storeinfnorService.createStoreinfo({
        ...form,
        id: Date.now().toString(), // Tạo ID giả
      });
      
      // Nếu có callback `onCreate` từ component cha, gọi nó để cập nhật danh sách
      if (onCreate) {
        onCreate(createdStore); // Cập nhật cửa hàng mới
      }
      onClose(); // Đóng modal sau khi tạo thành công
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
            {/* Cột trái */}
            <Col md={6}>
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
              <Form.Group className="mb-3">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Youtube</Form.Label>
                <Form.Control
                  name="youtube"
                  value={form.youtube}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Google Map</Form.Label>
                <Form.Control
                  name="googleMap"
                  value={form.googleMap}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            {/* Cột phải */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Zalo</Form.Label>
                <Form.Control
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
