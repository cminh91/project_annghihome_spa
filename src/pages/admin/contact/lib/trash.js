import React, { useState } from "react";
import { Table, Button, Card } from "react-bootstrap";

const TrashList = () => {
  // Dữ liệu cứng cho các liên hệ đã bị xóa
  const [deletedContacts] = useState([
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123456789",
      subject: "Hỏi về sản phẩm",
      message: "Tôi muốn biết thêm thông tin về sản phẩm A.",
      deletedAt: "2025-04-12T08:30:00",
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0987654321",
      subject: "Vấn đề giao hàng",
      message: "Tôi chưa nhận được đơn hàng của mình.",
      deletedAt: "2025-04-11T10:00:00",
    },
    // Thêm dữ liệu ở đây nếu cần
  ]);

  const handleRestore = (id) => {
    console.log(`Phục hồi liên hệ với ID: ${id}`);
    // Thêm logic phục hồi liên hệ ở đây
  };

  const handleDeletePermanently = (id) => {
    console.log(`Xóa hoàn toàn liên hệ với ID: ${id}`);
    // Thêm logic xóa hoàn toàn liên hệ ở đây
  };

  return (
    <Card className="p-4 mt-4 container">
      <h3 className="mb-3">Danh sách Liên hệ đã xóa</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Chủ đề</th>
            <th>Nội dung</th>
            <th>Ngày xóa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {deletedContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.deletedAt).toLocaleString()}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleRestore(contact.id)}
                >
                  Phục hồi
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeletePermanently(contact.id)}
                >
                  Xóa vĩnh viễn
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default TrashList;
