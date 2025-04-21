import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ServiceForm from "./createmodal"; // Đảm bảo bạn đã tạo form này
import EditModal from "./editmodal";
import { useNavigate } from "react-router-dom";


const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const navigate = useNavigate(); // Để điều hướng đến trang khác nếu cần

  useEffect(() => {
    fetchServices();
    fetchCategories(); // Lấy danh sách danh mục
  }, []);

  // Dữ liệu cứng của các dịch vụ
  const fetchServices = () => {
    const servicesData = [
      { id: "1", title: "Chăm sóc sức khỏe", categoryId: "1", price: 500000, isActive: true },
      { id: "2", title: "Dịch vụ tư vấn", categoryId: "2", price: 300000, isActive: true },
      { id: "3", title: "Khám bệnh online", categoryId: "1", price: 150000, isActive: false },
    ];
    setServices(servicesData);
  };

  // Dữ liệu cứng của các danh mục
  const fetchCategories = () => {
    const categoriesData = [
      { id: "1", name: "Chăm sóc sức khỏe" },
      { id: "2", name: "Dịch vụ tư vấn" },
    ];
    setCategories(categoriesData);
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Thực hiện xóa dịch vụ (cập nhật lại mảng dịch vụ)
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };
  const handleOpenTrash = () => {
    navigate("/admin/service/trash"); // Điều hướng đến trang thùng rác
  }

  return (
    <div className="service-list">
      <h3>Danh sách Dịch vụ</h3>

      {/* Button to open the service form */}
        <div className="d-flex justify-content-end gap-2 mb-3">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                <i className="bi bi-plus-circle"></i> Thêm Dịch Vụ
            </Button>
            <Button variant="danger" onClick={handleOpenTrash}>
                <i className="bi bi-trash"></i> Thùng Rác
            </Button>
        </div>


      {/* Service List Table */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.title}</td>
              <td>{categories.find(cat => cat.id === service.categoryId)?.name || "Chưa có danh mục"}</td>
              <td>{service.price ? `${service.price} VND` : "Miễn phí"}</td>
              <td>{service.isActive ? "Hoạt động" : "Không hoạt động"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(service)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to Edit or Add Service */}
      {isModalOpen && (
        <ServiceForm
          initialData={selectedService}
          categories={categories}
          onSave={fetchServices} // Đảm bảo bạn sẽ xử lý lưu dữ liệu sau khi form được đóng
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ServiceList;
