import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DescriptionEditor from "../../lib/DescriptionEditor"; // Import DescriptionEditor

const HeaderList = () => {
  const [showModal, setShowModal] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [slogan, setSlogan] = useState(""); // Lưu giá trị cho slogan
  const navigate = useNavigate();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setLogoPreview(null);
    setSlogan(""); // Reset slogan khi đóng modal
  };

  const handleOpenTrash = () => {
    navigate("/admin/header/trash");
  };
  const handleOpenEdit = () => {
    navigate("/admin/header/edit");
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [headers] = useState([
    {
      id: 1,
      logo: "https://via.placeholder.com/50",
      name: "Nguyễn Văn A",
      email: "vana@example.com",
      address: "123 Đường ABC, Quận 1",
      hotline: "0123 456 789",
      slogan: "Khách hàng là ưu tiên",
      status: 1,
    },
    {
      id: 2,
      logo: "https://via.placeholder.com/50",
      name: "Trần Thị B",
      email: "thib@example.com",
      address: "456 Đường XYZ, Quận 3",
      hotline: "0987 654 321",
      slogan: "Chất lượng tạo niềm tin",
      status: 1,
    },
  ]);

  // Hàm thay đổi giá trị slogan từ DescriptionEditor
  const handleSloganChange = (content) => {
    setSlogan(content);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Header</h2>
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
            <th>Liên hệ</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Hotline</th>
            <th>Slogan</th>
            <th>Trạng thái Hoạt động</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.logo}
                  alt={`Logo ${item.name}`}
                  width="50"
                  height="50"
                  className="rounded"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.hotline}</td>
              <td>{item.slogan}</td>
              <td>{item.status}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    title="Chỉnh sửa"
                    onClick={handleOpenEdit}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    title="xoá tạm thời"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Thêm Header Mới</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body px-4 py-3">
                <form>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Liên hệ</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Địa chỉ</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Hotline</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Slogan</label>
                      <DescriptionEditor
                        value={slogan} // Gán giá trị slogan từ state
                        onChange={handleSloganChange} // Cập nhật slogan khi người dùng thay đổi
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Logo (Tải ảnh)</label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleLogoChange}
                      />
                      {logoPreview && (
                        <div className="mt-2">
                          <img
                            src={logoPreview}
                            alt="Xem trước logo"
                            height="80"
                            className="rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer px-4">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Hủy
                </button>
                <button className="btn btn-success">
                  <i className="bi bi-save me-2"></i>Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderList;
