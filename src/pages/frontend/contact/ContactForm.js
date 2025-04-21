import React from "react";

const ContactForm = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Liên hệ với chúng tôi</h2>

      <div className="row">
        {/* Thông tin liên hệ */}
        <div className="col-md-5 mb-4">
          <h5>Thông tin liên hệ</h5>
          <p><strong>Địa chỉ:</strong> 82 Trần Huy Liệu, Phường 15, Quận Phú Nhuận, TP. Hồ Chí Minh</p>
          <p><strong>Email:</strong> info@momcare24h.vn</p>
          <p><strong>Hotline:</strong> 0911 223 678</p>
          <p><strong>Thời gian làm việc:</strong> 8:00 - 20:00 (T2 - CN)</p>

          <div className="mt-3">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1175522548287!2d106.67725911474906!3d10.800271061678835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d0b9e56f2d%3A0x1fc0d29d5c6d89f2!2zODIgVHLhuqduIEh1eSBMacOqdSwgUGjGsOG7nW5nIDE1LCBQaMO6IE5odXQsIFRow6BuaCBwaOG7kSBI4buNYywgSOG7kyBDaMOtbmggMTM3NjQz!5e0!3m2!1svi!2s!4v1614764330630!5m2!1svi!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="col-md-7">
          <form>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">Họ và tên</label>
              <input type="text" className="form-control" id="fullname" placeholder="Nhập họ và tên của bạn" />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Số điện thoại</label>
              <input type="tel" className="form-control" id="phone" placeholder="Nhập số điện thoại" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Nhập email" />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Nội dung</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Nhập nội dung liên hệ"></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Gửi thông tin</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
