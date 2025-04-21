import React, { useState } from "react";
import ModalFooterForm from "./ModalFooterForm";
import {  useNavigate } from "react-router-dom";


const FooterList = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleOpenTrash = () => {
    navigate("/admin/footer/trash");
  };
  const handleOpenEdit =()=>{
    navigate("/admin/footer/edit");

  }
  const handleSave = (data) => {
    console.log("Dữ liệu gửi đi:", data);
    // Gửi API hoặc thêm vào danh sách ở đây
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Footer</h2>
        <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={handleOpen}>
                    <i className="bi bi-plus-circle me-2"></i>Thêm mới
                </button>
                <button className="btn btn-danger" onClick={handleOpenTrash}>
                    <i className="bi bi-trash me-2"></i>Thùng rác
                </button>
            </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Logo</th>
            <th>Tiêu đề</th>
            <th>Liên hệ</th>
            <th>Chính sách</th>
            <th>Fanpage</th>
            <th>Bản đồ</th>
            <th>Hoạt động</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src="https://via.placeholder.com/50"
                alt="Logo"
                width="50"
                height="50"
              />
            </td>
            <td>An Nghi Home</td>
            <td>Email: info@annghihome.vn<br />SĐT: 0909 123 456</td>
            <td>Chính sách bảo mật</td>
            <td><a href="https://web.facebook.com/AnNghiHomeDichvuchamsocmevabebuonmethuot" target="_blank" rel="noreferrer">
                fanpage
              </a></td>
            <td>
              <a href="https://maps.app.goo.gl/o7rGEK3mqJvDfhCb8" target="_blank" rel="noreferrer">
                Xem bản đồ
              </a>
            </td>
            <td className="text-center">1</td>
            <td >
                <div  className="d-flex gap-2">
                <button className="btn btn-sm btn-warning me-2">
                    <i className="bi bi-pencil-square" onClick={handleOpenEdit}></i>
                </button>
                <button className="btn btn-sm btn-danger">
                    <i className="bi bi-trash" ></i>
                </button>
                </div>

            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal thêm mới */}
      <ModalFooterForm show={showModal} handleClose={handleClose} handleSave={handleSave} />
    </div>
  );
};

export default FooterList;
