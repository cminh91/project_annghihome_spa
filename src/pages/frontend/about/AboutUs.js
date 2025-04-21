import React from "react";

const AboutUs = () => {
  return (
    <div className="container py-5">
      {/* Tầm Nhìn & Sứ Mệnh */}
      <div className="row mb-5">
        <div className="col-md-6">
          <h2 className="mb-3">Tầm Nhìn</h2>
          <p>
            Trở thành biểu tượng niềm tin số 1 Việt Nam về dịch vụ chăm sóc cho Mẹ và Bé trước và sau sinh tại nhà.
          </p>
        </div>
        <div className="col-md-6">
          <h2 className="mb-3">Sứ Mệnh</h2>
          <p>
            Cam kết mang đến cho cộng đồng dịch vụ Y tế chăm sóc Mẹ & Bé trước và sau sinh tại nhà an toàn nhất,
            hiệu quả nhất và chuyên nghiệp nhất bằng chính sự trân trọng, đồng cảm và trách nhiệm cao của chúng tôi
            đối với cuộc sống con người và xã hội.
          </p>
        </div>
      </div>

      {/* Giá Trị Cốt Lõi */}
      <div className="text-center mb-5">
        <h2 className="mb-3">Giá Trị Cốt Lõi</h2>
        <p className="w-75 mx-auto">
          Trình độ chuyên môn và Y đức của Đội ngũ Bác Sĩ và Điều dưỡng – Sự tận tâm đối với Khách hàng – Đạo đức
          trong kinh doanh.
        </p>
      </div>

      {/* Đội Ngũ */}
      <div className="mb-5">
        <h2 className="text-center mb-4">Đội Ngũ Bác Sĩ</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Bác sĩ 1"
              className="rounded-circle mb-2"
              width="120"
              height="120"
            />
            <h5>ThS. BS. CKII. Lê Thanh Hùng</h5>
            <small>Bệnh viện Quốc tế Mỹ AIH (Phó khoa Phụ Sản)</small>
          </div>
          <div className="col-md-4 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Bác sĩ 2"
              className="rounded-circle mb-2"
              width="120"
              height="120"
            />
            <h5>ThS. Trần Thị Sáng</h5>
            <small>Bệnh viện Từ Dũ, Bệnh viện FV</small>
          </div>
          <div className="col-md-4 mb-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Bác sĩ 3"
              className="rounded-circle mb-2"
              width="120"
              height="120"
            />
            <h5>BS. CKI. Huỳnh Khắc Luân</h5>
            <small>Bệnh viện Nhi Đồng 2</small>
          </div>
        </div>
      </div>

      {/* Vì Sao Chọn Chúng Tôi */}
      <div>
        <h2 className="text-center mb-4">Vì Sao Chọn Chúng Tôi?</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>An Tâm</h5>
            <p>
              Dịch vụ chăm sóc Y tế tại nhà uy tín hàng đầu hiện nay và được Sở Y Tế TP.HCM cấp giấy phép hoạt động.
            </p>
          </div>
          <div className="col-md-6 mb-3">
            <h5>An Toàn - Hiệu Quả</h5>
            <p>
              Đội ngũ Bác sĩ uy tín ở các lĩnh vực Sản – Nhi – Chăm sóc sau sinh phụ trách xây dựng liệu trình chăm
              sóc khoa học toàn diện.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
