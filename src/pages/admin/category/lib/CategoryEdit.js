import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import slugify from "slugify";
import categoryService from "../../../functionservice/categoryService";  // Make sure to import the service

const EditCategoryModal = ({ show, handleClose, handleSave, category, parentOptions = [] }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [parentId, setParentId] = useState(null);
  const [contents, setContents] = useState([""]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setDescription(category.description || "");
      setOrder(category.order || 0);
      setIsActive(category.isActive ?? true);
      setParentId(category.parentId || null); // Set the parent category ID
      setContents(category.contents || [""]);
      setImages(
        (category.images || []).map((fileOrUrl) => ({
          file: null,
          preview: typeof fileOrUrl === "string" ? fileOrUrl : URL.createObjectURL(fileOrUrl),
        }))
      );
    }
  }, [category]);

  const handleAddImage = () => setImages([...images, null]);

  const handleRemoveImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = {
      file,
      preview: URL.createObjectURL(file),
    };
    setImages(updated);
  };

  const handleContentChange = (index, value) => {
    const updated = [...contents];
    updated[index] = value;
    setContents(updated);
  };

  const handleAddContent = () => setContents([...contents, ""]);

  const handleRemoveContent = (index) => {
    const updated = [...contents];
    updated.splice(index, 1);
    setContents(updated);
  };

  const handleSubmit = async () => {
    const updatedCategory = {
      name,
      slug: slugify(name, { lower: true, strict: true }),
      description,
      order: Number(order),
      isActive,
      parentId: parentId || null,
      contents,
      images: images.map((img) => img?.file || img?.preview).filter(Boolean),  // Ensure only files and previews are passed
    };

    try {
      // Call the editCategory method from categoryService to update the category
      const response = await categoryService.editCategory(category.id, updatedCategory);
      handleSave(response);  // Pass the updated category back to the parent component
      handleClose();  // Close the modal after saving
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
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Danh mục cha</Form.Label>
            <Form.Select
              value={parentId || ""}
              onChange={(e) => setParentId(e.target.value || null)}
            >
              <option value="">-- Không có --</option>
              {parentOptions
                .filter((opt) => opt.id !== category?.id)  // Prevent self-selection
                .map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

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
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Xoá
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline-primary" size="sm" onClick={handleAddImage}>
              + Thêm ảnh
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Bài viết</Form.Label>
            {contents.map((content, index) => (
              <div key={index} className="mb-2 d-flex gap-2 align-items-start">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={`Bài viết ${index + 1}`}
                  value={content}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                />
                {contents.length > 1 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleRemoveContent(index)}
                  >
                    Xoá
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline-primary" size="sm" onClick={handleAddContent}>
              + Thêm bài viết
            </Button>
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
    </Modal>
  );
};

export default EditCategoryModal;
