import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormBlog from "./FormBlog";
import blogService from "../../../functionservice/BlogService";
import uploadService from "../../../functionservice/uploadService";

const BlogList = () => {

  const [showModal, setShowModal] = useState(false);
  const [editBlog, setEditBlog] = useState(null); // Thêm state cho bài blog đang chỉnh sửa
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchBlogs(page, limit);
  }, [page, limit]);

  const fetchBlogs = async (currentPage = 1, currentLimit = 10) => {
    setLoading(true);
    setError("");
    try {
      const data = await blogService.getPosts({ page: currentPage, limit: currentLimit });
      setBlogs(Array.isArray(data.posts) ? data.posts : []);
      setTotal(Number(data.total) || 0);
    } catch (err) {
      setError("Không thể tải danh sách blog.");
      setBlogs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };



  const handleOpenEdit = async (blog) => {
    setEditBlog(blog);
    await fetchCategories();
    setShowModal(true);
  };

  const handleOpenCreate = async () => {
    setEditBlog(null);
    await fetchCategories();
    setShowModal(true);
  };

  const fetchCategories = async () => {
    try {
      const data = await blogService.getCategoriesByType('post');
      setCategories(Array.isArray(data) ? data : (Array.isArray(data.items) ? data.items : []));
    } catch (err) {
      setCategories([]);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // Xử lý upload ảnh và lưu blog
  const handleSave = async (data, fileImage) => {
    setLoading(true);
    setError("");
    try {
      let imageUrl = data.imageUrl || "";
      // Nếu có file ảnh mới, upload lên
      if (fileImage) {
        const imageUrls = await uploadService.uploadImages([fileImage]);
        imageUrl = imageUrls[0];
      }
      const payload = { ...data, imageUrl };
      if (editBlog) {
        await blogService.updateBlog(editBlog.id, payload);
      } else {
        await blogService.createBlog(payload);
      }
      await fetchBlogs();
      setShowModal(false);
    } catch (err) {
      setError("Lưu blog thất bại");
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa blog
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa blog này?")) return;
    setLoading(true);
    setError("");
    try {
      await blogService.deleteBlog(id);
      await fetchBlogs();
    } catch (err) {
      setError("Xóa blog thất bại");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Blog</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            <i className="bi bi-plus-circle me-2"></i>Thêm mới
          </button>

        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div>Đang tải...</div>}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Hình ảnh</th>
            <th>Tiêu đề</th>
            <th>Tóm tắt</th>
            <th>Tác giả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <img
                  src={blog.imageUrl || blog.image}
                  alt="Blog"
                  width="100"
                  height="100"
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td>{blog.title}</td>
              <td>{blog.summary}</td>
              <td>{blog.authorName}</td>
              <td className="d-flex gap-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleOpenEdit(blog)}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(blog.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center my-3">
        <button className="btn btn-outline-secondary mx-2" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Trang trước
        </button>
        <span>Trang {page} / {Math.ceil(total / limit) || 1}</span>
        <button className="btn btn-outline-secondary mx-2" disabled={page >= Math.ceil(total / limit)} onClick={() => setPage(page + 1)}>
          Trang sau
        </button>
      </div>

      {showModal && (
        <FormBlog
          show={showModal}
          handleClose={handleClose}
          handleSave={handleSave}
          defaultData={editBlog}
          categories={categories}
        />
      )}
    </div>
  );
};

export default BlogList;
