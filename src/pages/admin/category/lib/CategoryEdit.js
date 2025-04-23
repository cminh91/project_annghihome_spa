import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import categoryService from "../../../functionservice/categoryService";

const EditCategoryModal = ({ show, handleClose, handleSave, category }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("product"); // Added type field
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setSlug(category.slug || "");
      setType(category.type || "product"); // Initialize type
      setDescription(category.description || "");
      setIsActive(category.isActive ?? true);
      setSortOrder(category.sortOrder || 0);
      setLevel(category.level || 0);
    }
  }, [category]);

  const handleSubmit = async () => {
    const updatedCategory = {
      name,
      slug,
      type, // Added to payload
      description,
      isActive,
      sortOrder: Number(sortOrder),
      level: Number(level)
    };

    try {
      const response = await categoryService.editCategory(category.id, updatedCategory);
      handleSave(response);
      handleClose();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Sửa danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên danh mục"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Mô tả danh mục"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Thứ tự hiển thị</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Level</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Check
              type="switch"
              id="isActive-switch"
              label={isActive ? "Hiển thị" : "Ẩn"}
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
      
      {/* Add type selection (same as in CategoryModal.js) */}
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
    </Modal>
  );
};

export default EditCategoryModal;
