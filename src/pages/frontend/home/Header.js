import React from "react";
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
      <div>
        <div className="spinner-grow text-primary" role="status"></div>
      </div>

      <div className="container-fluid fixed-top">
        <div className="container-fluid bg-primary d-none d-lg-block">
                <div className="d-flex justify-content-between align-items-center px-3 py-2">
                    <div className="top-info">
                    <small className="me-3">
                        <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                        <a href="#st" className="text-white">123 Street, New York</a>
                    </small>
                    <small className="me-3">
                        <i className="fas fa-envelope me-2 text-secondary"></i>
                        <a href="#st" className="text-white">Email@Example.com</a>
                    </small>
                    <small className="me-3">
                        <i className="fa fa-clock me-2 text-secondary"></i>
                        <a href="#st" className="text-white">8h - 17h T2 đến T7</a>
                    </small>
                    </div>
                    <div className="top-link">
                    <a href="#st" className="text-white"><small className="mx-2">Terms of Use</small>/</a>
                    <a href="#st" className="text-white"><small className="mx-2">Sales and Refunds</small>/</a>
                    <a href="#st" className="text-white"><small className="mx-2">Liên Hệ</small></a>
                    </div>
                </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <img
                src="logo.png"
                alt="Logo"
                className="mx-3"
                style={{ width: "40px", height: "40px" }}
              />
            </Link>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary"></span>
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to="/" className="nav-item nav-link active">
                  Trang chủ
                </Link>
                <div className="nav-item dropdown">
                  <a
                    href="st#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Dịch vụ
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <a href="st" className="dropdown-item">
                      dịch vụ cho bé
                    </a>
                    <a href="st" className="dropdown-item">
                      dịch vụ cho mẹ bầu
                    </a>
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <a
                    href="st"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    sản phẩm
                  </a>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <Link to="/" className="dropdown-item">
                      dịch vụ cho bé
                    </Link>
                    <Link to="/" className="dropdown-item">
                      dịch vụ cho mẹ bầu
                    </Link>
                    <Link to="/" className="dropdown-item">
                      dịch vụ sau sinh
                    </Link>
                    <Link to="/" className="dropdown-item">
                      404 Page
                    </Link>
                  </div>
                </div>
                <Link to="/blog" className="nav-item nav-link">
                  Blog
                </Link>
                <Link to="/video" className="nav-item nav-link">
                  video
                </Link>
                <Link to="/tin-tuc" className="nav-item nav-link">
                  tin tức
                </Link>
                <Link to="/gioi-thieu" className="nav-item nav-link">
                  giới thiệu
                </Link>
                <Link to="/lien-he" className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <div className="d-flex m-3 me-0">
                <button
                  className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
                  data-bs-toggle="modal"
                  data-bs-target="#searchModal"
                >
                  <i className="fas fa-search text-primary"></i>
                </button>
                <a href="#st" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{
                      top: "-5px",
                      left: "15px",
                      height: "20px",
                      minWidth: "20px",
                    }}
                  >
                    3
                  </span>
                </a>
                <a href="#st" className="my-auto">
                  <i className="fas fa-user fa-2x"></i>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
