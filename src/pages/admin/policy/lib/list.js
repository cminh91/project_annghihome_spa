import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import CreatePolicyModal from "./createmodal"; // Modal tạo mới chính sách
import EditPolicyModal from "./editmodal"; // Modal chỉnh sửa chính sách
import { useNavigate } from "react-router-dom";

const PolicyList = () => {
  const [policies, setPolicies] = useState([
    {
      id: "1",
      title: "Chính sách 1",
      slug: "chinh-sach-1",
      content: "Nội dung chính sách 1",
      excerpt: "Tóm tắt chính sách 1",
      isPublished: true,
      isActive: true,
      createdAt: "2025-04-13T10:00:00",
      updatedAt: "2025-04-13T10:00:00",
    },
    {
      id: "2",
      title: "Chính sách 2",
      slug: "chinh-sach-2",
      content: "Nội dung chính sách 2",
      excerpt: "Tóm tắt chính sách 2",
      isPublished: true,
      isActive: true,
      createdAt: "2025-04-13T11:00:00",
      updatedAt: "2025-04-13T11:00:00",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const navigate = useNavigate();

  const handleCreatePolicy = (newPolicy) => {
    setPolicies([...policies, newPolicy]);
    setShowCreateModal(false);
  };

  const handleEditPolicy = (updatedPolicy) => {
    setPolicies(
      policies.map((policy) =>
        policy.id === updatedPolicy.id ? updatedPolicy : policy
      )
    );
    setShowEditModal(false);
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa chính sách này?")) {
      setPolicies(policies.filter((policy) => policy.id !== id));
    }
  };

  const handleOnTrash = () => {
    navigate("/admin/policy/trash");
  };

  return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Danh sách Chính sách</h3>
            <div className="d-flex gap-2 mt-4">
                <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                <FaPlus /> Thêm Chính sách
                </Button>
                <Button variant="danger" onClick={handleOnTrash}>
                <FaTrashAlt /> Thùng rác
                </Button>
            </div>
        </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Slug</th>
            <th>Tóm tắt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr key={policy.id}>
              <td>{policy.title}</td>
              <td>{policy.slug}</td>
              <td>{policy.excerpt}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setSelectedPolicy(policy);
                    setShowEditModal(true);
                  }}
                  className="me-2"
                >
                  <FaEdit /> Chỉnh sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeletePolicy(policy.id)}
                >
                  <FaTrashAlt /> Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Thêm Chính sách */}
      <CreatePolicyModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreatePolicy}
      />

      {/* Modal Chỉnh Sửa Chính sách */}
      <EditPolicyModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        policy={selectedPolicy}
        onUpdate={handleEditPolicy}
      />
    </div>
  );
};

export default PolicyList;
