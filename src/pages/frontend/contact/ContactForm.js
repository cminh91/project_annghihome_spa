import React, { useState,useEffect } from "react";
import contactService from "../../functionservice/contactService";
import storeinforService from "../../functionservice/storeinforService";
import storeService from "../../functionservice/storeService";


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
    const [storeInfo, setStoreInfos] = useState([]);
      const [address, setAddress] = useState([]);
    
      const [loading, setLoading] = useState(false);
      const [showButtons, setShowButtons] = useState(false);
    
  

  const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await storeService.getAlladdresses();
        setAddress(Array.isArray(response) ? response : [response]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchStoreInfos = async () => {
      setLoading(true);
      try {
        const data = await storeinforService.getAllStoreinfo();
        setStoreInfos(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreInfos();
  }, []);

  const store = storeInfo[0] || {};
  const addr = address[0] || {};


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
          <h5 className="text-center">Thông tin liên hệ</h5>
          <p><strong>Địa chỉ:</strong>{addr.street} </p>
          <p><strong>Tên Của Hàng:</strong> {addr.fullName}</p>
          <p><strong>Hotline:</strong> {store.hotline}</p>
          <p><strong>Thời gian làm việc:</strong> {store.workingHours}</p>
          <div className="mt-3">
          <iframe
            title="map"
            src={store.googleMap}
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          </div>
        </div>

        <div className="col-md-7 align-items-center">
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

            <div className="text-center">
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

export default ContactForm;