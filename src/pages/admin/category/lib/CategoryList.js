import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CategoryModal from "./CategoryModal";
import EditCategoryModal from "./CategoryEdit";
import categoryService from "../../../functionservice/categoryService";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, type: null, category: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const categoriesData = await categoryService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        alert("Không thể tải danh sách danh mục!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Delayed search
  useEffect(() => {
    let timeoutId;
    const delayedSearch = () => {
      timeoutId = setTimeout(() => {
        setCurrentPage(1); // Reset to page 1 when searching
      }, 300);
    };

    delayedSearch();
    return () => clearTimeout(timeoutId); // Cleanup timeout
  }, [searchTerm]);

  // Handle search input
  const handelSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Memoized sorted and filtered categories
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => b.isActive - a.isActive);
  }, [categories]);

  const filteredCategories = useMemo(() => {
    return sortedCategories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedCategories, searchTerm]);

  // Pagination
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const handleOpenTrash = () => {
  //   navigate("/admin/category/trash");
  // };

  const handleOpenAdd = () => {
    setModalState({ isOpen: true, type: "add", category: null });
  };

  const handleOpenEdit = (category) => {
    setModalState({ isOpen: true, type: "edit", category });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null, category: null });
  };

  const handleDeleteCategory = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (isConfirmed) {
      setIsLoading(true);
      try {
        await categoryService.deleteCategory(id);
        const categoriesData = await categoryService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Xóa danh mục thất bại!");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSaveCategory = async (createdCategory) => {
    setIsLoading(true);
    try {
      setCategories(prev => [createdCategory, ...prev]);
      const categoriesData = await categoryService.getAllCategories();
      setCategories(categoriesData);
      handleCloseModal();
      alert("Thêm danh mục thành công!");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Thêm danh mục thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategory = async (updatedCategory) => {
    setIsLoading(true);
    try {
      await categoryService.editCategory(updatedCategory.id, updatedCategory); // Fixed: use editCategory and pass id
      const categoriesData = await categoryService.getAllCategories();
      setCategories(categoriesData);
      handleCloseModal();
      alert("Cập nhật danh mục thành công!");
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Cập nhật danh mục thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách danh mục</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-primary m-2" onClick={handleOpenAdd}>
            <i className="bi bi-plus"></i> Thêm danh mục
          </button>
          {/* <button className="btn btn-danger m-2" onClick={handleOpenTrash}>
            <i className="bi bi-trash"></i> Thùng rác
          </button> */}
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Tìm kiếm danh mục"
          value={searchTerm}
          onChange={handelSearch}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
        </div>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Tên danh mục</th>
                <th>Slug</th>
                <th>Mô tả</th>
                <th>Level</th>
                <th>Sắp xếp</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.slug}</td>
                  <td>{item.description}</td>
                  <td>{item.level}</td>
                  <td>{item.sortOrder}</td>
                  <td>
                    <span className={`badge ${item.isActive ? 'bg-success' : 'bg-secondary'}`}>
                      {item.isActive ? "Hiển thị" : "Ẩn"}
                    </span>
                  </td>
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
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav className="d-flex justify-content-center">
            <ul className="pagination d-flex flex-row">
              {(() => {
                const totalPages = Math.ceil(
                  filteredCategories.length / categoriesPerPage
                );
                const maxPagesToShow = 5;
                const pages = [];
                const startPage = Math.max(
                  1,
                  currentPage - Math.floor(maxPagesToShow / 2)
                );
                const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

                if (startPage > 1) {
                  pages.push(
                    <li key="1" className="page-item">
                      <button className="page-link" onClick={() => paginate(1)}>
                        1
                      </button>
                    </li>
                  );
                  if (startPage > 2) {
                    pages.push(
                      <li key="ellipsis-start" className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    );
                  }
                }

                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <li
                      key={i}
                      className={`page-item ${currentPage === i ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => paginate(i)}>
                        {i}
                      </button>
                    </li>
                  );
                }

                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(
                      <li key="ellipsis-end" className="page-item disabled">
                        <span className="page-link">...</span>
                      </li>
                    );
                  }
                  pages.push(
                    <li key={totalPages} className="page-item">
                      <button
                        className="page-link"
                        onClick={() => paginate(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </li>
                  );
                }

                return pages;
              })()}
            </ul>
          </nav>
        </>
      )}

      {/* Modal */}
      <div className={`modal-overlay ${modalState.isOpen ? "show" : ""}`}>
        {modalState.type === "edit" ? (
          <EditCategoryModal
            show={modalState.isOpen}
            handleClose={handleCloseModal}
            handleSave={handleUpdateCategory}
            category={modalState.category}
          />
        ) : (
          <CategoryModal
            show={modalState.isOpen}
            handleClose={handleCloseModal}
            handleSave={handleSaveCategory}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryList;