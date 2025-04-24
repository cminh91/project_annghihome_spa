import React, { useState, useEffect } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import EditStoreModal from "./editmodal";
import CreateStoreModal from "./createmodal";
import { useNavigate } from "react-router-dom";
import storeService from "../../../functionservice/storeService";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [paginatedStores, setPaginatedStores] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await storeService.getAlladdresses();
        setStores(data);
        setPaginatedStores(data.slice(0, perPage));
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchStores();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * perPage;
    const selectedStores = stores.slice(startIndex, startIndex + perPage);
    setPaginatedStores(selectedStores);
  }, [currentPage, stores]);

  const handleEdit = (store) => {
    setCurrentStore(store);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa địa chỉ này không?")) {
      try {
        await storeService.deleteaddresses(id);
        setStores(stores.filter((store) => store.id !== id));
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const handleOpenTrash = () => {
    navigate("/admin/store/trash"); // Assuming your trash route is similar
  };

  const handleAdd = () => {
    setShowCreateModal(true);
  };

  const handleSaveStore = async (newStore) => {
    try {
      const savedStore = await storeService.createaddresses(newStore);
      setStores((prevStores) => [...prevStores, savedStore]);
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  const handleUpdateStore = async (updatedStore) => {
    try {
      const result = await storeService.editaddresses(updatedStore.id, updatedStore);
      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id === updatedStore.id ? result : store
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPages = Math.ceil(stores.length / perPage);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <h3>Danh sách địa chỉ</h3>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={handleAdd}>
            <FaPlus /> Thêm địa chỉ
          </Button>
          <Button variant="danger" onClick={handleOpenTrash}>
            <FaTrashAlt /> Thùng rác
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên cửa hàng</th>
            <th>Số điện thoại</th>
            <th>Đường</th>
            <th>Phường/Xã</th>
            <th>Quận/Huyện</th>
            <th>Thành phố</th>
            <th>Mã bưu điện</th>
            <th>Mặc định</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paginatedStores.map((store) => (
            <tr key={store.id}>
              <td>{store.fullName}</td>
              <td>{store.phoneNumber}</td>
              <td>{store.street}</td>
              <td>{store.ward}</td>
              <td>{store.district}</td>
              <td>{store.city}</td>
              <td>{store.zipCode}</td>
              <td>{store.isDefault ? "Có" : "Không"}</td>
              <td className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(store)}
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(store.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination d-flex flex-row">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal Thêm cửa hàng */}
      <CreateStoreModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveStore}
      />

      {/* Modal Chỉnh sửa cửa hàng */}
      {currentStore && (
        <EditStoreModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          storeData={currentStore}
          onSave={handleUpdateStore}
        />
      )}
    </div>
  );
};

export default StoreList;