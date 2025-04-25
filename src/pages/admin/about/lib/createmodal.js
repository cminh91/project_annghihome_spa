import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const CreateAboutModal = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    mission: "",
    vision: "",
    history: "",
  });

  useEffect(() => {
    if (show) {
      // Reset khi mở modal
      setFormData({
        mission: "",
        vision: "",
        history: "",
      });
    }
  }, [show]);

  // Xử lý thay đổi cho các trường sử dụng DescriptionEditor
  const handleEditorChange = (name, content) => {
    setFormData((prev) => ({
      ...prev,
      [name]: content,
    }));
  };

  const handleSubmit = () => {
    const newItem = {
      ...formData,
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
            <Col md={12}>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="mission" className="mb-3">
                <Form.Label>Sứ mệnh</Form.Label>
                <DescriptionEditor
                  value={formData.mission}
                  onChange={(content) => handleEditorChange("mission", content)}
                  placeholder="Nhập sứ mệnh"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="vision" className="mb-3">
                <Form.Label>Tầm nhìn</Form.Label>
                <DescriptionEditor
                  value={formData.vision}
                  onChange={(content) => handleEditorChange("vision", content)}
                  placeholder="Nhập tầm nhìn"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group controlId="history" className="mb-3">
                <Form.Label>Lịch sử</Form.Label>
                <DescriptionEditor
                  value={formData.history}
                  onChange={(content) => handleEditorChange("history", content)}
                  placeholder="Nhập lịch sử phát triển"
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
