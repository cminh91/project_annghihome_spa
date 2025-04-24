import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";
import serviceService from "../../../functionservice/serviceService"; // Import serviceService
import uploadService from "../../../functionservice/uploadService"; // Import uploadService

const ServiceModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    categoryId: "",
    description: "",
    longdescription: "",
    image: "", // Use 'image' for the main image URL
    price: "",
    salePrice: "",
  });
  const [selectedThumbnail, setSelectedThumbnail] = useState(null); // Use for the single image file
  const [categories, setCategories] = useState([]); // State to hold categories
  const [errors, setErrors] = useState({}); // State to hold validation errors

  useEffect(() => {
    if (show) {
      setFormData({
        name: "",
        slug: "",
        categoryId: "",
        description: "",
        longdescription: "",
        image: "",
        price: "",
        salePrice: "",
      });
      setSelectedThumbnail(null); // Reset selected file
      setErrors({}); // Reset errors when modal is opened
      fetchCategories(); // Fetch categories when modal is opened
    }
  }, [show]);

  const fetchCategories = async () => {
    try {
      // Fetch categories of type 'service'
      const data = await serviceService.getCategoriesByType('service');
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
    setFormData((prev) => ({ ...prev, longdescription: value })); // Use 'longdescription'
  };

  const handleImageUpload = (e) => { // Renamed from handleThumbnailUpload
    const file = e.target.files[0];
    if (file) {
      setSelectedThumbnail(file); // Store the file
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) })); // Use 'image'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Tên dịch vụ không được để trống.";
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

    let uploadedImageUrl = formData.image; // Use 'image'

    try {
      // Upload image if selected
      if (selectedThumbnail) {
        console.log('Uploading service image:', selectedThumbnail);
        const urls = await uploadService.uploadImages([selectedThumbnail]);
        console.log('Service image upload result:', urls);
        if (urls && urls.length > 0) {
          uploadedImageUrl = urls[0];
        }
      }

      // Create service with uploaded image URL
      const serviceData = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        categoryId: formData.categoryId || '', // Ensure categoryId is not empty string if null/undefined
        description: formData.description?.trim() || '',
        longdescription: formData.longdescription?.trim() || '',
        image: uploadedImageUrl || '',
        price: Number(formData.price),
        salePrice: Number(formData.salePrice) || 0, // Default salePrice to 0 if empty or not a valid number
      };

      console.log('Service data before saving:', serviceData);
      handleSave(serviceData);
      handleClose();
    } catch (error) {
      console.error('Error during service submission:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Thêm dịch vụ mới</Modal.Title> {/* Updated title */}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên dịch vụ</Form.Label> {/* Updated label */}
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
                <Form.Label>Giá</Form.Label> {/* Updated label */}
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
                <Form.Label>Giá khuyến mãi</Form.Label> {/* Updated label */}
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
                <Form.Label>Ảnh đại diện</Form.Label> {/* Updated label */}
                <Form.Control type="file" onChange={handleImageUpload} /> {/* Renamed handler */}
                {formData.image && typeof formData.image === 'string' && ( // Use 'image'
                  <img
                    src={formData.image} // Use 'image'
                    alt="Service Image" // Updated alt text
                    width={100}
                    className="mt-2 rounded"
                  />
                )}
              </Form.Group>
              {/* Removed additional images section */}
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
                <Form.Label>Mô tả chi tiết</Form.Label> {/* Updated label */}
                <DescriptionEditor
                  name="longdescription" // Use 'longdescription'
                  value={formData.longdescription} // Use 'longdescription'
                  onChange={handleEditorChange}
                />
              </Form.Group>

              {/* Removed checkbox group */}
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

export default ServiceModal;