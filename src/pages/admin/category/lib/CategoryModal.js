import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import slugify from "slugify";
import categoryService from "../../../functionservice/categoryService";

const CategoryModal = ({ show, handleClose, handleSave }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("product");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [level, setLevel] = useState(0);

  const handleSubmit = async () => {
    const newCategory = {
      name,
      slug: slug || slugify(name, { lower: true, strict: true }),
      type,
      description,
      isActive,
      sortOrder: Number(sortOrder),
      level: Number(level)
    };

    try {
      const result = await categoryService.createCategory(newCategory);
      handleSave(result);
      handleClose();
    } catch (error) {
      console.error('Lỗi khi lưu danh mục:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Thứ tự hiển thị</Form.Label>
            <Form.Control
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Level</Form.Label>
            <Form.Control
              type="number"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Check
              type="switch"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              label={isActive ? "Hiển thị" : "Ẩn"}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Loại danh mục</Form.Label>
            <Form.Select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="product">Sản phẩm</option>
              <option value="service">Dịch vụ</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
        <Button variant="primary" onClick={handleSubmit}>Lưu</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
