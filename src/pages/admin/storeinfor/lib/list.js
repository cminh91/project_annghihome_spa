import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateStoreModal from "./createmodal";
import EditStoreModal from "./editmodal";

const ListStoreInfo = () => {
  const [storeInfos, setStoreInfos] = useState([
    {
      id: "1",
      name: "Cửa hàng A",
      hotline: "0123456789",
      logo: "logo_a.png",
      favicon: "favicon_a.ico",
      footer: "Bản quyền © Cửa hàng A",
      createdAt: "2025-04-01T09:00:00",
      updatedAt: "2025-04-10T10:00:00",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const navigate = useNavigate();

  const handleAdd = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (store) => {
    setSelectedStore(store);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa cửa hàng này không?")) {
      setStoreInfos(storeInfos.filter((info) => info.id !== id));
    }
  };

  const handleSave = (newStore) => {
    setStoreInfos([...storeInfos, newStore]);
    setShowCreateModal(false);
  };

  const handleUpdate = (updatedStore) => {
    setStoreInfos(
      storeInfos.map((info) => (info.id === updatedStore.id ? updatedStore : info))
    );
    setShowEditModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Danh sách thông tin cửa hàng</h3>
        <div>
          <Button variant="primary" onClick={handleAdd} className="me-2">
            <FaPlus /> Thêm thông tin cửa hàng
          </Button>
          <Button variant="secondary" onClick={() => navigate("/admin/store/trash")}>
            Thùng rác
          </Button>
        </div>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Hotline</th>
            <th>Logo</th>
            <th>Favicon</th>
            <th>Footer</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {storeInfos.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            storeInfos.map((info) => (
              <tr key={info.id}>
                <td>{info.name}</td>
                <td>{info.hotline}</td>
                <td>{info.logo}</td>
                <td>{info.favicon}</td>
                <td>{info.footer}</td>
                <td className="d-flex justify-content-center">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(info)}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(info.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal thêm mới */}
      <CreateStoreModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSave}
      />

      {/* Modal chỉnh sửa */}
      {selectedStore && (
        <EditStoreModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          store={selectedStore} // Đã sửa lại đúng tên prop
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ListStoreInfo;
