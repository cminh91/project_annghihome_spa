import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateTeamMemberModal from "./createmodal";
import EditTeamMemberModal from "./editmodal";

const TeamMemberList = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "1",
      name: "John Doe",
      position: "CEO",
      bio: "Founder of XYZ company",
      image: "path_to_image",
      socialLinks: "https://facebook.com/johndoe",
      order: 1,
      isActive: true,
      createdAt: "2025-04-01T10:00:00",
      updatedAt: "2025-04-10T10:00:00",
    },
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thành viên này không?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  const handleEdit = (id) => {
    const member = teamMembers.find((member) => member.id === id);
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowCreateModal(true);
  };

  const handleSave = (newMember) => {
    setTeamMembers([...teamMembers, newMember]);
    setShowCreateModal(false);
  };

  const handleUpdate = (updatedMember) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
    setShowEditModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Danh sách thành viên nhóm</h3>
        <div className="d-flex gap-2 mb-3 mt-4">
          <Button variant="primary" onClick={handleAdd}>
            <FaPlus /> Thêm thành viên
          </Button>
          <Button variant="danger" onClick={() => navigate("/admin/team/trash")}>
            Thùng rác
          </Button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Chức vụ</th>
            <th>Bio</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.position}</td>
              <td>{member.bio}</td>
              <td className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(member.id)}
                  className="me-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateTeamMemberModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleSave}
      />
      {selectedMember && (
        <EditTeamMemberModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          member={selectedMember}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default TeamMemberList;
