import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "./modalform";
import EditProductModal from "./editform"; // Import the EditProductModal
import productService from "../../../functionservice/productService"; // Import productService

const ProductList = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null); // Keep track of the product to be edited
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("createdAt"); // Default sort by createdAt
  const [sortOrder, setSortOrder] = useState("DESC"); // Default sort order DESC
  const [totalProducts, setTotalProducts] = useState(0); // State to hold total number of products

  // Fetch products on component mount or when pagination/search/sort changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getAllProducts(currentPage, productsPerPage, searchTerm, sortBy, sortOrder);
        console.log('Products data:', productsData);
        setProducts(productsData.products);
        setTotalProducts(productsData.total); // Set total products from API
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, productsPerPage, searchTerm, sortBy, sortOrder]); // Add dependencies

  const handleOpenTrash = () => {
    navigate("/admin/product/trash");
  };

  const handleOpenEdit = (product) => {
    setShowEditModal(product); // Set the product being edited
    setShowModal(true); // Show the modal for editing
  };

  const handleDeleteProduct = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
    if (isConfirmed) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter((prod) => prod.id !== id)); // Remove the deleted product from the list
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSaveProduct = async (newProduct) => {
    try {
      await productService.createProduct(newProduct);
      // Fetch products again to update the list after adding a new product
      const productsData = await productService.getAllProducts(currentPage, productsPerPage);
      setProducts(productsData.products);
      setShowModal(false); // Close the modal after saving
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle error appropriately, e.g., display an error message
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await productService.editProduct(updatedProduct.id, updatedProduct);
      // Fetch products again to update the list after editing a product
      const productsData = await productService.getAllProducts(currentPage, productsPerPage);
      setProducts(productsData.products);
      setShowModal(false); // Close the modal after updating
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error appropriately, e.g., display an error message
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách sản phẩm</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary m-2"
            onClick={() => setShowModal(true)} // Open modal for adding product
          >
            <i className="bi bi-plus"></i> Thêm sản phẩm
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
          placeholder="Tìm kiếm sản phẩm"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imageUrl || "default-image-url.jpg"} // Use imageUrl from API
                    alt={item.name}
                    width="80"
                    className="rounded"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleOpenEdit(item)} // Open modal for editing product
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteProduct(item.id)}
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
                Không có sản phẩm nào phù hợp với tìm kiếm
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination d-flex flex-row">
          {/* Use totalProducts from state for pagination */}
          {Array.from({ length: Math.ceil(totalProducts / productsPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Product Modal for adding or editing product */}
      {showEditModal ? (
        <EditProductModal
          show={showModal}
          handleClose={() => setShowModal(false)} // Close modal
          handleSave={handleUpdateProduct} // Save updated product
          data={showEditModal} // Pass product for editing
        />
      ) : (
        <ProductModal
          show={showModal}
          handleClose={() => setShowModal(false)} // Close modal
          handleSave={handleSaveProduct} // Save new product
        />
      )}
    </div>
  );
};

export default ProductList;
