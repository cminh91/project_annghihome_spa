import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaUndo, FaTrashAlt } from "react-icons/fa";

const Trash = ({ partners = [], setPartners }) => {
  // Lọc các đối tác bị xóa (isActive = false)
  const trashPartners = partners.filter((partner) => !partner.isActive);

  const handleRestore = (id) => {
    if (window.confirm("Bạn có chắc muốn khôi phục đối tác này không?")) {
      const updatedPartners = partners.map((partner) =>
        partner.id === id ? { ...partner, isActive: true } : partner
      );
      setPartners(updatedPartners);
    }
  };

  const handleDeletePermanently = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn đối tác này không?")) {
      const updatedPartners = partners.filter((partner) => partner.id !== id);
      setPartners(updatedPartners);
    }
  };

  return (
    <div>
      <h3>Thùng rác Đối tác</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên đối tác</th>
            <th>Website</th>
            <th>Logo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {trashPartners.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                Không có đối tác nào trong thùng rác.
              </td>
            </tr>
          ) : (
            trashPartners.map((partner) => (
              <tr key={partner.id}>
                <td>{partner.name}</td>
                <td>{partner.website || "—"}</td>
                <td>
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      height="40"
                    />
                  ) : (
                    "Không có logo"
                  )}
                </td>
                <td className="d-flex justify-content-center">
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleRestore(partner.id)}
                  >
                    <FaUndo /> Khôi phục
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeletePermanently(partner.id)}
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
