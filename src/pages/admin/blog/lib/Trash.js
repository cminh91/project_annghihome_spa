import React, { useState } from "react";
import { Form, Button, Card, ListGroup } from "react-bootstrap";

const TrashForm = () => {
  // Dữ liệu cứng cho danh sách mục đã xóa
  const [deletedItems] = useState([
    {
      id: 1,
      title: "Bài viết về React",
      description: "Mô tả về bài viết liên quan đến React.",
    },
    {
      id: 2,
      title: "Bài viết về JavaScript",
      description: "Mô tả về bài viết liên quan đến JavaScript.",
    },
    {
      id: 3,
      title: "Bài viết về Node.js",
      description: "Mô tả về bài viết liên quan đến Node.js.",
    },
  ]);

  const handleRestore = (itemId) => {
    console.log(`Khôi phục bài viết với ID: ${itemId}`);
    // Thêm logic để phục hồi bài viết ở đây
  };

  const handleDeleteForever = (itemId) => {
    console.log(`Xóa vĩnh viễn bài viết với ID: ${itemId}`);
    // Thêm logic để xóa vĩnh viễn bài viết ở đây
  };

  return (
    <Card className="p-4 mt-4 container">
      <h3 className="mb-3">Danh sách Mục đã xóa</h3>
      <ListGroup variant="flush">
        {deletedItems.map((item) => (
          <ListGroup.Item key={item.id} className="d-flex justify-content-between">
            <div>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
            <div>
              <Button
                variant="success"
                size="sm"
                className="me-2"
                onClick={() => handleRestore(item.id)}
              >
                Khôi phục
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteForever(item.id)}
              >
                Xóa vĩnh viễn
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default TrashForm;
