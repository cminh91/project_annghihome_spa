import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";
import categoryService from "../../../functionservice/categoryService"; //
import productService from "../../../functionservice/productService"; // Import categoryService
import uploadService from "../../../functionservice/uploadService"; // Import uploadService

const ProductModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    price: "",
    salePrice: "",
    imageUrl: "",
    categoryId: "", // Category ID will be stored here
    additionalImages: [],
  });
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [errors, setErrors] = useState({}); // State to hold validation errors

  useEffect(() => {
    if (show) {
      setFormData({
        name: "",
        slug: "",
        description: "",
        longDescription: "",
        price: "",
        salePrice: "",
        imageUrl: "",
        categoryId: "", // Reset category selection
        additionalImages: [],
      });
      setErrors({}); // Reset errors when modal is opened
      fetchCategories(); // Fetch categories when modal is opened
    }
  }, [show]);

  const fetchCategories = async () => {
    try {
      // Fetch categories of type 'product'
      const data = await productService.getCategoriesByType('product');
      setCategories(data); // Store categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to generate slug from the name
const generateSlug = (name) => {
  return name
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize Vietnamese characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[đĐ]/g, 'd') // Replace Vietnamese 'd' character
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .trim() // Remove leading/trailing spaces
    .replace(/\s+/g, '-') // Replace multiple spaces with single hyphen
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
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
    setSelectedThumbnail(file);
    setFormData((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  }
};

const handleImagesUpload = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 0) {
    setSelectedImages(files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, additionalImages: imageUrls }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống.";
    }
    if (!formData.slug.trim()) {
      newErrors.slug = "Slug không được để trống.";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Giá phải là số dương.";
    }
    if (formData.salePrice && Number(formData.salePrice) < 0) {
      newErrors.salePrice = "Giá khuyến mãi không được là số âm.";
    }
    if (formData.salePrice && Number(formData.salePrice) > Number(formData.price)) {
      newErrors.salePrice = "Giá khuyến mãi không được lớn hơn giá gốc.";
    }
    if (!formData.categoryId) {
      newErrors.categoryId = "Vui lòng chọn danh mục.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    setErrors({}); // Clear errors if validation passes

    let uploadedThumbnailUrl = formData.imageUrl;
    let uploadedImagesUrls = formData.additionalImages;

    try {
      // Upload thumbnail if selected
      if (selectedThumbnail) {
        const urls = await uploadService.uploadImages([selectedThumbnail]);
        if (urls && urls.length > 0) {
          uploadedThumbnailUrl = urls[0];
        }
      }

      // Upload images if selected
      if (selectedImages.length > 0) {
        const urls = await uploadService.uploadImages(selectedImages);
        if (urls && urls.length > 0) {
          uploadedImagesUrls = urls;
        }
      }

      // Create product with uploaded image URLs
      const productData = {
        ...formData,
        imageUrl: uploadedThumbnailUrl,
        additionalImages: uploadedImagesUrls
      };

      handleSave(productData);
      handleClose();
    } catch (error) {
      console.error('Error during product submission:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
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
                  isInvalid={!!errors.name}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  readOnly // Prevent manual editing of the slug
                  isInvalid={!!errors.slug}
                />
                 <Form.Control.Feedback type="invalid">
                  {errors.slug}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                />
                 <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Giá khuyến mãi</Form.Label>
                <Form.Control
                  name="salePrice"
                  type="number"
                  value={formData.salePrice}
                  onChange={handleChange}
                  isInvalid={!!errors.salePrice}
                />
                 <Form.Control.Feedback type="invalid">
                  {errors.salePrice}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control type="file" onChange={handleThumbnailUpload} />
                {formData.imageUrl && typeof formData.imageUrl === 'string' && (
                  <img
                    src={formData.imageUrl}
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
                  {Array.isArray(formData.additionalImages) && formData.additionalImages.map((img, idx) => (
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
                  isInvalid={!!errors.categoryId}
                >
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
                 <Form.Control.Feedback type="invalid">
                  {errors.categoryId}
                </Form.Control.Feedback>
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
