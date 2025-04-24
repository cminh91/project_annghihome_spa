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
    if (window.confirm("Are you sure you want to delete this slider?")) {
      try {
        await bannerService.deleteBanner(id);
        setSliders((prev) => prev.filter((slider) => slider.id !== id));
      } catch (error) {
        setError(error);
        console.error("Failed to delete slider:", error);
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
      console.error("Failed to create slider:", error);
      alert("Failed to create slider. Please check the console for details.");
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
    return <div>Loading...</div>; // Simple loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
        <h3>Slider List</h3>
        <Button variant="success me-2" onClick={handleAdd}>
          Add Slider
        </Button>
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
            <th>shortTitle</th>
            <th>longTitle</th>
            <th>Image</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentSliders.map((slider) => (
            <tr key={slider.id}>
              <td>{slider.shortTitle}</td>
              <td>{slider.longTitle}</td>
              <td>
                <img
                  src={slider.imageUrl || "default-image-url.jpg"}
                  alt={slider.shortTitle}
                  width="80"
                  className="rounded"
                />
              </td>
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
