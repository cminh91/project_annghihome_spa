import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Table, Button } from "react-bootstrap";
=======
import { Table, Button, Spinner, Alert } from "react-bootstrap";
>>>>>>> main
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CreateTeamMemberModal from "./createmodal";
import EditTeamMemberModal from "./editmodal";
<<<<<<< HEAD
import teamService from "../../../functionservice/teamService"; // Adjust the path to your teamService file

const TeamMemberList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
=======
import teamService from "../../../functionservice/teamService"; // Import teamService

const TeamMemberList = () => {
  const [teamMembers, setTeamMembers] = useState([]); // Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

>>>>>>> main
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

<<<<<<< HEAD
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
=======
  // Function to fetch team members
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const data = await teamService.getAllTeams();
      setTeamMembers(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching team members:", err);
      setError("Không thể tải danh sách thành viên đội ngũ.");
    } finally {
      setLoading(false);
>>>>>>> main
    }
  };

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thành viên này không?")) {
      try {
        await teamService.deleteTeam(id);
        fetchTeamMembers(); // Refetch list after deletion
      } catch (err) {
        console.error("Error deleting team member:", err);
        setError("Không thể xóa thành viên đội ngũ.");
      }
    }
  };

  const handleEdit = (member) => { // Pass member object instead of id
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setShowCreateModal(true);
  };

<<<<<<< HEAD
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
=======
  const handleSave = async (newMemberData) => {
    try {
      await teamService.createTeam(newMemberData);
      fetchTeamMembers(); // Refetch list after creation
      setShowCreateModal(false);
    } catch (err) {
      console.error("Error creating team member:", err);
      setError("Không thể thêm thành viên đội ngũ.");
    }
  };

  const handleUpdate = async (updatedMemberData) => {
    try {
      await teamService.editTeam(selectedMember.id, updatedMemberData);
      fetchTeamMembers(); // Refetch list after update
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating team member:", err);
      setError("Không thể cập nhật thành viên đội ngũ.");
    }
>>>>>>> main
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

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
<<<<<<< HEAD
            <th>mô tả</th>
            <th>Hình ảnh</th>
=======
            <th>Hình ảnh</th>
            <th>Mô tả</th>
>>>>>>> main
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
<<<<<<< HEAD
              <td>{member.description || "N/A"}</td>
              <td>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: "50px", height: "50px" }} />
                ) : (
                  "N/A"
                )}
              </td>
=======
              <td>
              <img
                  src={member.image || "default-image-url.jpg"}
                  alt={member.name}
                  width="80"
                  className="rounded"
                />
              </td>
              <td>{member.description}</td>
>>>>>>> main
              <td className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(member)} // Pass member object
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
          onSave={handleUpdate}  
          member={selectedMember}
          
        />
      )}
    </div>
  );
};

export default TeamMemberList;
