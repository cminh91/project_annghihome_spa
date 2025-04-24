import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import bannerService from "../../../functionservice/BannerService";  // Ensure correct path for bannerService

const EditSliderModal = ({ show, onClose, onSave, sliderData }) => {
  const [shortTitle, setShortTitle] = useState("");
  const [longTitle, setLongTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [order, setOrder] = useState(0);

  useEffect(() => {
    if (sliderData) {
      setShortTitle(sliderData.shortTitle || "");
      setLongTitle(sliderData.longTitle || "");
      setImageUrl(sliderData.imageUrl || "");
      setLink(sliderData.link || "");
      setOrder(sliderData.order || 0);
    }
  }, [sliderData]);

  const handleSubmit = async () => {
    const updatedSlider = {
      shortTitle,
      longTitle,
      imageUrl,
      link,
      order: Number(order),
    };
    try {
      const response = await bannerService.editBanner(sliderData.id, updatedSlider);
      onSave(response); 
      onClose();
    } catch (error) {
      alert("Không thể chỉnh sửa slider. Vui lòng kiểm tra lại.");
      console.error("Failed to update slider:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh Sửa Slider</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề slider"
                value={shortTitle}
                onChange={(e) => setShortTitle(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Phụ đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập phụ đề slider"
                value={longTitle}

                onChange={(e) => setLongTitle(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>URL Ảnh</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập URL ảnh slider"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập link dẫn đến slider"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Thứ tự</Form.Label>
              <Form.Control
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu Thay Đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditSliderModal;
