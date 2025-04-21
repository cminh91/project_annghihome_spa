import React from "react";
import { Link } from "react-router-dom";
import { RiTeamFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import authService from '../../functionservice/authService';

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService().logout();
    localStorage.removeItem('jwt-token');
    navigate('/admin/login');
  };

  return (
    <aside className="left-sidebar">
      <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          {/* HOME */}
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">HOME</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/admin">
              <span><i className="ti ti-home-2"></i></span>
              <span className="hide-menu">Dashboard</span>
            </Link>
          </li>

          {/* SYSTEM */}
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">SYSTEM</span>
          </li>
          {[
            { to: "/admin/header", icon: "ti ti-layout-navbar", label: "Header" },
            { to: "/admin/footer", icon: "ti ti-layout-navbar-collapse", label: "Footer" },
            { to: "/admin/store", icon: "ti ti-building-store", label: "Store" },
          ].map(({ to, icon, label }) => (
            <li className="sidebar-item" key={to}>
              <Link className="sidebar-link" to={to}>
                <span><i className={icon}></i></span>
                <span className="hide-menu">{label}</span>
              </Link>
            </li>
          ))}

          {/* COMPONENT */}
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">COMPONENT</span>
          </li>
          {[
            { to: "/admin/product", icon: "ti ti-package", label: "Sản Phẩm" },
            { to: "/admin/service", icon: "ti ti-briefcase", label: "Dịch Vụ" },
            { to: "/admin/category", icon: "ti ti-category", label: "Danh Mục" },
            { to: "/admin/slider", icon: "ti ti-slideshow", label: "Slider" },
            { to: "/admin/team", icon: <RiTeamFill />, label: "Đội Ngũ" },
            { to: "/admin/about", icon: "ti ti-info-circle", label: "Thông tin" },
            { to: "/admin/blog", icon: "ti ti-news", label: "Bài Viết" },
            { to: "/admin/intro", icon: "ti ti-id-badge-2", label: "Giới Thiệu" },
            { to: "/admin/contact", icon: "ti ti-phone", label: "Liên Hệ" },
            { to: "/admin/image", icon: "ti ti-photo", label: "Hình Ảnh" },
            { to: "/admin/cart", icon: "ti ti-shopping-cart", label: "Cart" },
            { to: "/admin/users", icon: "ti ti-users", label: "Người dùng" },
          ].map(({ to, icon, label }) => (
            <li className="sidebar-item" key={to}>
              <Link className="sidebar-link" to={to}>
                <span>{typeof icon === "string" ? <i className={icon}></i> : icon}</span>
                <span className="hide-menu">{label}</span>
              </Link>
            </li>
          ))}

          {/* AUTH */}
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">AUTH</span>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/register">
              <span><i className="ti ti-login"></i></span>
              <span className="hide-menu">Đăng ký</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <div
              className="sidebar-link cursor-pointer"
              onClick={handleLogout}
            >
              <span><i className="ti ti-logout"></i></span>
              <span className="hide-menu">Đăng Xuất</span>
            </div>
          </li>


          {/* EXTRA */}
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span className="hide-menu">EXTRA</span>
          </li>
          {[
            { to: "/admin/partner", icon: "ti ti-users", label: "Đối tác" },
            { to: "/admin/Policy", icon: "ti ti-aperture", label: "chính sách" },
            { to: "/admin/faq", icon: "ti ti-aperture", label: "FaQ" },
            { to: "/admin/storeinfor", icon: "ti ti-building-store", label: "thông tin cửa hàng" },
          ].map(({ to, icon, label }) => (
            <li className="sidebar-item" key={to}>
              <Link className="sidebar-link" to={to}>
                <span><i className={icon}></i></span>
                <span className="hide-menu">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;