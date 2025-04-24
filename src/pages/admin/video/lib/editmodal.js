import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditVideoModal = ({ show, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    id: "",
    tieuDe: "",
    linkYtb: "",
  });

  // Khi modal mở, cập nhật form với dữ liệu ban đầu
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        tieuDe: initialData.tieuDe,
        linkYtb: initialData.linkYtb,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tieuDe || !formData.linkYtb) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Save and close modal
    onSave(formData);
    onClose();
    setFormData({  id: "",tieuDe: "", linkYtb: "" });  // Reset form data after saving
  };

  const handleClose = () => {
    onClose();
    setFormData({ id: "", tieuDe: "", linkYtb: "" });  // Reset form data when closing
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formData.id} />
          <Form.Group className="mb-3">
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
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditVideoModal;
