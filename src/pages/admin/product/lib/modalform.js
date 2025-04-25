import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";
import productService from "../../../functionservice/productService";
import uploadService from "../../../functionservice/uploadService";

const ProductModal = ({ show, handleClose, handleSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    price: 0,
    salePrice: 0,
    imageUrl: "",
    categoryId: "",
    additionalImages: [],
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

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
        categoryId: "",
        additionalImages: [],
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
      });
      setSelectedThumbnail(null);
      setSelectedImages([]);
      setErrors({});
      fetchCategories();
    }
  }, [show, initialData]);

  const fetchCategories = async () => {
    try {
      const data = await productService.getCategoriesByType("product");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      const generatedSlug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generatedSlug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, longDescription: value }));
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedThumbnail(file);
    }
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên sản phẩm không được để trống.";
    if (!formData.slug.trim()) newErrors.slug = "Slug không được để trống.";
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = "Giá phải là số dương.";
    if (formData.salePrice && Number(formData.salePrice) < 0) newErrors.salePrice = "Giá khuyến mãi không được là số âm.";
    if (formData.salePrice && Number(formData.salePrice) > Number(formData.price)) newErrors.salePrice = "Giá khuyến mãi không được lớn hơn giá gốc.";
    if (!formData.categoryId) newErrors.categoryId = "Vui lòng chọn danh mục.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    let uploadedThumbnailUrl = "";
    let uploadedImagesUrls = [];

    try {
      if (selectedThumbnail) {
        const urls = await uploadService.uploadImages([selectedThumbnail]);
        if (urls && urls.length > 0) uploadedThumbnailUrl = urls[0];
      }

      if (selectedImages.length > 0) {
        const urls = await uploadService.uploadImages(selectedImages);
        if (urls && urls.length > 0) uploadedImagesUrls = urls;
      }

      const productData = {
        ...formData,
        imageUrl: uploadedThumbnailUrl,
        additionalImages: uploadedImagesUrls,
      };

      handleSave(productData);
      handleClose();
    } catch (error) {
      console.error("Error during product submission:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</Modal.Title>
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
                  readOnly
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
                <Form.Control type="text" onChange={handleThumbnailUpload} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Thư viện ảnh</Form.Label>
                <Form.Control type="text" multiple onChange={handleImagesUpload} />
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
