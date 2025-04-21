import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import bannerService from "../../../functionservice/BannerService";  // Ensure correct path for bannerService

const EditSliderModal = ({ show, onClose, onSave, sliderData }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [url, setUrl] = useState("");
  const [link, setLink] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);
  const [buttonText, setButtonText] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (sliderData) {
      setTitle(sliderData.title || "");
      setSubtitle(sliderData.subtitle || "");
      setUrl(sliderData.url || "");
      setLink(sliderData.link || "");
      setIsActive(sliderData.isActive ?? true);
      setOrder(sliderData.order || 0);
      setButtonText(sliderData.buttonText || "");
      setMobileUrl(sliderData.mobileUrl || "");
      setDescription(sliderData.description || "");
    }
  }, [sliderData]);

  const handleSubmit = async () => {
    if (!title || !url) {
      alert("Tiêu đề và URL là bắt buộc.");
      return;
    }

    if (url && !mobileUrl) {
      alert("Cần nhập URL cho ảnh di động.");
      return;
    }

    const updatedSlider = {
      title,
      subtitle,
      url,
      link,
      isActive,
      order: Number(order),
      buttonText,
      mobileUrl,
      description,
    };

    try {
      const response = await bannerService.editBanner(sliderData.id, updatedSlider);
      onSave(response);  // Return the updated slider to the parent component
      onClose();  // Close the modal after saving
    } catch (error) {
      alert("Không thể chỉnh sửa slider. Vui lòng kiểm tra lại.");
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Phụ đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập phụ đề slider"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>URL Ảnh</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập URL ảnh slider"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
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
            <Col md={6}>
              <Form.Label>Văn bản nút</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập văn bản cho nút"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>URL Ảnh Di động</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập URL ảnh cho di động"
                value={mobileUrl}
                onChange={(e) => setMobileUrl(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả"
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === 'true')}
              >
                <option value={true}>Hiển thị</option>
                <option value={false}>Ẩn</option>
              </Form.Select>
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
