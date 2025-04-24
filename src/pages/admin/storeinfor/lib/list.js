import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CreateStoreModal from "./createmodal";
import EditStoreModal from "./editmodal";
import storeinfnorService from "../../../functionservice/storeinforService";

const ListStoreInfo = () => {
  const [storeInfos, setStoreInfos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Fetch all store info on component mount
  useEffect(() => {
    const fetchStoreInfos = async () => {
      setLoading(true);
      try {
        const data = await storeinfnorService.getAllStoreinfo();
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

  const handleAdd = () => {
    setShowCreateModal(true);
  };

  const handleEdit = (store) => {
    setSelectedStore(store);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa cửa hàng này không?")) {
      try {
        await storeinfnorService.deleteStoreinfo(id);
        setStoreInfos(storeInfos.filter((info) => info.id !== id));
        setError(null);
      } catch (err) {
        setError("Không thể xóa cửa hàng. Vui lòng thử lại.");
        console.error(err);
      }
    }
  };

  const handleSave = async (newStore) => {
    try {
      const savedStore = await storeinfnorService.createStoreinfo(newStore);
      setStoreInfos([...storeInfos, savedStore]);
      setShowCreateModal(false);
      setError(null);
    } catch (err) {
      setError("Không thể thêm cửa hàng. Vui lòng thử lại.");
      console.error(err);
    }
  };

  const handleUpdate = async (updatedStore) => {
    try {
      const savedStore = await storeinfnorService.editStoreinfo(updatedStore.id, updatedStore);
      setStoreInfos(
        storeInfos.map((info) => (info.id === savedStore.id ? savedStore : info))
      );
      setShowEditModal(false);
      setSelectedStore(null);
      setError(null);
    } catch (err) {
      setError("Không thể cập nhật cửa hàng. Vui lòng thử lại.");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Danh sách thông tin cửa hàng</h3>
        <div>
          <Button variant="primary" onClick={handleAdd} className="me-2" disabled={loading}>
            <FaPlus /> Thêm thông tin cửa hàng
          </Button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="text-center">Đang tải...</div>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Favicon</th>
            <th>facebook</th>
            <th>youtube</th>
            <th>hotline</th>
            <th>zalo</th>
            <th>workingHours</th>
            <th>googleMap</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {storeInfos.length === 0 && !loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            storeInfos.map((info) => (
              <tr key={info.id}>
                <td>
                  <img
                    src={info.logo}
                    alt={`logo`}
                    style={{ width: "50px", height: "auto" }} // Adjust the size as needed
                  />
                </td>
                <td>
                  <img
                    src={info.favicon}
                    alt={`favicon`}
                    style={{ width: "30px", height: "auto" }} // Adjust the size as needed
                  />
                </td>
                <td>
                  <img
                    src={info.facebook}
                    alt={`facebook`}
                    style={{ width: "50px", height: "auto" }} // Adjust the size as needed
                  />
                </td>
                <td>
                  <img
                    src={info.youtube}
                    alt={`youtube`}
                    style={{ width: "50px", height: "auto" }} // Adjust the size as needed
                  />
                </td>
                <td>
                  <img
                    src={info.googleMap}
                    alt={`googleMap`}
                    style={{ width: "50px", height: "auto" }} // Adjust the size as needed
                  />
                </td>
                <td>
                  <img
                    src={info.hotline}
                    alt={`hotline`}
                    style={{ width: "50px", height: "auto" }} // Adjust the size as needed
                  />
                </td>
                <td>
                  <img
                    src={info.zalo}
                    alt={`zalo`}
                    style={{ width: "50px", height: "auto" }} // Adjust the size as needed
                  />
                </td>
                <td>
                  <img
                    src={info.workingHours}
                    alt={`workingHours`}
                    style={{ width: "50px", height: "auto" }} // Adjust the size as needed
                  />
                </td>

                <td className="d-flex justify-content-center">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(info)}
                    className="me-2"
                    disabled={loading}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(info.id)}
                    disabled={loading}
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
          onClose={() => {
            setShowEditModal(false);
            setSelectedStore(null);
          }}
          store={selectedStore}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ListStoreInfo;