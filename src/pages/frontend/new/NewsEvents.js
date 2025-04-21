import React from "react";

const NewsEvents = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Tin tức & Sự kiện</h2>
      <div className="row">

        {/* Bài viết 1 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <img
              src="https://www.momcare24h.vn/uploads/images/tintuc/Tiem-chung-sau-sinh-o-dau-1.jpg"
              className="card-img-top"
              alt="Tiêm chủng sau sinh"
            />
            <div className="card-body">
              <h5 className="card-title">Tiêm chủng sau sinh ở đâu?</h5>
              <p className="card-text">
                Gợi ý địa chỉ tiêm chủng uy tín, an toàn dành cho mẹ và bé sau sinh.
              </p>
              <a href="#" className="btn btn-primary">
                Xem thêm
              </a>
            </div>
          </div>
        </div>

        {/* Bài viết 2 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <img
              src="https://www.momcare24h.vn/uploads/images/tintuc/san-pham-momcare24h.jpg"
              className="card-img-top"
              alt="Sản phẩm mới"
            />
            <div className="card-body">
              <h5 className="card-title">Ra mắt sản phẩm MomCare</h5>
              <p className="card-text">
                MomCare24h chính thức ra mắt dòng sản phẩm hỗ trợ sức khỏe mẹ sau sinh.
              </p>
              <a href="#" className="btn btn-primary">
                Tìm hiểu
              </a>
            </div>
          </div>
        </div>

        {/* Bài viết 3 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <img
              src="https://www.momcare24h.vn/uploads/images/tintuc/skk.jpg"
              className="card-img-top"
              alt="Hội thảo chăm sóc sau sinh"
            />
            <div className="card-body">
              <h5 className="card-title">Hội thảo chăm sóc sau sinh</h5>
              <p className="card-text">
                Tham gia hội thảo cùng các bác sĩ hàng đầu về chăm sóc sức khỏe sau sinh.
              </p>
              <a href="#" className="btn btn-primary">
                Đăng ký ngay
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsEvents;
