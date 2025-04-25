import React, { useState, useEffect } from "react";
import serviceService from "../../../functionservice/serviceService"; // Import serviceService

const ServiceTrash = () => {
  const [trashedServices, setTrashedServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(6); // Có thể điều chỉnh số lượng dịch vụ trên mỗi trang
  const [totalServices, setTotalServices] = useState(0); // State to hold total number of trashed services

  // Fetch trashed services on component mount or when pagination/search changes
  useEffect(() => {
    const fetchTrashedServices = async () => {
      try {
        const servicesData = await serviceService.getTrashedServices(currentPage, servicesPerPage, searchTerm);
        console.log('Trashed services data:', servicesData);
        setTrashedServices(servicesData.services);
        setTotalServices(servicesData.total); // Set total trashed services from API
      } catch (error) {
        console.error("Failed to fetch trashed services:", error);
      }
    };

    fetchTrashedServices();
  }, [currentPage, servicesPerPage, searchTerm]); // Add dependencies

  const handleRestoreService = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn khôi phục dịch vụ này?");
    if (isConfirmed) {
      try {
        await serviceService.restoreService(id);
        // Remove the restored service from the list
        setTrashedServices(trashedServices.filter((serv) => serv.id !== id));
        // Optionally, refetch the list to update total count and pagination
        const servicesData = await serviceService.getTrashedServices(currentPage, servicesPerPage, searchTerm);
        setTrashedServices(servicesData.services);
        setTotalServices(servicesData.total);
      } catch (error) {
        console.error("Error restoring service:", error);
      }
    }
  };

  const handleForceDeleteService = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn dịch vụ này? Hành động này không thể hoàn tác.");
    if (isConfirmed) {
      try {
        await serviceService.forceDeleteService(id);
        // Remove the permanently deleted service from the list
        setTrashedServices(trashedServices.filter((serv) => serv.id !== id));
         // Optionally, refetch the list to update total count and pagination
        const servicesData = await serviceService.getTrashedServices(currentPage, servicesPerPage, searchTerm);
        setTrashedServices(servicesData.services);
        setTotalServices(servicesData.total);
      } catch (error) {
        console.error("Error force deleting service:", error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Thùng rác dịch vụ</h2> {/* Updated title */}
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm dịch vụ trong thùng rác" /* Updated placeholder */
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

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
          {trashedServices.length > 0 ? (
            trashedServices.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image || "default-image-url.jpg"} // Use image from API
                    alt={item.name}
                    width="80"
                    className="rounded"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td> {/* Display price */}
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success" /* Changed button color */
                      onClick={() => handleRestoreService(item.id)}
                    >
                      <i className="bi bi-arrow-counterclockwise"></i> {/* Restore icon */}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleForceDeleteService(item.id)}
                    >
                      <i className="bi bi-x-circle"></i> {/* Force delete icon */}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Thùng rác rỗng hoặc không có dịch vụ nào phù hợp với tìm kiếm
              </td> {/* Updated message */}
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
    </div>
  );
};

export default ServiceTrash;
