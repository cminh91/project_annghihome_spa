import React from "react";

const Trash = () => {
  const deletedFooters = [
    {
      id: 101,
      logo: "https://via.placeholder.com/50",
      title: "An Nghi Home - Đã xoá",
      contact: "Email: daxoainfo@annghihome.vn\nSĐT: 0123 456 789",
      policy: "Chính sách đổi trả",
      fanpage: "https://facebook.com/annghihome-deleted",
      map: "https://maps.google.com/?q=deletedlocation",
      active: 0,
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Thùng rác - Footer đã xoá</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-secondary">
          <tr>
            <th>Logo</th>
            <th>Tiêu đề</th>
            <th>Liên hệ</th>
            <th>Chính sách</th>
            <th>Fanpage</th>
            <th>Bản đồ</th>
            <th>Hoạt động</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {deletedFooters.length > 0 ? (
            deletedFooters.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.logo}
                    alt="logo"
                    width="50"
                    height="50"
                    className="rounded border"
                  />
                </td>
                <td>{item.title}</td>
                <td>
                  {item.contact.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </td>
                <td>{item.policy}</td>
                <td>
                  <a href={item.fanpage} target="_blank" rel="noreferrer">
                    Fanpage
                  </a>
                </td>
                <td>
                  <a href={item.map} target="_blank" rel="noreferrer">
                    Xem bản đồ
                  </a>
                </td>
                <td className="text-center">{item.active}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-sm btn-success">
                    <i className="bi bi-arrow-counterclockwise me-1"></i> Khôi phục
                  </button>
                  <button className="btn btn-sm btn-danger">
                    <i className="bi bi-trash me-1"></i> Xoá vĩnh viễn
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                Không có footer nào trong thùng rác.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Trash;
