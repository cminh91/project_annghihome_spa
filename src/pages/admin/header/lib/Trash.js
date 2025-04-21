import React from "react";

const Trash = () => {
  const deletedHeaders = [
    {
      id: 101,
      logo: "https://via.placeholder.com/50",
      name: "Lê Thị C",
      email: "lethic@example.com",
      address: "789 Đường DEF, Quận 5",
      hotline: "0345 678 910",
      slogan: "Khách hàng là vua",
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Thùng rác - Header đã xoá</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-secondary">
          <tr>
            <th>Logo</th>
            <th>Liên hệ</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Hotline</th>
            <th>Slogan</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {deletedHeaders.length > 0 ? (
            deletedHeaders.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.logo} alt="logo" width="50" height="50" />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.hotline}</td>
                <td>{item.slogan}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-sm btn-success me-2">
                    <i className="bi bi-arrow-counterclockwise"></i> Khôi phục
                  </button>
                  <button className="btn btn-sm btn-danger">
                    <i className="bi bi-trash"></i> Xoá vĩnh viễn
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                Không có header nào trong thùng rác.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Trash;
