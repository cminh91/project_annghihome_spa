import React, { useState } from "react";
import contactService from "../../functionservice/contactService";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(""); // Clear previous status message

    // Basic validation
    if (!formData.name || !formData.phoneNumber || !formData.email || !formData.message) {
      setStatusMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      await contactService.createContact(formData);
      setStatusMessage("Thông tin đã được gửi thành công!");
      setFormData({ name: "", phoneNumber: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setStatusMessage("Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Liên hệ với chúng tôi</h2>
      <div className="row">
        <div className="col-md-5 mb-4">
          <h5>Thông tin liên hệ</h5>
          <p><strong>Địa chỉ:</strong> 10B Phan Đình Phùng P Thành Nhất, Buon Ma Thuot, Vietnam</p>
          <p><strong>Email:</strong> hoanghanggldl@gmail.com</p>
          <p><strong>Hotline:</strong> 082 620 4747</p>
          <p><strong>Thời gian làm việc:</strong> 8:00 - 20:00 (T2 - CN)</p>
          <div className="mt-3">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.778222884797!2d108.0598662!3d12.6904525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQxJzI2LjMiTiAxMDjCsDAzJzM1LjMiRQ!5e0!3m2!1svi!2s!4v1714030501234!5m2!1svi!2s"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          </div>
        </div>

        <div className="col-md-7">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Nội dung</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nhập nội dung liên hệ"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Gửi thông tin</button>
          </form>
          {statusMessage && (
            <div className={`alert mt-3 ${statusMessage.includes("thành công") ? "alert-success" : "alert-danger"}`} role="alert">
              {statusMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;