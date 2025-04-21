import React, { useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";

const IntroModal = ({ show, handleClose, handleSave }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // danh mục bài viết
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const newIntro = {
      title,
      category,
      content,
      image,
    };
    handleSave(newIntro);
    handleClose();

    // Reset form
    setTitle("");
    setCategory("");
    setContent("");
    setImage(null);
    setPreview("");
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
            <Form.Label>Danh mục</Form.Label>
            <Form.Control
              type="text"
              value={category}
              placeholder="Ví dụ: Giới thiệu, Tầm nhìn, Sứ mệnh..."
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ảnh đại diện</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <Image
                src={preview}
                rounded
                className="mt-2"
                style={{ width: "150px", objectFit: "cover" }}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nội dung bài viết</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={content}
              placeholder="Nhập nội dung chi tiết..."
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu bài viết
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IntroModal;
