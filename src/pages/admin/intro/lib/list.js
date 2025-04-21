import React, { useState } from "react";
import IntroModal from "./IntroModal";
import {  useNavigate } from "react-router-dom";


const IntroList = () => {
  const [showModal, setShowModal] = useState(false);
  const [intros, setIntros] = useState([]);
  const navigate= useNavigate();


  const handleSaveIntro = (newIntro) => {
    setIntros([...intros, { ...newIntro, id: intros.length + 1 }]);
  };
  const handleOpenTrash = () => {
    navigate("/admin/intro/trash");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Bài viết giới thiệu</h2>
        <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle me-2"></i>Thêm bài viết
            </button>
            <button className="btn btn-danger" onClick={handleOpenTrash}>
            <i className="bi bi-trash me-2"></i>thùng rác
            </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {intros.map((intro) => (
            <tr key={intro.id}>
              <td>
                <img
                  src={intro.image ? URL.createObjectURL(intro.image) : ""}
                  alt="Ảnh bài viết"
                  style={{ width: "80px", objectFit: "cover" }}
                />
              </td>
              <td>{intro.title}</td>
              <td>{intro.category}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-warning">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <IntroModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveIntro}
      />
    </div>
  );
};

export default IntroList;
