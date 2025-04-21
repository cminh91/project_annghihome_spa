import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaUndo, FaTrashAlt } from "react-icons/fa";

const Trash = ({ teamMembers = [], setTeamMembers }) => {
  const trashMembers = teamMembers.filter(member => !member.isActive);

  const handleRestore = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn khôi phục thành viên này không?")) {
      setTeamMembers(teamMembers.map((member) =>
        member.id === id ? { ...member, isActive: true } : member
      ));
    }
  };

  const handleDeletePermanently = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn thành viên này không?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  return (
    <div>
      <h3>Thùng rác</h3>
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
          {trashMembers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">Không có thành viên nào trong thùng rác</td>
            </tr>
          ) : (
            trashMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.position}</td>
                <td>{member.bio}</td>
                <td className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleRestore(member.id)}
                    className="me-2"
                  >
                    <FaUndo /> Khôi phục
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeletePermanently(member.id)}
                  >
                    <FaTrashAlt /> Xóa vĩnh viễn
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Trash;
