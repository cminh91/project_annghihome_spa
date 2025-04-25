<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceModal from "./createmodal"; // Import ServiceModal
import EditServiceModal from "./editmodal"; // Import EditServiceModal
import serviceService from "../../../functionservice/servicesFunction"; // Import serviceService
=======
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ServiceModal from "./createmodal";
import EditServiceModal from "./editmodal";
import serviceService from "../../../functionservice/serviceService";
>>>>>>> main

const ServiceList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
<<<<<<< HEAD
  const [showEditModal, setShowEditModal] = useState(null); // Keep track of the service to be edited
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(6); // Có thể điều chỉnh số lượng dịch vụ trên mỗi trang
  const [sortBy, setSortBy] = useState("createdAt"); // Default sort by createdAt
  const [sortOrder, setSortOrder] = useState("DESC"); // Default sort order DESC
  const [totalServices, setTotalServices] = useState(0); // State to hold total number of services

  // Fetch services on component mount or when pagination/search/sort changes
=======
  const [editService, setEditService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [totalServices, setTotalServices] = useState(0);
  const [error, setError] = useState(null);

  // Fetch services with memoized function
  const fetchServices = useCallback(async () => {
    try {
      setError(null);
      const servicesData = await serviceService.getAllServices(
        currentPage,
        servicesPerPage,
        searchTerm,
        sortBy,
        sortOrder
      );

      if (Array.isArray(servicesData)) {
        setServices(servicesData);
        setTotalServices(servicesData.length);
      } else if (servicesData?.services && Array.isArray(servicesData.services)) {
        setServices(servicesData.services);
        setTotalServices(servicesData.total || 0);
      } else {
        throw new Error("Unexpected API response format");
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
      setServices([]);
      setTotalServices(0);
      setError("Không thể tải danh sách dịch vụ. Vui lòng thử lại.");
    }
  }, [currentPage, servicesPerPage, searchTerm, sortBy, sortOrder]);

  // Fetch services on mount or when dependencies change
>>>>>>> main
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await serviceService.getAllServices(currentPage, servicesPerPage, searchTerm, sortBy, sortOrder);
        if (Array.isArray(servicesData)) { // Check if the result is an array
          setServices(servicesData); // Set services directly from the array
          setTotalServices(servicesData.length); // Set total based on array length
        } else if (servicesData && Array.isArray(servicesData.services)) { // Keep the old check for robustness
          setServices(servicesData.services);
          setTotalServices(servicesData.total || 0);
        } else {
          console.error("API did not return expected data format:", servicesData);
          setServices([]);
          setTotalServices(0);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setServices([]);
        setTotalServices(0);
      }
    };

    fetchServices();
<<<<<<< HEAD
  }, [currentPage, servicesPerPage, searchTerm, sortBy, sortOrder]); // Add dependencies

=======
  }, [fetchServices]);

  // Navigate to trash page
>>>>>>> main
  const handleOpenServiceTrash = () => {
    navigate("/admin/service/trash");
  };

<<<<<<< HEAD
  const handleOpenEditService = (service) => {
    setShowEditModal(service); // Set the service being edited
    setShowModal(true); // Show the modal for editing
  };

  const handleDeleteService = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?");
    if (isConfirmed) {
      try {
        await serviceService.deleteService(id);
        setServices(services.filter((serv) => serv.id !== id)); // Remove the deleted service from the list
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleSaveService = async (newService) => {
    try {
      await serviceService.createService(newService);
      setServices([newService, ...services]); // Add new service to the list directly
      setTotalServices(totalServices + 1); // Update the total service count
      setShowModal(false); // Close the modal after saving
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const handleUpdateService = async (updatedService) => {
    try {
      await serviceService.editService(updatedService.id, updatedService);
      setServices(services.map(service => service.id === updatedService.id ? updatedService : service)); // Update the service in the list directly
      setShowModal(false); // Close the modal after updating
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
=======
  // Open edit modal
  const handleOpenEditService = (service) => {
    setEditService(service);
    setShowModal(true);
  };

  // Delete service
  const handleDeleteService = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) return;

    try {
      await serviceService.deleteService(id);
      setServices((prev) => prev.filter((serv) => serv.id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      setError("Không thể xóa dịch vụ. Vui lòng thử lại.");
    }
  };

  // Save new service
  const handleSaveService = async (newService) => {
    try {
      await serviceService.createService(newService);
      await fetchServices();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating service:", error);
      setError("Không thể tạo dịch vụ. Vui lòng thử lại.");
    }
  };

  // Update existing service
  const handleUpdateService = async (updatedService) => {
    try {
      await serviceService.editService(updatedService.id, updatedService);
      await fetchServices();
      setShowModal(false);
      setEditService(null);
    } catch (error) {
      console.error("Error updating service:", error);
      setError("Không thể cập nhật dịch vụ. Vui lòng thử lại.");
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate image URL
  const getImageUrl = (image) => {
    if (!image) return "default-image-url.jpg";
    return image.startsWith("/")
      ? `${process.env.REACT_APP_API_BASE_URL}${image}`
      : image;
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalServices / servicesPerPage);
>>>>>>> main

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách dịch vụ</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary m-2"
<<<<<<< HEAD
            onClick={() => setShowModal(true)} // Open modal for adding service
=======
            onClick={() => {
              setEditService(null);
              setShowModal(true);
            }}
>>>>>>> main
          >
            <i className="bi bi-plus"></i> Thêm dịch vụ
          </button>
          <button className="btn btn-danger m-2" onClick={handleOpenServiceTrash}>
            <i className="bi bi-trash"></i> Thùng rác
          </button>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm dịch vụ"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

<<<<<<< HEAD
=======
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

>>>>>>> main
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Ảnh</th>
            <th>Tên dịch vụ</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
            {services.length > 0 ? (
              services.map((item) => (
              <tr>
                <td>
                  <img
                    src={item.image ? (item.image.startsWith('/') ? `${process.env.REACT_APP_API_BASE_URL}${item.image}` : item.image) : "default-image-url.jpg"}
=======
          {services.length > 0 ? (
            services.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={getImageUrl(item.image)}
>>>>>>> main
                    alt={item.name}
                    width="80"
                    className="rounded"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleOpenEditService(item)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteService(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
<<<<<<< HEAD

              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Không có dịch vụ nào phù hợp với tìm kiếm
                </td>
              </tr>
            )}
          </tbody>

      </table>

      {/* Pagination */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination d-flex flex-row">
          {/* Use totalServices from state for pagination */}
          {Array.from({ length: Math.ceil(totalServices / servicesPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Service Modal for adding or editing service */}
      {showEditModal ? (
        <EditServiceModal
          show={showModal}
          handleClose={() => setShowModal(false)} // Close modal
          handleSave={handleUpdateService} // Save updated service
          data={showEditModal} // Pass service for editing
        />
      ) : (
        <ServiceModal
          show={showModal}
          handleClose={() => setShowModal(false)} // Close modal
          handleSave={handleSaveService} // Save new service
        />
=======
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Không có dịch vụ nào phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {showModal && (
        <>
          {editService ? (
            <EditServiceModal
              show={showModal}
              handleClose={() => {
                setShowModal(false);
                setEditService(null);
              }}
              handleSave={handleUpdateService}
              data={editService}
            />
          ) : (
            <ServiceModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleSave={handleSaveService}
            />
          )}
        </>
>>>>>>> main
      )}
    </div>
  );
};

export default ServiceList;