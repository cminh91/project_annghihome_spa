import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import videoService from "../../../functionservice/videoService";

const CreateVideoModal = ({ show, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    tieuDe: "",
    linkYtb: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tieuDe || !formData.linkYtb) {
      alert("Vui lòng điền đầy đủ tiêu đề và link YouTube.");
      return;
    }

    try {
      const newVideo = await videoService.createVideo(formData);
      onSave(newVideo);
      onClose();
      setFormData({
        tieuDe: "",
        linkYtb: "",
      });
    } catch (error) {
      alert("Lỗi khi lưu video.");
      console.error("Error saving video:", error);
    }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure both fields are filled
    if (!formData.tieuDe || !formData.linkYtb) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    onSave(formData);  // Save the new video
    onClose();  // Close the modal
    setFormData({ tieuDe: "", linkYtb: "" });  // Clear form
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Video mới</Modal.Title>
        <Modal.Title>Thêm Video Mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Label>Tiêu Đề</Form.Label>
            <Form.Control
              type="text"
              name="tieuDe"
              value={formData.tieuDe}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link YouTube</Form.Label>
            <Form.Control
              type="text"
              name="linkYtb"
              value={formData.linkYtb}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Lưu video
            Lưu Video
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
};

export default CreateVideoModal;
