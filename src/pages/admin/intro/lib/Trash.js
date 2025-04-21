import React, { useState } from "react";
import { Table, Button, Image } from "react-bootstrap";

const IntroTrash = () => {
  const [deletedIntros, setDeletedIntros] = useState([
    {
      id: 1,
      title: "Giới thiệu dịch vụ chăm sóc mẹ",
      thumbnail: "https://via.placeholder.com/100",
      deletedAt: "2025-04-01",
    },
    {
      id: 2,
      title: "Về Momcare24h",
      thumbnail: "https://via.placeholder.com/100",
      deletedAt: "2025-04-05",
    },
  ]);

  const handleRestore = (id) => {
    setDeletedIntros(deletedIntros.filter((item) => item.id !== id));
    alert(`Đã khôi phục bài viết ID ${id}`);
  };

  const handlePermanentDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá vĩnh viễn bài viết này?")) {
      setDeletedIntros(deletedIntros.filter((item) => item.id !== id));
      alert(`Đã xoá vĩnh viễn bài viết ID ${id}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Thùng rác bài viết giới thiệu</h2>

      {deletedIntros.length === 0 ? (
        <p>Không có bài viết nào trong thùng rác.</p>
      ) : (
        <Table bordered hover className="mt-3">
          <thead className="table-danger">
            <tr>
              <th>Ảnh đại diện</th>
              <th>Tiêu đề</th>
              <th>Ngày xoá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {deletedIntros.map((intro) => (
              <tr key={intro.id}>
                <td>
                  <Image
                    src={intro.thumbnail}
                    alt={intro.title}
                    width="100"
                    rounded
                  />
                </td>
                <td>{intro.title}</td>
                <td>{intro.deletedAt}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="success" size="sm" onClick={() => handleRestore(intro.id)}>
                      <i className="bi bi-arrow-counterclockwise"></i> Khôi phục
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handlePermanentDelete(intro.id)}>
                      <i className="bi bi-trash-fill"></i> Xoá vĩnh viễn
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default IntroTrash;
