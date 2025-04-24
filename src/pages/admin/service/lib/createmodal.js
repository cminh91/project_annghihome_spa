import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor";
import serviceService from "../../../functionservice/serviceService";
import uploadService from "../../../functionservice/uploadService"; // Changed import back to default

const ServiceForm = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "", // Changed from title
    slug: "",
    description: "",
    longdescription: "", // Changed from longDescription
    image: "", // Added image field
    price: "",
    salePrice: "", // Added salePrice field
    categoryId: "",
  });

  const [selectedImage, setSelectedImage] = useState(null); // State for selected image file
  const [categories, setCategories] = useState([]); // State for categories

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        // Assuming 'service' is the type for service categories
        const fetchedCategories = await serviceService.getCategoriesByType('service');
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();

    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
      });
    }
  }, [initialData]); // Added initialData to dependency array

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Set the selected file
  };

  const handleLongDescriptionChange = (value) => {
    setFormData((prev) => ({ ...prev, longdescription: value })); // Changed longDescription to longdescription
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for image on new service creation
    if (!initialData && !selectedImage) {
      alert("Vui lòng chọn ảnh cho dịch vụ."); // Show an alert
      return; // Stop the submission
    }

    let imageUrl = formData.image; // Use existing image URL by default

    if (selectedImage) {
      // Upload image if a new one is selected
      try {
        // Assuming uploadService is an object with an uploadImage method
        const uploadResponse = await uploadService.uploadImages([selectedImage]);
        imageUrl = uploadResponse[0]; // Assuming the upload service returns an array of URLs and we need the first one
      } catch (uploadError) {
        console.error("Failed to upload image:", uploadError);
        alert("Tải ảnh lên thất bại. Vui lòng thử lại."); // Show upload error
        return; // Stop the submission
      }
    }

    try {
      const serviceDataToSend = {
        name: formData.name,
        slug: formData.slug,
        categoryId: formData.categoryId,
        description: formData.description,
        longdescription: formData.longdescription,
        image: imageUrl, // Use the uploaded image URL or existing one
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : null,
      };
      console.log("Service data to send:", serviceDataToSend); // Log data before sending
      let response;
      if (initialData) {
        // Update existing service
        response = await serviceService.updateService(initialData.id, serviceDataToSend);
        alert("Cập nhật dịch vụ thành công!"); // Show success message for update
      } else {
        // Create new service
        response = await serviceService.createService(serviceDataToSend);
        alert("Tạo dịch vụ thành công!"); // Show success message for create
      }
      onSave(response.data); // Pass the service data back
      onClose();
    } catch (error) {
      console.error(initialData ? "Failed to update service:" : "Failed to create service:", error);
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.data);
      }
      alert(initialData ? "Cập nhật dịch vụ thất bại. Vui lòng kiểm tra lại thông tin." : "Tạo dịch vụ thất bại. Vui lòng kiểm tra lại thông tin."); // Show appropriate error message
    }
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col sm={6}>
              <Form.Label>Tên dịch vụ</Form.Label> {/* Changed label */}
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả ngắn</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả chi tiết</Form.Label>
            <DescriptionEditor
              value={formData.longdescription}
              onChange={handleLongDescriptionChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col sm={6}>
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label>Giá khuyến mãi</Form.Label> {/* Added Sale Price field */}
              <Form.Control
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
              />
            </Col>
            <Col sm={6}>
            
              <Form.Label>Danh mục</Form.Label>
              <Form.Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Row className="mb-3"> {/* Added new row for image and salePrice */}
            <Col sm={6}>
              <Form.Label>Ảnh</Form.Label> {/* Added Image field */}
              <Form.Control
                type="file" // Changed type to file
                name="image"
                onChange={handleImageChange} // Use handleImageChange for file input
              />
              {formData.image && ( // Display current image if exists (for editing)
                <img
                  src={
                    formData.image && formData.image.startsWith('/')
                      ? `${process.env.REACT_APP_API_BASE_URL}${formData.image.startsWith('/public/') ? formData.image.substring('/public/'.length) : formData.image.substring(1)}`
                      : formData.image
                  }
                  alt="Current Service Image"
                  style={{ width: '100px', marginTop: '10px' }}
                />
              )}
            </Col>
           
          </Row>

          <div className="text-end mt-3">
            <Button variant="secondary" onClick={onClose} className="me-2">
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

export default ServiceForm;
