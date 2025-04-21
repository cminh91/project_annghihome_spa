import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryModal from "./CategoryModal"; 
import EditCategoryModal from "./CategoryEdit"; 
import categoryService from "../../../functionservice/categoryService";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6); 

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoryService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenTrash = () => {
    navigate("/admin/category/trash");
  };

  const handleOpenEdit = (category) => {
    setShowEditModal(category); // Set the category being edited
    setShowModal(true); // Show the modal for editing
  };


  const handleDeleteCategory = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (isConfirmed) {
      try {
        await categoryService.deleteCategory(id);
        setCategories(categories.filter((cat) => cat.id !== id)); // Remove the deleted category from the list
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };
  

  const handleSaveCategory = (newCategory) => {
    setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    setShowModal(false); 
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const sortedCategories = [...categories].sort((a, b) => b.isActive - a.isActive);

  const filteredCategories = sortedCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách danh mục dịch vụ</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary m-2"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus"></i> Thêm danh mục
          </button>
          <button className="btn btn-danger m-2" onClick={handleOpenTrash}>
            <i className="bi bi-trash"></i> Thùng rác
          </button>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm danh mục"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Ảnh</th>
            <th>Tên danh mục</th>
            <th>ParentCatrgories</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.length > 0 ? (
            currentCategories.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imageUrl || "default-image-url.jpg"} // Fallback image URL if none provided
                    alt={item.name}
                    width="80"
                    className="rounded"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.parentId}</td>
                <td>{item.type}</td>
                <td>{item.isActive ? "Hiển thị" : "Ẩn"}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleOpenEdit(item)} // Open modal for editing category
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteCategory(item.id)} 
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Không có danh mục nào phù hợp với tìm kiếm
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination d-flex flex-row">
          {Array.from({ length: Math.ceil(filteredCategories.length / categoriesPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>



      {/* Category Modal for adding or editing category */}
      {showEditModal ? (
        <EditCategoryModal
          show={showModal}
          handleClose={() => setShowModal(false)} // Close modal
          handleSave={handleUpdateCategory} // Save updated category
          category={showEditModal} // Pass category for editing
        />
      ) : (
        <CategoryModal
          show={showModal}
          handleClose={() => setShowModal(false)} // Close modal
          handleSave={handleSaveCategory} // Save new category
        />
      )}
    </div>
  );
};

export default CategoryList;
