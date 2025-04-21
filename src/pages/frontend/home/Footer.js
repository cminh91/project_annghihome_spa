import React from "react";

const Footer = () => {
  return (
    <footer>
      <div
        className="container-fluid text-white-50 footer pt-5 mt-5"
        style={{ backgroundColor: "#363636" }}>
        <div className="container py-5">
          <div className="row g-5">
            {/* Google Map */}
            <div className="col-lg-3 col-md-6">
              <div className="h-100 rounded overflow-hidden">
                <iframe
                  className="w-100 h-100"
                  style={{ minHeight: "250px", border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
              </div>
            </div>

            {/* Đăng ký nhận tin */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-white mb-3">Đăng ký nhận tin</h4>
                <p>
                  Nhận thông tin mới nhất về dịch vụ, ưu đãi & sự kiện từ chúng tôi.
                </p>
                <form className="position-relative">
                  <input
                    className="form-control bg-white text-black border-0 py-2 px-3 mb-2"
                    type="email"
                    placeholder="Nhập email của bạn"
                    required
                  />
                  <input
                    className="form-control bg-white text-black border-0 py-2 px-3 mb-2"
                    type="text"
                    placeholder="Nhập họ tên của bạn"
                    required
                  />
                  <button className="btn btn-primary w-100" type="submit">
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>

            {/* Liên hệ + Social */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-white mb-3">Liên Hệ</h4>
                <p className="mb-2">
                  <i className="fa fa-map-marker-alt me-2"></i>123 Y Wuong, EaTam, TP BMT, Đắk Lắk
                </p>
                <p className="mb-2">
                  <i className="fa fa-envelope me-2"></i>hotline@annghia.vn
                </p>
                <p className="mb-2">
                  <i className="fa fa-phone me-2"></i>0826 204 747
                </p>
                <p className="mb-3">
                  <i className="fa fa-clock me-2"></i>8h - 17h T2 đến T7
                </p>
              </div>
              <div className="d-flex pt-2">
                <a className="btn btn-outline-light me-2 btn-md-square rounded-circle" href="#st">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-light me-2 btn-md-square rounded-circle" href="#st">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-outline-light btn-md-square rounded-circle" href="#st">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            {/* Logo + Giờ làm việc */}
            <div className="col-lg-3 col-md-6">
              <div className="footer-item text-center">
                <img
                  src="logo.png"
                  alt="Logo"
                  style={{ maxWidth: "120px" }}
                  className="mb-3"
                />
                <h5 className="text-white mb-2">Giờ làm việc</h5>
                <p className="mb-1">Thứ 2 - Thứ 7: 8:00 - 17:00</p>
                <p>Chủ nhật & ngày lễ: Nghỉ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Nút nổi bên phải */}
      <div
        className="position-fixed d-flex flex-column align-items-center gap-2"
        style={{ bottom: "20px", right: "20px", zIndex: 1030 }}
      >
        <a href="#t" className="btn btn-primary rounded-circle shadow" title="Lên đầu">
          <i className="fas fa-arrow-up"></i>
        </a>
        <a href="tel:0123456789" className="btn btn-success rounded-circle shadow" title="Gọi ngay">
          <i className="fas fa-phone-alt"></i>
        </a>
        <a
          href="https://m.me/yourpage"
          className="btn btn-primary rounded-circle shadow"
          title="Messenger"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-messenger"></i>
        </a>
        <a
          href="https://zalo.me/yourzaloid"
          className="btn btn-info rounded-circle shadow p-0"
          title="Zalo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: "40px", height: "40px" }}
        >
          <img
            src="https://imgs.search.brave.com/1Rr1DxgEtlp2efPxOo3atZYBUk5_NzaoTtj2PAuDZyc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmFu/ZGxvZ29zLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8x/MS96YWxvLWxvZ28t/NTEyeDUxMi5wbmc"
            alt="Zalo"
            style={{ width: "40px" }}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
