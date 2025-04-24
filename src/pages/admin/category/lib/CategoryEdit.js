import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import categoryService from "../../../functionservice/categoryService";

const CategoryEdit = ({ show, handleClose, category, handleUpdate }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("product");
=======
import { Modal, Button, Form } from "react-bootstrap";
import categoryService from "../../../functionservice/categoryService";

const EditCategoryModal = ({ show, handleClose, handleSave, category }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("product"); // Added type field
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setSlug(category.slug || "");
<<<<<<< HEAD
      setType(category.type || "product");
      setDescription(category.description || "");
      setIsActive(category.isActive);
=======
      setType(category.type || "product"); // Initialize type
      setDescription(category.description || "");
      setIsActive(category.isActive ?? true);
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
      setSortOrder(category.sortOrder || 0);
      setLevel(category.level || 0);
    }
  }, [category]);

  const handleSubmit = async () => {
    const updatedCategory = {
      name,
      slug,
<<<<<<< HEAD
      type,
      description,
      isActive,
      sortOrder: Number(sortOrder),
      level: Number(level),
    };

    try {
      const result = await categoryService.editCategory(category.id, updatedCategory);
      handleUpdate(result);
      toast.success("Cập nhật danh mục thành công!");
=======
      type, // Added to payload
      description,
      isActive,
      sortOrder: Number(sortOrder),
      level: Number(level)
    };

    try {
      const response = await categoryService.editCategory(category.id, updatedCategory);
      handleSave(response);
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
      handleClose();
    } catch (error) {
      console.error("Error updating category:", error.response?.data || error.message);
      toast.error("Không thể cập nhật danh mục. Vui lòng thử lại.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </Col>
          </Row>

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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Loại</Form.Label>
              <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="product">Sản phẩm</option>
                <option value="service">Dịch vụ</option>
                <option value="post">Tin tức</option>
                <option value="video">Video</option>
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select value={isActive ? 1 : 0} onChange={(e) => setIsActive(Boolean(Number(e.target.value)))}>
                <option value={1}>Hiển thị</option>
                <option value={0}>Ẩn</option>
              </Form.Select>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  type="number"
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Thứ tự hiển thị</Form.Label>
            <Form.Control
              type="number"
<<<<<<< HEAD
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
=======
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
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
        <Button variant="primary" onClick={handleSubmit}>Cập nhật</Button>
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

export default CategoryEdit;
