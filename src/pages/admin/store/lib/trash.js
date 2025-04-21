import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaUndo, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Trash = () => {
  const [deletedStores, setDeletedStores] = useState([
    {
      id: "1",
      name: "Cửa hàng cũ",
      address: "456 Đường XYZ",
      city: "Hà Nội",
      province: "Hà Nội",
      phone: "0123456789",
      email: "cuaohangcux@example.com",
      openingHours: "9:00 - 17:00",
    },
  ]);

  const navigate = useNavigate();

  const handleRestore = (id) => {
    const restoredStore = deletedStores.find((store) => store.id === id);
    if (restoredStore) {
      // Quá trình khôi phục (thêm vào danh sách cửa hàng)
      setDeletedStores(deletedStores.filter((store) => store.id !== id));
      alert(`Khôi phục cửa hàng với ID: ${id}`);
    }
  };

  const handleDeleteForever = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn cửa hàng này?")) {
      setDeletedStores(deletedStores.filter((store) => store.id !== id));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Thùng rác</h3>
        <Button variant="secondary" onClick={() => navigate("/admin/store")}>
          Trở lại Danh sách
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Thành phố</th>
            <th>Tỉnh</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Giờ mở cửa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {deletedStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.city}</td>
              <td>{store.province}</td>
              <td>{store.phone}</td>
              <td>{store.email}</td>
              <td>{store.openingHours}</td>
              <td className="d-flex justify-content-center">
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleRestore(store.id)}
                >
                  <FaUndo /> Khôi phục
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteForever(store.id)}
                >
                  <FaTrashAlt /> Xóa vĩnh viễn
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Trash;
