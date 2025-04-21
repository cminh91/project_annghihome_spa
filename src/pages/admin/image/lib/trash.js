import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrashAlt, FaUndo, FaTrash } from "react-icons/fa";
import { getTrashedImages, restoreImage, deleteImagePermanently } from "../../../functionservice/imageFunction";
const ImageTrash = () => {
  const [trashedImages, setTrashedImages] = useState([]);

  useEffect(() => {
    fetchTrashedImages();
  }, []);

  const fetchTrashedImages = async () => {
    try {
      const response = await getTrashedImages(); // Call to fetch trashed images from API
      setTrashedImages(response.data); // Set the data to state
    } catch (error) {
      console.error("Error fetching trashed images:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreImage(id); // Function to restore image
      fetchTrashedImages(); // Reload trashed images after restoring
    } catch (error) {
      console.error("Error restoring image:", error);
    }
  };

  const handleDeletePermanently = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá vĩnh viễn?")) return;
    try {
      await deleteImagePermanently(id); // Function to delete image permanently
      fetchTrashedImages(); // Reload trashed images after permanent deletion
    } catch (error) {
      console.error("Error permanently deleting image:", error);
    }
  };

  return (
    <div>
      <h3>Ảnh đã xoá</h3>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Alt</th>
            <th>Sản phẩm</th>
            <th>Dịch vụ</th>
            <th>Tin tức</th>
            <th>Giới thiệu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {trashedImages.length > 0 ? (
            trashedImages.map((image) => (
              <tr key={image.id}>
                <td>
                  <img src={image.url} alt={image.alt} width={100} />
                </td>
                <td>{image.alt}</td>
                <td>{image.productId || "-"}</td>
                <td>{image.serviceId || "-"}</td>
                <td>{image.newsId || "-"}</td>
                <td>{image.aboutId || "-"}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleRestore(image.id)}
                  >
                    <FaUndo /> Khôi phục
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeletePermanently(image.id)}
                  >
                    <FaTrash /> Xoá vĩnh viễn
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Không có ảnh nào trong thùng rác.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ImageTrash;
