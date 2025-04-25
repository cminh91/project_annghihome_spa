import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DescriptionEditor from "../../lib/DescriptionEditor"; 
import teamService from "../../../functionservice/teamService"; 

const EditTeamMemberModal = ({ show, onClose, member, onUpdate }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");  
  const [image, setImage] = useState("");
    const [error, setError] = useState(null);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setDescription(member.bio || ""); 
      setImage(member.image || "");
    }
  }, [member]);

  const handleUpdate = async () => {
    if (!name || !image || !description) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const updatedMember = {
        ...member,
        name,
        description,
        image: image || '', 
        updatedAt: new Date().toISOString(),
      };

      const updatedData = await teamService.editTeam(member.id, updatedMember);
      onUpdate(updatedData);
      onClose();
    } catch (err) {
      console.error("Error updating team member:", err);
      setError("Không thể cập nhật thành viên. Vui lòng thử lại.");
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thành viên nhóm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <div className="row">
            <div className="col-md-12">
              <Form.Group controlId="name">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-12">
              <Form.Group controlId="description">
                <Form.Label>Thông tin về thành viên</Form.Label>
                <DescriptionEditor 
                  value={description} 
                  onChange={setDescription} 
                />
              </Form.Group>
            </div>

            <div className="col-md-12">
              <Form.Group controlId="image">
                <Form.Label>URL ảnh</Form.Label>
                <Form.Control
                  type="text"
                  value={image || ""}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Nhập URL ảnh (ví dụ: https://example.com/image.jpg)"
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={!name || !image || !description}>
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTeamMemberModal;
