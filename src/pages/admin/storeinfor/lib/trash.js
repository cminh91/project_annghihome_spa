import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaUndo, FaTrash } from "react-icons/fa";

const TrashStoreInfo = ({ storeInfos, onRestore, onDeletePermanent }) => {
  const trashItems = storeInfos?.filter((item) => item.isActive === false) || [];

  return (
    <div>
      <h3>Thùng rác thông tin cửa hàng</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Hotline</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {trashItems.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">Không có dữ liệu</td>
            </tr>
          ) : (
            trashItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.hotline}</td>
                <td>
                  <Button variant="success" size="sm" onClick={() => onRestore(item.id)}>
                    <FaUndo /> Khôi phục
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => onDeletePermanent(item.id)}>
                    <FaTrash /> Xoá vĩnh viễn
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

export default TrashStoreInfo;
