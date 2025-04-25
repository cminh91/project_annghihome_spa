import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../functionservice/categoryService";
import storeinforService from "../../functionservice/storeinforService";

const Header = () => {
  const [storeInfos, setStoreInfos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({
    level0: [],
    level1: [],
    level2: [],
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
        const level2Categories = categoriesData.filter(
          (category) => category.level === 2
        );

        setCategories({
          level0: level0Categories,
          level1: level1Categories,
          level2: level2Categories,
        });
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

  const renderSubCategories = (parentCategory) => {
    const level1SubCategories = categories.level1.filter(
      (category) => category.parentId === parentCategory.id
    );
    const level2SubCategories = categories.level2.filter(
      (category) => category.parentId === parentCategory.id
    );

    if (level1SubCategories.length > 0 || level2SubCategories.length > 0) {
      return (
        <div className="dropdown-menu m-0 bg-secondary rounded-0">
          {level1SubCategories.length > 0 && (
            <div className="dropdown-item">
              {level1SubCategories.map((subcategory) => (
                <div key={subcategory.id} className="dropdown-item">
                  <Link
                    to={`/dich-vu/${subcategory.slug}`}
                    className="dropdown-item"
                  >
                    {subcategory.name}
                  </Link>
                  <Link
                    to={`/san-pham/${subcategory.slug}`}
                    className="dropdown-item"
                  >
                    {subcategory.name}
                  </Link>
                  <Link
                    to={`/bai-viet/${subcategory.slug}`}
                    className="dropdown-item"
                  >
                    {subcategory.name}
                  </Link>
                  {renderSubCategories(subcategory)}
                </div>
              ))}
            </div>
          )}
          {level2SubCategories.length > 0 && (
            <div className="dropdown-item">
              <strong>Level 2</strong>
              {level2SubCategories.map((subcategory) => (
                <div key={subcategory.id} className="dropdown-item">
                  <Link
                    to={`/dich-vu/${subcategory.slug}`}
                    className="dropdown-item"
                  >
                    {subcategory.name}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

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
        {renderSubCategories(category)}
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
                <a href="https://zalo.me/" className="text-white" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-zalo fa-lg me-2 "></i>
                  Zalo
                </a>
                <a href={storeInfos[0]?.facebook|| '#'} className="text-white" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-lg me-2"></i>
                </a>
              </div>

          </div>
        </div>

        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          {storeInfos.length > 0 && storeInfos[0].logo && (
            <Link to="/" className="navbar-brand" style={{ marginLeft: "90px" }}>
              <img
                src={storeInfos[0].logo}
                alt="Store Logo"
                style={{ width: "150px", height: "85px" }}
              />
            </Link>
          )}
          <div className="collapse navbar-collapse">
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

            <div className="d-flex align-items-center justify-content-end ms-auto">
              <button
                className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="fas fa-search text-primary"></i>
              </button>
              <a href="#st" className="position-relative me-4">
                <i className="fa fa-shopping-bag fa-2x"></i>
                <span
                  className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                  style={{
                    top: "-5px",
                    left: "9px",
                    height: "20px",
                    minWidth: "20px",
                  }}
                >
                  3
                </span>
              </a>
              <a href="#st">
                <i className="fas fa-user fa-2x"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
