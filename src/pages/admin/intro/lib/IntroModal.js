import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor"; 
import aboutService from "../../../functionservice/aboutService";

const IntroModal = ({ show, handleClose, handleSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [history, setHistory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const newAbout = {
      title,
      content,
      mission,
      vision,
      history,
    };

    try {
      // Call the createAbout service to save the data
      await aboutService.createAbout(newAbout);
      handleSave(newAbout); // Optional: If you want to update the parent component's state
      handleClose(); // Close the modal
      // Reset form
      setTitle("");
      setContent("");
      setMission("");
      setVision("");
      setHistory("");
    } catch (err) {
      setError("Failed to save data. Please try again.");
      console.error("Error saving About:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm bài viết giới thiệu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề bài viết</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Nhập tiêu đề bài viết..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nội dung bài viết</Form.Label>
            <DescriptionEditor
              value={content}
              onChange={(content) => setContent(content)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sứ mệnh</Form.Label>
            <DescriptionEditor
              value={mission}
              onChange={(mission) => setMission(mission)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tầm nhìn</Form.Label>
            <DescriptionEditor
              value={vision}
              onChange={(vision) => setVision(vision)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lịch sử</Form.Label>
            <DescriptionEditor
              value={history}
              onChange={(history) => setHistory(history)}
            />
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Đang lưu..." : "Lưu bài viết"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IntroModal;