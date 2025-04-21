import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Edit = ({ show, handleClose, data, handleSave }) => {
  const [formData, setFormData] = useState(data || {
    logo: "",
    contact: "",
    email: "",
    address: "",
    hotline: "",
    slogan: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSave = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa Header</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formLogo" className="mb-3">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="file" name="logo" onChange={handleChange} />
            {formData.logo && typeof formData.logo === "string" && (
              <img src={formData.logo} alt="logo" height={50} className="mt-2" />
            )}
          </Form.Group>
          <Form.Group controlId="formContact" className="mb-3">
            <Form.Label>Liên hệ</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formHotline" className="mb-3">
            <Form.Label>Hotline</Form.Label>
            <Form.Control
              type="text"
              name="hotline"
              value={formData.hotline}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSlogan" className="mb-3">
            <Form.Label>Slogan</Form.Label>
            <Form.Control
              type="text"
              name="slogan"
              value={formData.slogan}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onSave}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Edit;
