import React, { useState } from "react";
<<<<<<< HEAD
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
=======
import { Modal, Button, Form } from "react-bootstrap";
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
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
<<<<<<< HEAD

  const resetForm = () => {
    setName("");
    setSlug("");
    setType("product");
    setDescription("");
    setIsActive(true);
    setSortOrder(0);
    setLevel(0);
  };
=======
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236

 
  
  const handleSubmit = async () => {
    const newCategory = {
      name,
      slug: slug || slugify(name, { lower: true, strict: true }),
      type,
      description,
      isActive,
      sortOrder: Number(sortOrder),
<<<<<<< HEAD
      level: Number(level),
=======
      level: Number(level)
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
    };

    try {
      const result = await categoryService.createCategory(newCategory);
      handleSave(result);
      handleClose();
    } catch (error) {
      console.error("Error creating category:", error.response?.data || error.message);
      toast.error("Không thể tạo danh mục. Vui lòng thử lại.");
    }
  };
<<<<<<< HEAD
  
=======
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <Form>
<<<<<<< HEAD
          {/* Tên & Slug */}
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
                placeholder="Tự động hoặc sửa"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </Col>
          </Row>
=======
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
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

<<<<<<< HEAD
          {/* Loại, Trạng thái, Level */}
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
                  onChange={(e) => setLevel(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Thứ tự hiển thị */}
=======
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
          <Form.Group className="mb-3">
            <Form.Label>Thứ tự hiển thị</Form.Label>
            <Form.Control
              type="number"
              value={sortOrder}
<<<<<<< HEAD
              onChange={(e) => setSortOrder(Number(e.target.value))}
            />
          </Form.Group>
=======
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
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
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
