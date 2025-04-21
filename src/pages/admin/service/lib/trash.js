import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import {
  getTrashedServices,
  restoreService,
  deleteServicePermanently,
} from "../../../functionservice/servicesFunction";

const ServiceTrash = () => {
  const [trashedServices, setTrashedServices] = useState([]);

  useEffect(() => {
    fetchTrashedServices();
  }, []);

  const fetchTrashedServices = async () => {
    try {
      const response = await getTrashedServices();
      setTrashedServices(response.data); // Dữ liệu từ API
    } catch (error) {
      console.error("Lỗi lấy dịch vụ đã xoá:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreService(id);
      fetchTrashedServices();
    } catch (error) {
      console.error("Lỗi khôi phục:", error);
    }
  };

  const handleDeletePermanently = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá vĩnh viễn?")) return;
    try {
      await deleteServicePermanently(id);
      fetchTrashedServices();
    } catch (error) {
      console.error("Lỗi xoá vĩnh viễn:", error);
    }
  };

  return (
    <div>
      <h3>Dịch vụ đã xoá</h3>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {trashedServices.length > 0 ? (
            trashedServices.map((service) => (
              <tr key={service.id}>
                <td>{service.title}</td>
                <td>{service.categoryId}</td>
                <td>{service.price || "Miễn phí"}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleRestore(service.id)}
                  >
                    Khôi phục
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeletePermanently(service.id)}
                  >
                    Xoá vĩnh viễn
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Không có dịch vụ nào trong thùng rác.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ServiceTrash;
