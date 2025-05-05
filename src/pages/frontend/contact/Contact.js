import React, { useState } from "react";
import contactService from "../../functionservice/contactService";

const ContactList = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedServices = checked
        ? [...prevData.interestedServices, value]
        : prevData.interestedServices.filter((service) => service !== value);

      return {
        ...prevData,
        interestedServices: updatedServices,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(""); // Clear previous status message

    // Basic validation
    if (!formData.name || !formData.phoneNumber) {
      setStatusMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      await contactService.createContact(formData);
      setStatusMessage("Thông tin đã được gửi thành công!");
      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        message: "",
      }); // Clear form
    } catch (error) {
      setStatusMessage("Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Liên hệ với chúng tôi</h2>
      <div className="row">
        <div className="col-md-7py-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Họ và tên (*)</label>
              <input
                type="text"
                className="form-control form-control-lg w-100"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Số điện thoại (*)</label>
              <input
                type="tel"
                className="form-control form-control-lg w-100"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control form-control-lg w-100"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">Địa chỉ</label>
              <input
                type="text"
                className="form-control form-control-lg w-100"
                id="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Nội dung</label>
              <textarea
                className="form-control form-control-lg w-100"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nhập nội dung liên hệ"
              ></textarea>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Gửi thông tin</button>
            </div>
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

export default ContactList;
