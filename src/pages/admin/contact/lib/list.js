import React, { useState, useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import contactService from "../../../functionservice/contactService"; // Import contactService

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("jwt-token");
    if (!token) {
      console.warn("User is not logged in. Redirecting to login...");
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    // Fetch contacts when the component mounts
    const fetchContacts = async () => {
      try {
        const data = await contactService.getAllContact();
        setContacts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch contacts");
        setLoading(false);
      }
    };

    fetchContacts();
  }, [navigate]);

  const handleOpenTrash = () => {
    navigate("/admin/contact/trash");
  };

  const handleMarkAsRead = async (id) => {
    console.log(`Marking contact ID ${id} as read`);
    // Logic to update 'read' status here
  };

  const handleDelete = async (id) => {
    console.log(`Deleting contact ID ${id}`);
    try {
      await contactService.deleteContact(id);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete contact");
    }
  };

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Card className="p-4 mt-4 container">
      <h3 className="mb-3">Danh sách Liên hệ</h3>
      <div className="d-flex gap-2 ms-auto mb-3">
        <Button variant="danger" size="sm" onClick={handleOpenTrash}>
          <i className="bi bi-trash me-2"></i> Thùng rác
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