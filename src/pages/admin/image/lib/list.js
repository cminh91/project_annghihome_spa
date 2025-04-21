import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import CreateImageModal from "./createmodal";
import EditImageModal from "./editmodal";
import { useNavigate } from "react-router-dom";
const ImageList = () => {
  const [images, setImages] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    const mockImages = [
      {
        id: "1",
        url: "https://via.placeholder.com/100",
        alt: "Ảnh sản phẩm 1",
        productId: "p001",
        serviceId: null,
        newsId: null,
        aboutId: null,
      },
      {
        id: "2",
        url: "https://via.placeholder.com/100",
        alt: "Ảnh dịch vụ 1",
        productId: null,
        serviceId: "s001",
        newsId: null,
        aboutId: null,
      },
      {
        id: "3",
        url: "https://via.placeholder.com/100",
        alt: "Ảnh tin tức 1",
        productId: null,
        serviceId: null,
        newsId: "n001",
        aboutId: null,
      },
      {
        id: "4",
        url: "https://via.placeholder.com/100",
        alt: "Ảnh giới thiệu 1",
        productId: null,
        serviceId: null,
        newsId: null,
        aboutId: "a001",
      },
    ];
    setImages(mockImages);
  };

  const handleDelete = (id) => {
    const filtered = images.filter((img) => img.id !== id);
    setImages(filtered);
  };
  const handleOpenTrash = () => {
    navigate("/admin/image/trash");
  };

  const handleEdit = (image) => {
    setSelectedImage(image);
    setShowEditModal(true);
  };

  const handleSave = (newImage) => {
    const updatedImages = images.map((img) =>
      img.id === newImage.id ? { ...img, ...newImage } : img
    );
    setImages(updatedImages);
  };

  const handleSaveCreate = (newImage) => {
    const newId = (images.length + 1).toString();
    const imageWithId = { id: newId, ...newImage };
    setImages((prev) => [...prev, imageWithId]);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Danh sách Ảnh</h3>
        <div className=" d-flex gap-2">
            <Button variant="success" onClick={() => setShowCreateModal(true)}>
            Thêm ảnh
            </Button>
            <Button variant="danger" onClick={handleOpenTrash}>
            <i className=" bi bi-trash"> thùng rác</i>    
            </Button>
        </div>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Alt</th>
            <th>Sản phẩm</th>
            <th>Dịch vụ</th>
            <th>Tin tức</th>
            <th>Giới thiệu</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {images.map((img) => (
            <tr key={img.id}>
              <td>
                <img src={img.url} alt={img.alt} width={100} />
              </td>
              <td>{img.alt}</td>
              <td>{img.productId || "-"}</td>
              <td>{img.serviceId || "-"}</td>
              <td>{img.newsId || "-"}</td>
              <td>{img.aboutId || "-"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(img)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(img.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal thêm ảnh */}
      <CreateImageModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveCreate}
      />

      {/* Modal chỉnh sửa ảnh */}
      <EditImageModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSave}
        initialData={selectedImage}
      />
    </div>
  );
};

export default ImageList;
