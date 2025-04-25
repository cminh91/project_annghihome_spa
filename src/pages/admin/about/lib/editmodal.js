import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";

const EditAboutModal = ({ show, onClose, onSave, aboutData }) => {
  const [formData, setFormData] = useState({
    mission: "",
    vision: "",
    history: "",
  });

  useEffect(() => {
    if (aboutData) {
      setFormData({
        mission: aboutData.mission || "",
        vision: aboutData.vision || "",
        history: aboutData.history || "",
      });
    }
  }, [aboutData]);

  const handleEditorChange = (name, content) => {
    setFormData((prev) => ({
      ...prev,
      [name]: content,
    }));
  };


  const handleSubmit = () => {
    const updatedItem = {
      ...formData,
      updatedAt: new Date().toISOString(),
      id: aboutData?.id, // giữ lại ID khi cập nhật
    };
    onSave(updatedItem);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa mục Giới thiệu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group controlId="mission" className="mb-3">
                <Form.Label>Sứ mệnh</Form.Label>
                <DescriptionEditor
                  value={formData.mission}
                  onChange={(content) => handleEditorChange("mission", content)}
                  placeholder="Nhập sứ mệnh"
                />
              </Form.Group>
              <Form.Group controlId="vision" className="mb-3">
                <Form.Label>Tầm nhìn</Form.Label>
                <DescriptionEditor
                  value={formData.vision}
                  onChange={(content) => handleEditorChange("vision", content)}
                  placeholder="Nhập tầm nhìn"
                />
              </Form.Group>
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
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAboutModal;
