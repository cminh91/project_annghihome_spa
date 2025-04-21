import React from "react";
import { Table, Button } from "react-bootstrap";

const Trash = ({ trashedProducts = [], handleRestore, handleDeleteForever }) => {
  return (
    <div className="p-3">
      <h4>Sản phẩm đã xoá</h4>
      {trashedProducts.length === 0 ? (
        <p className="text-muted">Không có sản phẩm nào trong thùng rác.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {trashedProducts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    style={{ width: "80px", height: "auto", objectFit: "cover" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()} đ</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="success" size="sm" onClick={() => handleRestore(item.id)}>
                      <i className="bi bi-arrow-counterclockwise"></i> Khôi phục
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteForever(item.id)}>
                      <i className="bi bi-x-circle"></i> Xoá vĩnh viễn
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

export default Trash;
