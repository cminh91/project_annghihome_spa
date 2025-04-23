import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";
import categoryService from "../../../functionservice/categoryService"; //
import productService from "../../../functionservice/productService"; // Import categoryService

const ProductModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    price: "",
    salePrice: "",
    inStock: true,
    featured: false,
    isActive: true,
    categoryId: "", // Category ID will be stored here
    specs: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    thumbnail: "",
    images: [],
  });

  const [categories, setCategories] = useState([]); // State to hold categories

  useEffect(() => {
    if (show) {
      setFormData({
        name: "",
        slug: "",
        description: "",
        longDescription: "",
        price: "",
        salePrice: "",
        inStock: true,
        featured: false,
        isActive: true,
        categoryId: "", // Reset category selection
        specs: "",
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        thumbnail: "",
        images: [],
      });
      fetchCategories(); // Fetch categories when modal is opened
    }
  }, [show]);

  const fetchCategories = async () => {
    try {
      const data = await productService.createProduct(); // Fetch categories from API
      setCategories(data); // Store categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to generate slug from the name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]/g, ""); // Remove any special characters
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name === "name") {
      // Automatically generate the slug when the name is changed
      const generatedSlug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generatedSlug, // Update slug
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, longDescription: value }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, thumbnail: url }));
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, images: urls }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  readOnly // Prevent manual editing of the slug
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giá khuyến mãi</Form.Label>
                <Form.Control
                  name="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control type="file" onChange={handleThumbnailUpload} />
                {formData.thumbnail && (
                  <img
                    src={formData.thumbnail}
                    alt="Thumbnail"
                    width={100}
                    className="mt-2 rounded"
                  />
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Thư viện ảnh</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleImagesUpload}
                />
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {formData.images.map((img, idx) => (
                    <img key={idx} src={img} alt="img" width={80} className="rounded" />
                  ))}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Danh mục</Form.Label>
                <Form.Control
                  as="select"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả ngắn</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả chi tiết</Form.Label>
                <DescriptionEditor
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleEditorChange}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  label="Còn hàng"
                />
                <Form.Check
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  label="Nổi bật"
                />
                <Form.Check
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  label="Hiển thị"
                />
              </Form.Group> */}
            </Col>
          </Row>

          <hr />

          <h5>SEO</h5>
          <Form.Group className="mb-2">
            <Form.Label>Meta Title</Form.Label>
            <Form.Control
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Meta Description</Form.Label>
            <Form.Control
              as="textarea"
              name="metaDescription"
              rows={2}
              value={formData.metaDescription}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Meta Keywords</Form.Label>
            <Form.Control
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
            />
          </Form.Group>

          <hr />

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Lưu
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
