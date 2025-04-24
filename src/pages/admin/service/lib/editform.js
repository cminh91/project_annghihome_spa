import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";
import serviceService from "../../../functionservice/serviceService"; // Import serviceService
import uploadService from "../../../functionservice/uploadService"; // Import uploadService

const EditServiceModal = ({ show, handleClose, handleSave, data }) => { // Receive 'data' prop
  const [formData, setFormData] = useState({
    id: "", // Add ID for editing
    name: "",
    slug: "",
    categoryId: "",
    description: "",
    longdescription: "",
    image: "",
    price: 0,
    salePrice: 0,
  });
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show && data) { // Populate form when modal is shown and data is available
      setFormData({
        id: data.id || "",
        name: data.name || "",
        slug: data.slug || "",
        categoryId: data.categoryId || "",
        description: data.description || "",
        longdescription: data.longdescription || "",
        image: data.image || "",
        price: data.price || "",
        salePrice: data.salePrice || "",
      });
      setSelectedThumbnail(null); // Reset selected file
      setErrors({}); // Reset errors
      fetchCategories(); // Fetch categories
    } else if (show && !data) {
       // Handle case where modal is shown but no data is passed (shouldn't happen with proper usage)
       console.warn("EditServiceModal opened without data.");
       setFormData({ // Reset form if no data
        id: "",
        name: "",
        slug: "",
        categoryId: "",
        description: "",
        longdescription: "",
        image: "",
        price: "",
        salePrice: "",
      });
      setSelectedThumbnail(null);
      setErrors({});
      fetchCategories();
    }
  }, [show, data]); // Depend on show and data

  const fetchCategories = async () => {
    try {
      const data = await serviceService.getCategoriesByType('service');
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name === "name") {
      const generatedSlug = generateSlug(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        slug: generatedSlug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, longdescription: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedThumbnail(file);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
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
      return;
    }

    setErrors({});

    let uploadedImageUrl = formData.image;

    try {
      // Upload image if a new one is selected
      if (selectedThumbnail) {
         console.log('Uploading updated service image:', selectedThumbnail);
        const urls = await uploadService.uploadImages([selectedThumbnail]);
        console.log('Updated service image upload result:', urls);
        if (urls && urls.length > 0) {
          uploadedImageUrl = urls[0];
        }
      }

      const serviceData = {
        id: formData.id, // Include ID for update
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        categoryId: formData.categoryId || '', // Ensure categoryId is not empty string if null/undefined
        description: formData.description?.trim() || '',
        longdescription: formData.longdescription?.trim() || '',
        image: uploadedImageUrl || '',
        price: Number(formData.price),
        salePrice: Number(formData.salePrice) || 0, // Default salePrice to 0 if empty or not a valid number
      };

      console.log('Service data before updating:', serviceData);
      handleSave(serviceData); // Call handleSave with updated data
      handleClose();
    } catch (error) {
      console.error('Error during service update submission:', error);
      // Handle error appropriately
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa dịch vụ</Modal.Title> {/* Updated title */}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Tên dịch vụ</Form.Label>
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
                <Form.Control type="file" onChange={handleImageUpload} />
                {formData.image && typeof formData.image === 'string' && (
                  <img
                    src={formData.image}
                    alt="Service Image"
                    width={100}
                    className="mt-2 rounded"
                  />
                )}
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
                  name="longdescription"
                  value={formData.longdescription}
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
              Lưu thay đổi
            </Button> {/* Updated button text */}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditServiceModal;