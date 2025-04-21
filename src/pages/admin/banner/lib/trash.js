import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaUndo, FaTrashAlt } from "react-icons/fa";

const TrashSliderList = () => {
  const [sliders, setSliders] = useState([
    {
      id: "1",
      title: "Slider 1",
      subtitle: "Subtitle 1",
      url: "https://via.placeholder.com/1000x500",
      isActive: true,
      order: 1,
      buttonText: "Learn More",
      mobileUrl: "https://via.placeholder.com/500x250",
      description: "Description for Slider 1",
      isDeleted: false,
    },
    {
      id: "2",
      title: "Slider 2",
      subtitle: "Subtitle 2",
      url: "https://via.placeholder.com/1000x500",
      isActive: false,
      order: 2,
      buttonText: "Buy Now",
      mobileUrl: "https://via.placeholder.com/500x250",
      description: "Description for Slider 2",
      isDeleted: false,
    },
  ]);

  const [deletedSliders, setDeletedSliders] = useState([
    {
      id: "3",
      title: "Slider 3",
      subtitle: "Subtitle 3",
      url: "https://via.placeholder.com/1000x500",
      isActive: true,
      order: 3,
      buttonText: "Read More",
      mobileUrl: "https://via.placeholder.com/500x250",
      description: "Description for Slider 3",
      isDeleted: true,
    },
  ]);

  // Khôi phục slider đã xóa
  const handleRestore = (id) => {
    const restoredSlider = deletedSliders.find((slider) => slider.id === id);
    if (restoredSlider) {
      setSliders((prevSliders) => [
        ...prevSliders,
        { ...restoredSlider, isDeleted: false },
      ]);
      setDeletedSliders((prev) =>
        prev.filter((slider) => slider.id !== id)
      );
    }
  };

  // Xóa vĩnh viễn slider
  const handlePermanentDelete = (id) => {
    const updatedDeletedSliders = deletedSliders.filter(
      (slider) => slider.id !== id
    );
    setDeletedSliders(updatedDeletedSliders);
  };

  return (
    <div>
      <h3>Thùng Rác - Slider List</h3>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Subtitle</th>
            <th>URL</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deletedSliders.map((slider) => (
            <tr key={slider.id}>
              <td>{slider.title}</td>
              <td>{slider.subtitle}</td>
              <td>
                <a href={slider.url} target="_blank" rel="noopener noreferrer">
                  {slider.url}
                </a>
              </td>
              <td>{slider.isActive ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleRestore(slider.id)}
                >
                  <FaUndo /> Restore
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handlePermanentDelete(slider.id)}
                >
                  <FaTrashAlt /> Permanent Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TrashSliderList;
