import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalFooterForm = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    newsletterDescription: "",
    address: "",
    email: "",
    phone: "",
    workingHours: "",
    dayOff: "",
    map: "",
    facebook: "",
    youtube: "",
    zalo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        logo: logoURL,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới Footer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label>Logo</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.logo && (
              <img
                src={formData.logo}
                alt="Logo Preview"
                className="mt-2"
                style={{ width: "120px", height: "auto", objectFit: "contain" }}
              />
            )}
          </Form.Group>
          

          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề đăng ký nhận tin</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Ví dụ: Đăng ký nhận tin"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="newsletterDescription"
              placeholder="Nhận thông tin mới nhất về dịch vụ, ưu đãi & sự kiện từ chúng tôi."
              value={formData.newsletterDescription}
              onChange={handleChange}
            />
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="123 Y Wuong, EaTam, TP BMT, Đắk Lắk"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="hotline@annghia.vn"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              placeholder="0826 204 747"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Giờ làm việc</Form.Label>
            <Form.Control
              type="text"
              name="workingHours"
              placeholder="8h - 17h T2 đến T7"
              value={formData.workingHours}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày nghỉ</Form.Label>
            <Form.Control
              type="text"
              name="dayOff"
              placeholder="Chủ nhật & ngày lễ: Nghỉ"
              value={formData.dayOff}
              onChange={handleChange}
            />
          </Form.Group>

          <hr />

          <Form.Group className="mb-3">
            <Form.Label>Google Map (iframe URL hoặc link)</Form.Label>
            <Form.Control
              type="text"
              name="map"
              placeholder="https://www.google.com/maps/embed?..."
              value={formData.map}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link Facebook</Form.Label>
            <Form.Control
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link YouTube</Form.Label>
            <Form.Control
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link Zalo</Form.Label>
            <Form.Control
              type="url"
              name="zalo"
              value={formData.zalo}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Lưu
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalFooterForm;
