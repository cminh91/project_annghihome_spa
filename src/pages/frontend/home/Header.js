import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../functionservice/categoryService";
import storeinforService from "../../functionservice/storeinforService";
import { SiZalo } from 'react-icons/si';

const Header = () => {
  const [storeInfos, setStoreInfos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({
    level0: [],
    level1: [],
  });
  
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const categoriesData = await categoryService.getAllCategories();
        const level0Categories = categoriesData.filter(
          (category) => category.level === 0
        );
        const level1Categories = categoriesData.filter(
          (category) => category.level === 1
        );


        setCategories({
          level0: level0Categories,
          level1: level1Categories,
        });
        setError(null);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Không thể tải danh mục. Vui lòng thử lại.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchStoreInfos = async () => {
      setLoading(true);
      try {
        const data = await storeinforService.getAllStoreinfo();
        setStoreInfos(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách cửa hàng. Vui lòng thử lại.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreInfos();
  }, []);

  const renderCategoryDropdown = (categoryType) => {
    const filteredCategories = categories.level0.filter(
      (category) => category.type === categoryType
    );
    if (categoriesLoading) {
      return <div className="dropdown-item">Đang tải...</div>;
    }
    if (error) {
      return <div className="dropdown-item">Lỗi tải danh mục</div>;
    }
    if (filteredCategories.length === 0) {
      return <div className="dropdown-item">Không có {categoryType}</div>;
    }
    return filteredCategories.map((category) => (
      <div key={category.id} className="dropdown-item dropdown-submenu">
        <Link to={`/category/${category.slug}`} className="dropdown-item">
          {category.name}
        </Link>
      </div>
    ));
  };

  return (
    <header>
      <div className="container-fluid fixed-top">
        <div className="container-fluid bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between align-items-center px-3 py-2">
            <div className="top-info">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                <a href={storeInfos[0]?.googleMap || '#'} className="text-white">
                  10B Phan Đình Phùng
                </a>
              </small>
              <small className="me-3">
                <i className="fas fa-phone me-2 text-secondary"></i>
                <a href= {storeInfos[0]?.hotline || '#'} className="text-white">
                082 620 4747
                </a>
              </small>
              <small className="me-3">
                <i className="fa fa-clock me-2 text-secondary"></i>
                <a href="#st" className="text-white">
                  {storeInfos[0]?.workingHours}
                </a>
              </small>
            </div>
            <div className="top-link d-flex gap-2">
              <a href={`https://zalo.me/${storeInfos[0]?.zalo}`} className="text-white d-flex align-items-center" target="_blank" rel="noopener noreferrer">
              <SiZalo size={30} className="me-2" />
              </a>
              <a href={storeInfos[0]?.facebook || '#'} className="text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-lg me-2"></i>
              </a>
            </div>


          </div>
        </div>

        <nav className="navbar navbar-white  navbar-expand-xl">
            {storeInfos.length > 0 && storeInfos[0].logo && (
              <Link to="/" className="navbar-brand" style={{ marginLeft: "90px" }}>
                <img
                  src={storeInfos[0].logo}
                  alt="Store Logo"
                  style={{ width: "150px", height: "85px" }}
                />
              </Link>
            )}

            {/* Nút toggler menu khi màn hình nhỏ */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Nội dung menu */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to="/" className="nav-item nav-link">
                  Trang chủ
                </Link>

                <div className="nav-item dropdown">
                  <a
                    href="#st"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Dịch vụ
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {renderCategoryDropdown("service")}
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <a
                    href="#st"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Sản phẩm
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {renderCategoryDropdown("product")}
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <a
                    href="#st"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Bài viết
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {renderCategoryDropdown("post")}
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <a
                    href="#st"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Video
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    {renderCategoryDropdown("video")}
                  </div>
                </div>

                <Link to="/gioi-thieu" className="nav-item nav-link">
                  Giới thiệu
                </Link>
                <Link to="/lien-he" className="nav-item nav-link">
                  Contact
                </Link>
              </div>

              {/* Nút tìm kiếm bên phải */}
              <div className="d-flex align-items-center justify-content-end ms-auto">
                <button
                  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="fas fa-search text-primary"></i>
                </button>
              </div>
            </div>
          </nav>

      </div>
      <div
          className="modal fade"
          id="searchModal"
          tabIndex="-1"
          aria-labelledby="searchModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="searchModalLabel">Tìm kiếm</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" placeholder="Nhập từ khoá..." />
              </div>
            </div>
          </div>
        </div>

    </header>
  );
};

export default Header;
