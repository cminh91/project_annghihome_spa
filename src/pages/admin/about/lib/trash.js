import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrashRestore, FaTrashAlt } from "react-icons/fa";

const AboutTrashList = ({ deletedItems = [], onRestore, onPermanentDelete }) => {
  return (
    <div>
      <h4 className="mb-3">🗑️ Thùng rác - Giới thiệu</h4>
      {deletedItems.length === 0 ? (
        <p>Không có mục nào trong thùng rác.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Nội dung</th>
              <th>Sứ mệnh</th>
              <th>Tầm nhìn</th>
              <th>Lịch sử</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {deletedItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.mission}</td>
                <td>{item.vision}</td>
                <td>{item.history}</td>
                <td className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => onRestore(item)}
                    className="me-2"
                  >
                    <FaTrashRestore /> Khôi phục
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      if (window.confirm("Xóa vĩnh viễn mục này?")) {
                        onPermanentDelete(item.id);
                      }
                    }}
                  >
                    <FaTrashAlt /> Xoá vĩnh viễn
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AboutTrashList;
