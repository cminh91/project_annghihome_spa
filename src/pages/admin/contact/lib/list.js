import React, { useState } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ContactList = () => {
  // Dữ liệu cứng cho danh sách các liên hệ
  const [contacts] = useState([
    {
      id: "1",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0123456789",
      subject: "Hỏi về sản phẩm",
      message: "Tôi muốn biết thêm thông tin về sản phẩm A.",
      read: false,
      createdAt: "2025-04-12T08:30:00",
      updatedAt: "2025-04-12T09:00:00",
    },
    {
      id: "2",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0987654321",
      subject: "Vấn đề giao hàng",
      message: "Tôi chưa nhận được đơn hàng của mình.",
      read: true,
      createdAt: "2025-04-11T10:00:00",
      updatedAt: "2025-04-11T11:00:00",
    },
    // Thêm dữ liệu ở đây nếu cần
  ]);
  const navigate = useNavigate();
  const handleOpenTrash = () => {   
    navigate("/admin/contact/trash");
    };

  const handleMarkAsRead = (id) => {
    console.log(`Đánh dấu đã đọc liên hệ với ID: ${id}`);
    // Thêm logic cập nhật trạng thái 'read' ở đây
  };

  const handleDelete = (id) => {
    console.log(`Xóa liên hệ với ID: ${id}`);
    // Thêm logic xóa liên hệ ở đây
  };

  return (
    <Card className="p-4 mt-4 container">
      <h3 className="mb-3">Danh sách Liên hệ</h3>
      <div className="d-flex gap-2 ms-auto mb-3">
        <Button variant="danger" size="sm">
            <i className="bi bi-trash me-2" onClick={handleOpenTrash}>thùng rác</i>
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Chủ đề</th>
            <th>Nội dung</th>
            <th>Trạng thái</th>
            <th>Ngày gửi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.subject}</td>
              <td>{contact.message}</td>
              <td>
                {contact.read ? (
                  <span className="badge bg-success">Đã đọc</span>
                ) : (
                  <span className="badge bg-warning">Chưa đọc</span>
                )}
              </td>
              <td>{new Date(contact.createdAt).toLocaleString()}</td>
              <td>
                {!contact.read && (
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleMarkAsRead(contact.id)}
                  >
                    Đánh dấu đã đọc
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(contact.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default ContactList;
