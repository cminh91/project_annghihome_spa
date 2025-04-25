  "use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import CreateAboutModal from "./createmodal";
import EditAboutModal from "./editmodal";
import { useNavigate } from "react-router-dom";
import aboutService from "../../../functionservice/aboutService";

const AboutList = () => {
  const [aboutItems, setAboutItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const data = await aboutService.getAllAbout();
        setAboutItems(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách About:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbouts();
  }, []);

  const handleSaveAbout = async (newAbout) => {
    try {
      const created = await aboutService.createAbout(newAbout);
      setAboutItems((prev) => [...prev, created]);
    } catch (error) {
      console.error("Lỗi khi tạo mới:", error);
    }
  };

  const handleUpdateAbout = async (updatedItem) => {
    try {
      const updated = await aboutService.updateAbout(updatedItem.id, updatedItem);
      setAboutItems((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mục này?")) {
      try {
        await aboutService.deleteAbout(id);
        setAboutItems((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedAbout(item);
    setShowEditModal(true);
  };
  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3 mt-4">
        <h3>Danh sách Giới thiệu</h3>
        <div className="d-flex gap-2">
          <Button variant="primary me-2" onClick={() => setShowCreateModal(true)}>
            <FaPlus /> Thêm mục
          </Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sứ mệnh</th>
            <th>Tầm nhìn</th>
            <th>Lịch sử</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {aboutItems.map((item) => (
            <tr key={item.id}>
              <td dangerouslySetInnerHTML={{ __html: item.mission }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.vision }}></td>
              <td dangerouslySetInnerHTML={{ __html: item.history }}></td>
              <td className="d-flex justify-content-center align-items-center">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(item)}
                  className="me-2"
                >
                <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Modal */}
      <CreateAboutModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSaveAbout}
      />

      {/* Edit Modal */}
      <EditAboutModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdateAbout}
        aboutData={selectedAbout}
      />
    </div>
  );
};

export default AboutList;
