import React,{ useState, useEffect } from "react";
import bannerService from "../../functionservice/BannerService";
import AllService from "../service/AllServices";
import { Spinner } from "react-bootstrap";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const data = await bannerService.getAllBanners();
        setBanners(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Không thể tải banners. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);
  
  useEffect(() => {
    if (banners.length === 0) return;
  
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 2000); // Adjusting to 2 seconds
  
    return () => clearTimeout(timer);
  }, [currentSlide, banners.length]);
  return (
    <div>
      {/* Hero Start */}
      <div className="container-fluid hero-header banner-container mt-5">
        <div className="container p-0">
          <div className="row g-0 align-items-center justify-content-center">
            <div className="col-12">
              <div
                id="carouselId"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : error ? (
                  <div className="alert alert-danger text-center">{error}</div>
                ) : banners.length === 0 ? (
                  <div className="alert alert-warning text-center">
                    Không có banner nào để hiển thị.
                  </div>
                ) : (
                  <div className="carousel-inner" type="button">
                    {banners.map((banner, index) => (
                      <div
                        key={banner.id}
                        className={`carousel-item ${index === currentSlide ? "active" : ""}`}
                      >
                        <div className="position-relative">
                          <div
                            className="position-relative"
                            onClick={() => window.location.href = banner.link}
                            style={{ cursor: 'pointer' }}
                          >                            
                            <img
                              src={banner.imageUrl}
                              className="d-block w-100 img-fluid rounded"
                              style={{ height: "500px", objectFit: "cover" }}
                              alt={banner.shortTitle || `Banner ${index + 1}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero End */}

      {/* Dịch vụ Shop Start */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <AllService/>
          </div>
        </div>
      </div>
      {/* Dịch Shop End */}

      {/* lời mở dầu */}
      <div className="container-fluid py-5" style={{ backgroundColor: "skyblue" }}>
        <div className="container py-5">
            <div className="row g-4 justify-content-center">
            <div className="col-lg-4 text-center">
                <h1 className="fw-bold" style={{ whiteSpace: "nowrap", fontSize: "36px", color: "#0000FF" }}>
                Lời mở đầu
                </h1>
                <div className="d-flex align-items-center mt-3 justify-content-center">
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                <img src="logo.png" alt="Logo" className="mx-3" style={{ width: "40px", height: "40px" }} />
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                </div>
            </div>
            </div>

            <div className="row g-4 mt-4">
            <div className="col-lg-6 p-4 rounded">
                <div className="text-center">
                <p className="text-white fs-5">
                    <strong>AN NGHI HOME</strong> là dịch vụ chăm sóc Tế tại nhà uy tín hàng đầu hiện nay dành cho Sản phụ và Bé sơ sinh;
                    và được Sở Y TẾ TP.HCM cấp giấy phép hoạt động Chăm sóc sau sinh theo tiêu chuẩn của Bộ Y TẾ.
                </p>
                <p className="text-white">
                    Với đội ngũ Bác sĩ uy tín ở <strong>cả 3 lĩnh vực Sản Khoa – Nhi Khoa – Chăm sóc Tiền/Hậu Sản</strong> phụ trách chuyên môn,
                    xây dựng giải pháp và liệu trình chăm sóc khoa học, trực tiếp đào tạo chuyên sâu cho đội ngũ Điều Dưỡng và giám sát quy trình chăm sóc mẹ em bé,
                    <strong> Momcare24h</strong> cam kết mang đến Dịch vụ chăm sóc sau sinh khoa học và chất lượng cao nhất cho cả Mẹ và Bé ngay khi xuất viện về nhà.
                </p>
                <div className="mt-4">
                    <a href="#st" className="btn btn-light rounded-pill px-4 text-dark">XEM THÊM</a>
                </div>
                </div>
            </div>

            <div className="col-lg-6">
                <img
                src="https://imgs.search.brave.com/CF1ODj2GJyQL3eFByaxMxNPXTHZTGzwgmc4jb9HMgFY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RjLzNi/LzVjL2RjM2I1YzM3/MzRmZDViMTY3ZGQy/ODAxOTEzNzU4OWNl/LmpwZw"
                alt="Chăm sóc mẹ bầu"
                className="img-fluid rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
                />
            </div>
            </div>
        </div>
      </div>

      {/* đôi ngũ */}
      <div className="container-fluid fruite py-5 btn-light">
        <div className="container py-5">
            <div className="tab-class text-center">
            <div className="row g-4 justify-content-center">
                <div className="col-lg-4">
                <h1
                    className="fw-bold"
                    style={{ whiteSpace: "nowrap", fontSize: "36px", color: "#0000FF" }}
                >
                    Đội ngũ Bác sĩ
                </h1>
                <div className="d-flex align-items-center mt-3 justify-content-center">
                    <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                    <img
                    src="logo.png"
                    alt="Logo"
                    className="mx-3"
                    style={{ width: "40px", height: "40px" }}
                    />
                    <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                </div>
                </div>

                <p className="text-dark mt-3 text-start">
                An Nghi HOME có Đội ngũ Bác sĩ uy tín hàng đầu hiện nay ở cả 3 lĩnh vực Sản Khoa – Nhi Khoa – Chăm sóc Tiền / Hậu Sản.
                Đội ngũ Bác sĩ tại An Nghi HOME có rất nhiều năm kinh nghiệm về chuyên môn và đảm trách nhiệm vụ, vị trí công tác quan trọng
                ở các Bệnh viện hàng đầu Việt Nam như: Bệnh viện Quốc tế Mỹ AIH, Bệnh viện Từ Dũ, Bệnh viện FV, Bệnh viện Nhi Đồng 2, CMI Việt Nam.
                </p>
            </div>

            <div className="row g-4 mt-4 justify-content-center tab-pane fade show p-0 active">
                {[ // Danh sách bác sĩ
                {
                    name: "ThS. BS. CKII. Lê Thanh Hùng",
                    hospital: "Bệnh viện Quốc tế Mỹ AIH\nGiảng viên Đại học Y Khoa",
                    img: "https://imgs.search.brave.com/XbL-3u3ZyLxQYPLO0fh1fi7Ke4TO6GDQy_MAPdY1ZyM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90YW1h/bmhob3NwaXRhbC52/bi93cC1jb250ZW50/L3VwbG9hZHMvMjAx/My8xMS9raG9hLXNh/bi1sZS10aGFuaC1o/dW5nLnBuZw"
                },
                {
                    name: "ThS. Trần Thị Sáng",
                    hospital: "Bệnh viện Từ Dũ\nBệnh viện FV\nCMI Việt Nam",
                    img: "https://imgs.search.brave.com/R-bMYVGYnSHtkqG1QhoOXt079eUZCSz_1Jmb-4zKhe0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90YW1h/bmhob3NwaXRhbC52/bi93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8xMi90cmFuLXBo/dW9uZy12eS5wbmc"
                },
                {
                    name: "BS. CKI. Huỳnh Khắc Luân",
                    hospital: "Bệnh viện Nhi Đồng 2",
                    img: "https://imgs.search.brave.com/ifFuP4aBFwXayJsDcCEdiwbJe8KaEUZ5HXaiMyPNVmQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iZW5o/dmllbm1hdHBodXll/bi52bi9fbmV4dC9p/bWFnZT91cmw9aHR0/cDovL3Jlcy5jbG91/ZGluYXJ5LmNvbS9k/endjeGtlbmEvaW1h/Z2UvdXBsb2FkL3Yx/NzM1ODk0MTQ2L2J2/bS9kcXJldmZqOThy/ZmQydDc1ZHRiZy5w/bmcmdz0zODQwJnE9/NzU"
                }
                ].map((doctor, index) => (
                <div key={index} className="col-md-4 col-lg-3 text-center">
                    <div className="overflow-hidden rounded">
                    <img
                        src={doctor.img}
                        alt={doctor.name}
                        className="img-fluid rounded transition"
                        style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease-in-out"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    />
                    </div>
                    <h5 className="fw-bold mt-2">{doctor.name}</h5>
                    <p className="text-muted" style={{ whiteSpace: "pre-line" }}>{doctor.hospital}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
      </div>

      {/* vì sao chọn an nghi home */}
      <div className="container-fluid py-5" style={{ backgroundColor: "skyblue" }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 text-center">
              <h1
                className="fw-bold"
                style={{ whiteSpace: "nowrap", fontSize: "30px", color: "blue" }}
              >
                Vì sao nên chọn An Nghi?
              </h1>
              <div className="d-flex align-items-center mt-3 justify-content-center">
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                <img
                  src="logo.png"
                  alt="Logo"
                  className="mx-3"
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
              </div>
            </div>
          </div>

          <div className="bg-light p-5 rounded mt-4" style={{ color: "black" }}>
            <div className="row g-4 justify-content-center">
              {[
                {
                  title: "AN TÂM",
                  desc: "Dịch vụ chăm sóc Y tế tại nhà được cấp phép bởi Sở Y Tế TP.HCM, tiêu chuẩn Bộ Y TẾ.",
                },
                {
                  title: "AN TOÀN",
                  desc: "Trang thiết bị hiện đại, quy trình kiểm soát nghiêm ngặt đảm bảo an toàn cho mẹ và bé.",
                },
                {
                  title: "CHUYÊN NGHIỆP",
                  desc: "Đội ngũ chuyên môn cao, giàu kinh nghiệm từ các bệnh viện lớn như Từ Dũ, AIH, FV,...",
                },
                {
                  title: "TẬN TÂM",
                  desc: "Luôn đồng hành, lắng nghe và thấu hiểu nhu cầu mẹ và bé trong từng giai đoạn chăm sóc.",
                },
                {
                  title: "TÍN CẬY",
                  desc: "Được khách hàng tin tưởng và đánh giá cao với hàng ngàn ca chăm sóc thành công mỗi năm.",
                },
              ].map((item, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-3 col-xl-2 text-center">
                  <div className="counter bg-white rounded p-4 h-100">
                    <img
                      src="https://www.momcare24h.vn/assets/front/images/infos/tai-sao-chon-momcare24h-1.png"
                      alt={`Icon ${item.title}`}
                      className="mb-3"
                    />
                    <h5 className="fw-bold">{item.title}</h5>
                    <p className="text-dark">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* cảm nhận khách hàng */}
      <div className="container-fluid py-5" style={{ backgroundColor: "whitesmoke" }}>
        <div className="container py-5">
            {/* Tiêu đề */}
            <div className="row g-4 justify-content-center">
            <div className="col-lg-6 col-md-8 text-center">
                <h1 className="fw-bold" style={{ fontSize: "36px", color: "#0000FF" }}>
                Cảm nhận khách hàng
                </h1>
                <div className="d-flex align-items-center mt-3 justify-content-center">
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                <img src="logo.png" alt="Logo" className="mx-3" style={{ width: "40px", height: "40px" }} />
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                </div>
            </div>
            </div>

            {/* Cảm nhận khách hàng */}
            <div className="row g-4 mt-5">
            <div className="col-lg-12">
                <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <div className="row g-4 justify-content-center">
                        {[
                        {
                            name: "MC Huỳnh Ngân",
                            role: "MC",
                            content:
                            "An Nghi HOME là dịch vụ chăm sóc Y tế tại nhà uy tín và chuyên nghiệp, được Sở Y Tế TP.HCM cấp phép hoạt động theo tiêu chuẩn của Bộ Y TẾ.",
                        },
                        {
                            name: "Sang Lê",
                            role: "Người đẹp HHVN 2015",
                            content:
                            "Dịch vụ tại An Nghi HOME giúp tôi phục hồi nhanh chóng và an tâm sau sinh. Đội ngũ tận tâm và chuyên nghiệp.",
                        },
                        {
                            name: "Ngân Hà",
                            role: "Hoa hậu Biển",
                            content:
                            "Tôi lựa chọn An Nghi HOME vì sự tin cậy và an toàn tuyệt đối trong từng liệu trình chăm sóc sau sinh.",
                        },
                        ].map((user, index) => (
                        <div className="col-md-4 text-center" key={index}>
                            <img
                            src="https://imgs.search.brave.com/dsnmafsGZlnJTVezbrzaWkzDWZKOhJtY04ISuCWBIP8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9teXNw/YS52bi9hc3NldHMv/ZnJvbnRlbmQvaW1h/Z2VzL3RydXN0ZWQt/YnktYmJiZWF1dGUu/anBn"
                            className="rounded-circle mb-3"
                            style={{ width: "150px", height: "150px" }}
                            alt={user.name}
                            />
                            <h5 className="fw-bold mb-1">{user.name}</h5>
                            <p className="text-muted mb-2">{user.role}</p>
                            <p className="text-dark">{user.content}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Slider Video */}
            <div className="row mt-5">
            <div className="col-lg-12">
                <div id="videoCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {/* Slide 1 */}
                    <div className="carousel-item active">
                    <div className="row g-4 justify-content-center">
                        {["Video 1", "Video 2", "Video 3"].map((title, idx) => (
                        <div className="col-md-4" key={idx}>
                            <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                                title={title}
                                allowFullScreen
                            ></iframe>
                            </div>
                            <p className="text-center mt-2">
                            {title === "Video 1"
                                ? "MC Huỳnh Ngân chia sẻ về dịch vụ"
                                : title === "Video 2"
                                ? "Sang Lê chia sẻ trải nghiệm"
                                : "Hoa hậu Ngân Hà nói về An Nghi"}
                            </p>
                        </div>
                        ))}
                    </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="carousel-item">
                    <div className="row g-4 justify-content-center">
                        {["Khách hàng 4", "Khách hàng 5", "Khách hàng 6"].map((title, idx) => (
                        <div className="col-md-4" key={idx}>
                            <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                                title={title}
                                allowFullScreen
                            ></iframe>
                            </div>
                            <p className="text-center mt-2">Chia sẻ {title}</p>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Điều hướng video */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#videoCarousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Trước</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#videoCarousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Sau</span>
                </button>
                </div>
            </div>
            </div>
        </div>
      </div>

      {/* tư vấn */}
      <div className="container-fluid py-5" style={{ backgroundColor: "skyblue" }}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Phần "Chọn dịch vụ" */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="fw-bold mb-4" style={{ color: "#0000FF" }}>
                Chọn dịch vụ
              </h2>
              <div className="row g-4">
                {/* Danh sách dịch vụ */}
                {[
                  {
                    title: "Massage - tắm bé - vệ sinh chậu ở khoa - hỗ trợ mẹ",
                    img: "https://imgs.search.brave.com/ea7xYcl_astoQ9t5xOfJT2BRV7lGLNxsPy4sbnHRwqY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YmFvaGF0aW5oLnZu/L2ltYWdlcy9lOTBi/ZDY3MWYxZGI1YjBi/MTM3NGY5MjRlYmQ0/MzhiOTRjNjg5NWVl/MGVlYWZiZmRkNGEy/M2E5NTZkZjc4MDk4/MGI4NWY0ZDNhOGNm/ZTAyNGMzMDIzZWQx/M2FiYmM2NGQ1MDc4/ZGFmMWViN2IxZDY0/MWZkNzU1NmZmNjAz/NGNhZS9kaWNoLXZ1/LXNwYS0zLTMxMzcu/anBn",
                  },
                  {
                    title: "Massage chân giảm phù nề tích nước kết hợp ở khoa Himalaya",
                    img: "https://imgs.search.brave.com/ea7xYcl_astoQ9t5xOfJT2BRV7lGLNxsPy4sbnHRwqY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YmFvaGF0aW5oLnZu/L2ltYWdlcy9lOTBi/ZDY3MWYxZGI1YjBi/MTM3NGY5MjRlYmQ0/MzhiOTRjNjg5NWVl/MGVlYWZiZmRkNGEy/M2E5NTZkZjc4MDk4/MGI4NWY0ZDNhOGNm/ZTAyNGMzMDIzZWQx/M2FiYmM2NGQ1MDc4/ZGFmMWViN2IxZDY0/MWZkNzU1NmZmNjAz/NGNhZS9kaWNoLXZ1/LXNwYS0zLTMxMzcu/anBn",
                  },
                  {
                    title: "Kích sữa & chữa tắc sữa sau sinh",
                    img: "https://imgs.search.brave.com/ea7xYcl_astoQ9t5xOfJT2BRV7lGLNxsPy4sbnHRwqY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YmFvaGF0aW5oLnZu/L2ltYWdlcy9lOTBi/ZDY3MWYxZGI1YjBi/MTM3NGY5MjRlYmQ0/MzhiOTRjNjg5NWVl/MGVlYWZiZmRkNGEy/M2E5NTZkZjc4MDk4/MGI4NWY0ZDNhOGNm/ZTAyNGMzMDIzZWQx/M2FiYmM2NGQ1MDc4/ZGFmMWViN2IxZDY0/MWZkNzU1NmZmNjAz/NGNhZS9kaWNoLXZ1/LXNwYS0zLTMxMzcu/anBn",
                  },
                  {
                    title: "Chăm sóc mẹ sau sinh điều dưỡng",
                    img: "https://imgs.search.brave.com/ea7xYcl_astoQ9t5xOfJT2BRV7lGLNxsPy4sbnHRwqY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YmFvaGF0aW5oLnZu/L2ltYWdlcy9lOTBi/ZDY3MWYxZGI1YjBi/MTM3NGY5MjRlYmQ0/MzhiOTRjNjg5NWVl/MGVlYWZiZmRkNGEy/M2E5NTZkZjc4MDk4/MGI4NWY0ZDNhOGNm/ZTAyNGMzMDIzZWQx/M2FiYmM2NGQ1MDc4/ZGFmMWViN2IxZDY0/MWZkNzU1NmZmNjAz/NGNhZS9kaWNoLXZ1/LXNwYS0zLTMxMzcu/anBn",
                  },
                ].map((service, index) => (
                  <div className="col-12" key={index}>
                    <div className="d-flex align-items-center">
                      <img
                        src={service.img}
                        alt="Dịch vụ"
                        className="rounded me-3"
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      />
                      <div className="flex-grow-1">
                        <h5 className="fw-bold">{service.title}</h5>
                        <a href="#st" className="btn btn-primary rounded-pill px-3">
                          Liên hệ
                        </a>
                      </div>
                    </div>
                    <div style={{ borderBottom: "3px solid #007bff", paddingBottom: "3px" }}></div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <a href="#st" className="btn btn-primary rounded-pill px-5">
                  Đặt dịch vụ
                </a>
              </div>
            </div>
          </div>

          {/* Phần "Yêu cầu tư vấn" */}
          <div className="col-lg-6">
            <div className="bg-white p-4 rounded shadow-sm">
              <h2 className="fw-bold mb-4" style={{ color: "#0000FF" }}>
                Yêu cầu tư vấn
              </h2>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Họ tên (*)" required />
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control" placeholder="Số điện thoại (*)" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Địa chỉ" />
                </div>
                <div className="mb-3">
                  <select className="form-select" required defaultValue="">
                    <option value="" disabled>
                      Tình trạng
                    </option>
                    <option value="dich-vu-cho-be">Dịch vụ cho bé</option>
                    <option value="dich-vu-cho-me">Dịch vụ cho mẹ</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Bạn đang quan tâm đến dịch vụ nào?</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="dich-vu-cho-be"
                      id="dichVuChoBe"
                    />
                    <label className="form-check-label" htmlFor="dichVuChoBe">
                      Dịch vụ cho bé
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="dich-vu-cho-me"
                      id="dichVuChoMe"
                    />
                    <label className="form-check-label" htmlFor="dichVuChoMe">
                      Dịch vụ cho mẹ
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="3" placeholder="Nội dung"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary rounded-pill px-5">
                    Gửi yêu cầu tư vấn
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* hình ảnh */}
      <div className="container-fluid py-5" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="container py-5">
            {/* Tiêu đề */}
            <div className="row g-4 justify-content-center">
            <div className="col-lg-4 text-center">
                <h1 className="fw-bold" style={{ fontSize: '36px', color: '#0000FF' }}>Hình ảnh</h1>
                <div className="d-flex align-items-center mt-3 justify-content-center">
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: '50px' }}></div>
                <img src="logo.png" alt="Logo" className="mx-3" style={{ width: '40px', height: '40px' }} />
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: '50px' }}></div>
                </div>
            </div>
            </div>

            {/* Slider hình ảnh */}
            <div className="row mt-5">
            <div className="col-lg-12">
                <div id="videoCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {/* Slide 1 */}
                    <div className="carousel-item active">
                    <div className="row g-4 justify-content-center">
                        {[...Array(4)].map((_, i) => (
                        <div className="col-md-3" key={i}>
                            <div className="ratio ratio-16x9 overflow-hidden">
                            <img
                                src="https://imgs.search.brave.com/ea7xYcl_astoQ9t5xOfJT2BRV7lGLNxsPy4sbnHRwqY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YmFvaGF0aW5oLnZu/L2ltYWdlcy9lOTBi/ZDY3MWYxZGI1YjBi/MTM3NGY5MjRlYmQ0/MzhiOTRjNjg5NWVl/MGVlYWZiZmRkNGEy/M2E5NTZkZjc4MDk4/MGI4NWY0ZDNhOGNm/ZTAyNGMzMDIzZWQx/M2FiYmM2NGQ1MDc4/ZGFmMWViN2IxZDY0/MWZkNzU1NmZmNjAz/NGNhZS9kaWNoLXZ1/LXNwYS0zLTMxMzcu/anBn"
                                alt="Hình ảnh 1"
                                className="img-fluid w-100 h-100"
                                style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>

                    {/* Slide 2 */}
                    <div className="carousel-item">
                    <div className="row g-4 justify-content-center">
                        {[...Array(4)].map((_, i) => (
                        <div className="col-md-3" key={i + 4}>
                            <div className="ratio ratio-16x9 overflow-hidden">
                            <img
                                src="https://imgs.search.brave.com/ea7xYcl_astoQ9t5xOfJT2BRV7lGLNxsPy4sbnHRwqY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YmFvaGF0aW5oLnZu/L2ltYWdlcy9lOTBi/ZDY3MWYxZGI1YjBi/MTM3NGY5MjRlYmQ0/MzhiOTRjNjg5NWVl/MGVlYWZiZmRkNGEy/M2E5NTZkZjc4MDk4/MGI4NWY0ZDNhOGNm/ZTAyNGMzMDIzZWQx/M2FiYmM2NGQ1MDc4/ZGFmMWViN2IxZDY0/MWZkNzU1NmZmNjAz/NGNhZS9kaWNoLXZ1/LXNwYS0zLTMxMzcu/anBn"
                                alt="Hình ảnh 1"
                                className="img-fluid w-100 h-100"
                                style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)' }
                            />
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#videoCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#videoCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </div>
            </div>
        </div>
     </div>
     {/* blog */}
     <div className="container-fluid fruite py-5" style={{backgroundColor:"skyblue"}}>
      <div className="container py-5">
        <div className="tab-class text-center">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4 text-center">
              <h1
                className="fw-bold"
                style={{ whiteSpace: "nowrap", fontSize: "36px", color: "#0000FF" }}
              >
                Blog
              </h1>
              <div className="d-flex align-items-center mt-3 justify-content-center">
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                <img src="logo.png" alt="Logo" className="mx-3" style={{ width: "40px", height: "40px" }} />
                <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
              </div>
            </div>
          </div>

          <div className="tab-content">
            {/* Tab 1 */}
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-4">
                {Array(4).fill().map((_, idx) => (
                  <div key={idx} className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item bg-white">
                      <div className="fruite-img">
                        <img
                          src="https://imgs.search.brave.com/5BGSvPnjH5DF7_aIuUKfFqmXN3GgN2z7gcr_xP0w41I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZkLzFj/L2RmLzZkMWNkZmRl/ZDRiMzEyMGM5ZDNm/Yjc1ZjI0MjFkODhj/LmpwZw"
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white px-3 py-1 rounded position-absolute"
                        style={{ top: "10px", left: "10px" }}
                      ></div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <div className="d-flex justify-content-between flex-lg-wrap">
                          <h4 style={{ borderBottom: "3px solid #007bff", paddingBottom: "3px" }}>Grapes</h4>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab 2 */}
            <div id="tab-2" className="tab-pane fade show p-0">
              <div className="row g-4">
                <div className="col-md-6 col-lg-4 col-xl-3">
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img
                        src="https://imgs.search.brave.com/5BGSvPnjH5DF7_aIuUKfFqmXN3GgN2z7gcr_xP0w41I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZkLzFj/L2RmLzZkMWNkZmRl/ZDRiMzEyMGM5ZDNm/Yjc1ZjI0MjFkODhj/LmpwZw"
                        className="img-fluid w-100 rounded-top"
                        alt=""
                      />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}></div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <h4 style={{ borderBottom: "3px solid #007bff", paddingBottom: "3px" }}>Grapes</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more product cards here as needed */}
              </div>
            </div>

            {/* Tab 3, Tab 4, Tab 5 — You can replicate the same pattern and map data dynamically if needed */}

          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Home;