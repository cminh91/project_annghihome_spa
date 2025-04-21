import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Edit = ({ show, handleClose, handleUpdate, currentData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentData) {
      setFormData(currentData);
    }
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData); // Gửi dữ liệu chỉnh sửa
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa Footer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Logo</Form.Label>
            <Form.Control
              type="text"
              name="logo"
              value={formData.logo || ""}
              onChange={handleChange}
              placeholder="URL logo"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề đăng ký nhận tin</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Tiêu đề"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              name="newsletterDescription"
              rows={2}
              value={formData.newsletterDescription || ""}
              onChange={handleChange}
              placeholder="Nhập mô tả"
            />
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Địa chỉ"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Số điện thoại"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Giờ làm việc</Form.Label>
            <Form.Control
              type="text"
              name="workingHours"
              value={formData.workingHours || ""}
              onChange={handleChange}
              placeholder="Giờ làm việc"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ngày nghỉ</Form.Label>
            <Form.Control
              type="text"
              name="dayOff"
              value={formData.dayOff || ""}
              onChange={handleChange}
              placeholder="Ngày nghỉ"
            />
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label>Google Map</Form.Label>
            <Form.Control
              type="text"
              name="map"
              value={formData.map || ""}
              onChange={handleChange}
              placeholder="URL bản đồ"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link Facebook</Form.Label>
            <Form.Control
              type="url"
              name="facebook"
              value={formData.facebook || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link YouTube</Form.Label>
            <Form.Control
              type="url"
              name="youtube"
              value={formData.youtube || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link Zalo</Form.Label>
            <Form.Control
              type="url"
              name="zalo"
              value={formData.zalo || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              Lưu thay đổi
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Edit;
