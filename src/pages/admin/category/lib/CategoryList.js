import React, { useState, useEffect } from "react";
import CategoryModal from "./CategoryModal";
import EditCategoryModal from "./CategoryEdit";
import categoryService from "../../../functionservice/categoryService";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(4);

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
  const handleOpenEdit = (category) => {
    setShowEditModal(category);
    setShowModal(true); 
  };

  const handleDeleteCategory = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (isConfirmed) {
      try {
        await categoryService.deleteCategory(id);
        setCategories(categories.filter((cat) => cat.id !== id));
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
            <th>Tên danh mục</th>
            <th>Slug</th>
            <th>Mô tả</th>
            <th>Loại</th>
            <th>Trạng thái</th>
            <th>Thứ tự</th>
            <th>Level</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.length > 0 ? (
            currentCategories.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.description}</td>
                <td>{item.type}</td>
                <td>{item.isActive ? "Hiển thị" : "Ẩn"}</td>
                <td>{item.sortOrder}</td>
                <td>{item.level}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleOpenEdit(item)}
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
              <td colSpan="11" className="text-center">
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
            handleClose={() => setShowModal(false)}
            handleUpdate={handleUpdateCategory}
            category={showEditModal}
          />
      ) : (
        <CategoryModal
          show={showModal}
          handleClose={() => setShowModal(false)} 
          handleSave={handleSaveCategory}
        />
      )}
    </div>
  );
};

export default CategoryList;
