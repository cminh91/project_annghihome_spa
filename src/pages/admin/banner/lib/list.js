import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import CreateSliderModal from "./createmodal";
import EditSliderModal from "./editmodal";
import { useNavigate } from "react-router-dom";
import bannerService from "../../../functionservice/BannerService";

const SliderList = () => {
  const [sliders, setSliders] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [slidersPerPage] = useState(3);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await bannerService.getAllBanners();
        setSliders(data);
      } catch (error) {
        console.error("Failed to fetch sliders:", error);
      }
    };
    fetchSliders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      try {
        await bannerService.deleteBanner(id);
        setSliders((prev) => prev.filter((slider) => slider.id !== id));
      } catch (error) {
        console.error("Failed to delete slider:", error);
      }
    }
  };

  const handleEdit = (slider) => {
    setSelectedSlider(slider);
    setShowEditModal(true);
  };

  const handleSave = async (newSlider) => {
    try {
      const created = await bannerService.createBanner(newSlider);
      setSliders((prev) => [...prev, created]);
      setShowCreateModal(false);
    } catch (error) {
      console.error("Failed to create slider:", error);
    }
  };

  const handleSaveEdit = async (updatedSlider) => {
    try {
      const updated = await bannerService.editBanner(updatedSlider.id, updatedSlider);
      setSliders((prev) =>
        prev.map((slider) => (slider.id === updated.id ? updated : slider))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update slider:", error);
    }
  };

  // Filter sliders based on search term and sort by isActive (active first)
  const filteredSliders = sliders
    .filter((slider) =>
      slider.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.isActive - a.isActive); // Sort by isActive (true first)

  // Paginate data
  const indexOfLastSlider = currentPage * slidersPerPage;
  const indexOfFirstSlider = indexOfLastSlider - slidersPerPage;
  const currentSliders = filteredSliders.slice(indexOfFirstSlider, indexOfLastSlider);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
        <h3>Slider List</h3>
        <div className="d-flex gap-2">
          <Button variant="success me-2" onClick={() => setShowCreateModal(true)}>
            Add Slider
          </Button>
        </div>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Sliders"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Image</th>
            <th>Status</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSliders.map((slider) => (
            <tr key={slider.id}>
              <td>{slider.title}</td>
              <td>{slider.subtitle}</td>
              <td>
                <img
                  src={slider.url || "default-image-url.jpg"}
                  alt={slider.title}
                  width="80"
                  className="rounded"
                />
              </td>
              <td>{slider.isActive ? "Hiển Thị" : "Ẩn"}</td>
              <td>{slider.order}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(slider)}
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(slider.id)}
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
          {Array.from({ length: Math.ceil(filteredSliders.length / slidersPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* CreateSliderModal */}
      <CreateSliderModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSave}
      />

      {/* EditSliderModal */}
      <EditSliderModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEdit}
        sliderData={selectedSlider}
      />
    </div>
  );
};

export default SliderList;
