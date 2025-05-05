import React,{ useState, useEffect } from "react";
import bannerService from "../../functionservice/BannerService";
import HomeService from "../service/HomeService";
import { Spinner } from "react-bootstrap";
import HomeProduct from "../product/HomeProduct";
import storeinforService from "../../functionservice/storeinforService";
import HomeTeam from "../team/HomeTeam";
import VideoList from "../video/VideoList";
import HomeBlog from "../blog/HomeBlog";
import ContactList from "../contact/Contact";
import ServiceList from "../service/Service";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [storeInfos, setStoreInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, [])
  useEffect(() => {
    const fetchStoreInfos = async () => {
      try {
        setLoading(true);
        const data = await storeinforService.getAllStoreinfo();
        console.log(data)
        setStoreInfos(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching banners:", err);
        setError("Không thể tải thông tin cưa thàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchStoreInfos();
  }, [])
  useEffect(() => {
    const carouselElement = document.getElementById("carouselId");
    if (carouselElement) {
      const carousel = new window.bootstrap.Carousel(carouselElement);
      carousel.cycle();
    }
  }, []);
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
                data-bs-interval="2000" // Slide every 2 seconds
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
                  <>
                    {/* Carousel Indicators */}
                    <div className="carousel-indicators">
                      {banners.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target="#carouselId"
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : "false"}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>

                    {/* Carousel Items */}
                    <div className="carousel-inner">
                      {banners.map((banner, index) => (
                        <div
                          key={banner.id}
                          className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                          <div className="position-relative">
                            <div
                              className="position-relative"
                              onClick={() => (window.location.href = banner.link)}
                              style={{ cursor: "pointer" }}
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

                  </>
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
          <div className="row g-4 justify-content-center">
              <div className="col-lg-4 text-center">
                <h1
                  className="fw-bold"
                  style={{ whiteSpace: "nowrap", fontSize: "36px", color: "#0000FF" }}
                >
                  Dịch Vụ An Nghi Home
                </h1>
                <div className="d-flex align-items-center mt-3 justify-content-center">
                  <div
                    className="border-top border-dark flex-grow-1"
                    style={{ maxWidth: "50px" }}
                  ></div>
                  <img
                    src={storeInfos?.favicon}
                    alt="Logo"
                    className="mx-3"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div
                    className="border-top border-dark flex-grow-1"
                    style={{ maxWidth: "50px" }}
                  ></div>
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
              </div>
            </div>
            <HomeService/>
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
                <img src={storeInfos?.favicon} alt="Logo" className="mx-3" style={{ width: "40px", height: "40px" }} />
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
      
      {/* Dịch vụ Shop Start */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
          <div className="row g-4 justify-content-center">
              <div className="col-lg-4 text-center">
                <h1
                  className="fw-bold"
                  style={{ whiteSpace: "nowrap", fontSize: "36px", color: "#0000FF" }}
                >
                  Sản Phẩm An Nghi Home
                </h1>
                <div className="d-flex align-items-center mt-3 justify-content-center">
                  <div
                    className="border-top border-dark flex-grow-1"
                    style={{ maxWidth: "50px" }}
                  ></div>
                  <img
                    src={storeInfos?.favicon}
                    alt="Logo"
                    className="mx-3"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div
                    className="border-top border-dark flex-grow-1"
                    style={{ maxWidth: "50px" }}
                  ></div>
                </div>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
              </div>
            </div>
            <HomeProduct/>
          </div>
        </div>
      </div>
      {/* Dịch Shop End */}

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
                    src={storeInfos?.favicon}
                    alt="Logo"
                    className="mx-3"
                    style={{ width: "40px", height: "40px" }}
                    />
                    <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                </div>
                </div>
                <p className="text-dark mt-3 text-center">
                An Nghi HOME có Đội ngũ Bác sĩ uy tín hàng đầu hiện nay ở cả 3 lĩnh vực Sản Khoa – Nhi Khoa – Chăm sóc Tiền / Hậu Sản.
                Đội ngũ Bác sĩ tại An Nghi HOME có rất nhiều năm kinh nghiệm về chuyên môn và đảm trách nhiệm vụ, vị trí công tác quan trọng
                ở các Bệnh viện hàng đầu Việt Nam như: Bệnh viện Quốc tế Mỹ AIH, Bệnh viện Từ Dũ, Bệnh viện FV, Bệnh viện Nhi Đồng 2, CMI Việt Nam.
                </p>
            </div>
            <HomeTeam/>
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
                  src={storeInfos?.favicon}
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
            {/* <div className="row g-4 mt-5">
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
            </div> */}

            {/* Slider Video */}
            <VideoList/>
        </div>
      </div>

      {/* tư vấn */}
      <div className="container-fluid py-5" style={{ backgroundColor: "skyblue" }}>
        <div className="container py-5">
          <div className="row g-2">
            {/* Phần "Chọn dịch vụ" - Cột 1 */}
            <div className="col-lg-6">
              <div className="bg-white rounded shadow-sm p-4">
                <ServiceList />
              </div>
            </div>

            {/* Phần "Yêu cầu tư vấn" - Cột 2 */}
            <div className="col-lg-6">
              <div className="bg-white rounded shadow-sm p-4">
                <ContactList />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* hình ảnh */}
      {/* <div className="container-fluid py-5" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="container py-5">
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

            <div className="row mt-5">
            <div className="col-lg-12">
                <div id="videoCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
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
     </div> */}

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
          <HomeBlog/>
        </div>
      </div>
    </div>

    </div>
  );
};

export default Home;