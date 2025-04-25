import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import categoryService from "../../../functionservice/categoryService";

const EditCategoryModal = ({ show, handleClose, handleSave, category }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState("product");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setSlug(category.slug || "");
      setType(category.type || "product");
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
      type,
      description,
      isActive,
      sortOrder: Number(sortOrder),
      level: Number(level),
    };

    try {
      const response = await categoryService.editCategory(category.id, updatedCategory);
      handleSave(response);
      handleClose();
    } catch (error) {
      console.error("Error updating category:", error.response?.data || error.message);
      alert("Không thể cập nhật danh mục. Vui lòng thử lại.");
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
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="number"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Thứ tự hiển thị</Form.Label>
            <Form.Control
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Hủy</Button>
        <Button variant="primary" onClick={handleSubmit}>Cập nhật</Button>
      </Modal.Footer>
    </Modal>
  );
};

<<<<<<< HEAD
export default EditCategoryModal;
=======
export default EditCategoryModal;
>>>>>>> main
