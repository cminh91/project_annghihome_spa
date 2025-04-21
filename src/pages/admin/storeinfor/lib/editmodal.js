import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor"; // nếu có dùng
const EditStoreModal = ({ show, onClose, store, onUpdate }) => {
  const [form, setForm] = useState(store || {});

  useEffect(() => {
    if (store) {
      setForm(store);
    }
  }, [store]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate({ ...form, updatedAt: new Date().toISOString() });
    onClose();
  };

  if (!form) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thông tin cửa hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên</Form.Label>
            <Form.Control name="name" value={form.name || ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Logo</Form.Label>
            <Form.Control name="logo" value={form.logo || ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Favicon</Form.Label>
            <Form.Control name="favicon" value={form.favicon || ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Hotline</Form.Label>
            <Form.Control name="hotline" value={form.hotline || ""} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Footer</Form.Label>
            <Form.Control name="footer" value={form.footer || ""} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
        <Button variant="primary" onClick={handleUpdate}>Cập nhật</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditStoreModal;
