import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import videoService from "../../../functionservice/videoService";

const EditVideoModal = ({ show, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    id: "",
    tieuDe: "",
    linkYtb: "", 
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        tieuDe: initialData.tieuDe || "",
        linkYtb: initialData.linkYtb || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id, ...videoDataWithoutId } = formData;


    try {
      const updatedVideo = await videoService.editVideo(formData.id, videoDataWithoutId);
      console.log("Video updated successfully:", updatedVideo);

      onSave(updatedVideo);
      onClose();
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Control type="hidden" name="id" value={formData.id} />

          <Form.Group className="mb-3">
            <Form.Label>Tựa đề</Form.Label>
            <Form.Control
              type="text"
              name="tieuDe"
              value={formData.tieuDe}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link YouTube</Form.Label>
            <Form.Control
              type="text"
              name="linkYtb"
              value={formData.linkYtb}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditVideoModal;
