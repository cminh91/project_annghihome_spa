import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import CreatePartnerModal from "./createmodal";
import EditPartnerModal from "./editmodal";
import partnerService from "../../../functionservice/partnerService";

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(3);
  const fetchPartners = async () => {
    try {
      const data = await partnerService.getAllPartners();
      const sortedData = data.sort((a, b) => b.isActive - a.isActive); // Đặt 'isActive' = true lên trên
      setPartners(sortedData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đối tác:", error);
    }
  };
  useEffect(() => {
    fetchPartners();
  }, []);
  const handleCreatePartner = async (newPartnerData) => {
    try {
      await partnerService.createPartner(newPartnerData);
      fetchPartners();
      setShowCreateModal(false);
    } catch (error) {
      console.error("Lỗi khi tạo đối tác:", error);
    }
  };

  const handleEditPartner = async (updatedPartner) => {
    try {
      await partnerService.editPartner(updatedPartner.id, updatedPartner);
      fetchPartners();
      setShowEditModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật đối tác:", error);
    }
  };

  const handleDeletePartner = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đối tác này?")) {
      try {
        await partnerService.deletePartner(id);
        fetchPartners();
      } catch (error) {
        console.error("Lỗi khi xóa đối tác:", error);
      }
    }
  };

  const handleOpenEdit = (partner) => {
    setSelectedPartner(partner);
    setShowEditModal(true);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Cắt dữ liệu ra từng trang
  const displayedPartners = partners.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Danh sách đối tác</h3>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            <FaPlus /> Thêm đối tác
          </Button>

        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên</th>
            <th>Logo</th>
            <th>Website</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {displayedPartners.map((partner, index) => (
            <tr key={partner.id}>
              <td>{index + 1 + currentPage * itemsPerPage}</td>
              <td>{partner.name}</td>
              <td>
                <img src={partner.logo} alt={partner.name} width="100" />
              </td>
              <td>
                <a href={partner.website} target="_blank" rel="noreferrer">
                  {partner.website}
                </a>
              </td>
              <td>{partner.isActive ? "Hiển thị" : "Ẩn"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleOpenEdit(partner)}
                >
                  <FaEdit /> Sửa
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeletePartner(partner.id)}
                >
                  <FaTrashAlt /> Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CreatePartnerModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreatePartner}
      />

      <EditPartnerModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        partner={selectedPartner}
        onUpdate={handleEditPartner}
      />

      {/* Phân trang */}
      <ReactPaginate
        previousLabel={"Trước"}
        nextLabel={"Sau"}
        breakLabel={"..."}
        pageCount={Math.ceil(partners.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center d-flex flex-row"}
        activeClassName={"active"}
      />
    </div>
  );
};
export default PartnerList;
