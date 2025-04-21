import React, { useState } from "react";
import { Modal, Button, Form, Image, Row, Col } from "react-bootstrap";
import slugify from "slugify";
import categoryService from "../../../functionservice/categoryService";


const CategoryModal = ({ show, handleClose, handleSave, parentOptions = [] }) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("PRODUCT");
  const [parentId, setParentId] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState(1);
  const [contents, setContents] = useState([""]);
  const [images, setImages] = useState([]);

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setType("");
    setParentId(0);
    setOrder(0);
    setStatus(1);
    setContents([""]);
    setImages([]);
  };

  const handleAddImage = () => {
    setImages((prevImages) => [...prevImages, null]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (index, file) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = { file, preview: URL.createObjectURL(file) };
      return updatedImages;
    });
  };

  const handleContentChange = (index, value) => {
    setContents((prevContents) => {
      const updatedContents = [...prevContents];
      updatedContents[index] = value;
      return updatedContents;
    });
  };

  const handleAddContent = () => {
    setContents((prevContents) => [...prevContents, ""]);
  };

  const handleRemoveContent = (index) => {
    setContents((prevContents) => prevContents.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const newCategory = {
      name,
      slug: slug || slugify(name, { lower: true, strict: true }),
      description,
      type,
      parentId: parentId || 0,
      order: Number(order),
      isActive: status === 1,
      contents,
      images: images.map((img) => img?.file).filter(Boolean),
    };
  
    try {
      const result = await categoryService.createCategory(newCategory);
      handleSave(result); // Sau khi lưu thành công, gọi handleSave để cập nhật UI
      handleClose();
      resetForm();
    } catch (error) {
      console.error('Lỗi khi lưu danh mục:', error);
    }
  };
  
  
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Tên & Slug */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) {
                    setSlug(slugify(e.target.value, { lower: true, strict: true }));
                  }
                }}
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

          {/* Mô tả */}
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Mô tả ngắn"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Danh mục cha & Kiểu & Trạng thái */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Danh mục cha</Form.Label>
              <Form.Select value={parentId} onChange={(e) => setParentId(e.target.value)}>
                <option value="">cấp cha</option>
                {parentOptions.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Loại</Form.Label>
              <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="PRODUCT">Sản phẩm</option>
                <option value="SERVICE">Dịch vụ</option>
                <option value="NEWS">Tin Tức</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(+e.target.value)}>
                <option value={1}>Hiển thị</option>
                <option value={0}>Ẩn</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Thứ tự */}
          <Form.Group className="mb-3">
            <Form.Label>Thứ tự hiển thị</Form.Label>
            <Form.Control
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </Form.Group>

          {/* Ảnh */}
          <Form.Group className="mb-3">
            <Form.Label>Ảnh (ảnh đầu tiên là đại diện)</Form.Label>
            {images.map((img, index) => (
              <div key={index} className="d-flex align-items-center mb-2 gap-2">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleImageChange(index, file);
                  }}
                />
                {img?.preview && (
                  <Image
                    src={img.preview}
                    height={40}
                    rounded
                    style={{ width: "100px", objectFit: "cover" }}
                  />
                )}
                {images.length > 1 && (
                  <Button variant="outline-danger" size="sm" onClick={() => handleRemoveImage(index)}>
                    Xoá
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline-primary" size="sm" onClick={handleAddImage}>
              + Thêm ảnh
            </Button>
          </Form.Group>

          {/* Bài viết */}
          <Form.Group className="mb-3">
            <Form.Label>Nội dung bài viết</Form.Label>
            {contents.map((content, index) => (
              <div key={index} className="mb-2 d-flex gap-2 align-items-start">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder={`Bài viết ${index + 1}`}
                />
                {contents.length > 1 && (
                  <Button variant="outline-danger" size="sm" onClick={() => handleRemoveContent(index)}>
                    Xoá
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline-primary" size="sm" onClick={handleAddContent}>
              + Thêm bài viết
            </Button>
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
