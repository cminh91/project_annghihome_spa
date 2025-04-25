import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CreateSliderModal from "./createmodal";
import EditSliderModal from "./editmodal";
import bannerService from "../../../functionservice/BannerService";

const SliderList = () => {
  const [sliders, setSliders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [slidersPerPage] = useState(3);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);    // Add error state

  useEffect(() => {
    const fetchSliders = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null);
      try {
        const data = await bannerService.getAllBanners();
        setSliders(data);
      } catch (error) {
        setError(error); // Set error state if fetch fails
        console.error("Failed to fetch sliders:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchSliders();
  }, []);

  const handleDelete = async (id) => {
    // Use Vietnamese confirmation message
    if (window.confirm("Bạn có chắc chắn muốn xóa slider này không?")) {
      try {
        await bannerService.deleteBanner(id);
        setSliders((prev) => prev.filter((slider) => slider.id !== id));
      } catch (error) {
        setError(error);
        // Add Vietnamese alert or keep console error
        console.error("Không thể xóa slider:", error);
        alert("Không thể xóa slider. Vui lòng kiểm tra console.");
      }
    }
  };

  const handleEdit = (slider) => {
    setSelectedSlider(slider);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedSlider(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSlider(null);
    setShowModal(false);
  };

  const handleSave = async (newSlider) => {
    try {
      const created = await bannerService.createBanner(newSlider);
      setSliders((prev) => [...prev, created]);
      handleCloseModal();
    } catch (error) {
      setError(error);
      console.error("Không thể tạo slider:", error);
      // Use Vietnamese alert
      alert("Không thể tạo slider. Vui lòng kiểm tra console.");
    }
  };

  const handleSaveEdit = (updatedSlider) => {
    setSliders(
      sliders.map((banner) =>
        banner.id === updatedSlider.id ? updatedSlider : banner
      )
    );
    setShowModal(false);
  };

  const filteredSliders = sliders
    .filter((slider) =>
      slider.shortTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  const indexOfLastSlider = currentPage * slidersPerPage;
  const indexOfFirstSlider = indexOfLastSlider - slidersPerPage;
  const currentSliders = filteredSliders.slice(indexOfFirstSlider, indexOfLastSlider);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    // Vietnamese loading text
    return <div>Đang tải...</div>;
  }

  if (error) {
    // Vietnamese error text
    return <div>Lỗi: {error.message || "Đã xảy ra lỗi không mong muốn."}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
        {/* Vietnamese title */}
        <h3>Danh Sách Slider</h3>
        {/* Vietnamese button text */}
        <Button variant="success me-2" onClick={handleAdd}>
          Thêm Slider
        </Button>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        // Vietnamese placeholder
        placeholder="Tìm kiếm Slider"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            {/* Vietnamese table headers */}
            <th>Tiêu đề ngắn</th>
            <th>Tiêu đề dài</th>
            <th>Hình ảnh</th>
            <th>Thứ tự</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentSliders.map((slider) => (
            <tr key={slider.id}>
              <td>{slider.shortTitle}</td>
              <td>{slider.longTitle}</td>
              <td>
                <img
                  // Use the actual image URL, provide a fallback if necessary
                  src={slider.imageUrl || "placeholder.jpg"} // Consider a local placeholder
                  alt={slider.shortTitle || "Hình ảnh slider"} // Vietnamese alt text
                  width="80"
                  className="rounded"
                />
              </td>
              <td>{slider.order}</td>
              <td>
                {/* Edit button */}
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(slider)}
                  className="me-2"
                  // Vietnamese tooltip/aria-label (optional)
                  title="Chỉnh sửa"
                >
                  <FaEdit />
                </Button>
                {/* Delete button */}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(slider.id)}
                  // Vietnamese tooltip/aria-label (optional)
                  title="Xóa"
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination remains the same logic, text is just numbers */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination d-flex flex-row">
          {Array.from({ length: Math.ceil(filteredSliders.length / slidersPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {showModal && (
        selectedSlider ? (
          <EditSliderModal
            show={showModal}
            onClose={handleCloseModal}
            onSave={handleSaveEdit}
            sliderData={selectedSlider}
          />
        ) : (
          <CreateSliderModal
            show={showModal}
            onClose={handleCloseModal}
            onSave={handleSave}
          />
        )
      )}
    </div>
  );
};

export default SliderList;
