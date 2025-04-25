import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateTeamMemberModal from "./createmodal";
import EditTeamMemberModal from "./editmodal";
import teamService from "../../../functionservice/teamService"; // Adjust the path to your teamService file

const TeamMemberList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  // Fetch team members on component mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await teamService.getAllTeams();
        setTeamMembers(teams);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thành viên này không?")) {
      const updatedTeamMembers = teamMembers.filter((member) => member.id !== id);
      setTeamMembers(updatedTeamMembers);
      teamService.deleteTeam(id); // Add the call to delete member in backend
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
    setTeamMembers((prevMembers) => [...prevMembers, newMember]);
    setShowCreateModal(false);
  };

  const handleUpdate = (updatedMember) => {
    const updatedTeamMembers = teamMembers.map((member) =>
      member.id === updatedMember.id ? updatedMember : member
    );
    setTeamMembers(updatedTeamMembers);
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
            <th>mô tả</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.description || "N/A"}</td>
              <td>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: "50px", height: "50px" }} />
                ) : (
                  "N/A"
                )}
              </td>
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
