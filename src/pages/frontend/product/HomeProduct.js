import React, { useEffect, useState } from "react";
import productService from "../../functionservice/productService";
import { useNavigate } from "react-router-dom";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(1, 4);
        setProducts(data.products || []);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy sản phẩm");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/san-pham/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-md-6 col-lg-4 col-xl-3"
            onClick={() => handleProductClick(product.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="rounded border border-secondary h-100">
              <img
                src={product.imageUrl || "default-image.jpg"}
                alt={product.name}
                className="img-fluid w-100 rounded-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="p-3">
                <h5 className="fw-bold text-dark">{product.name}</h5>
                <p className="mb-1 text-primary fw-semibold">
                  Giá: {Number(product.salePrice || product.price).toLocaleString()} VND
                </p>
                {product.salePrice && (
                  <p className="mb-1 text-muted text-decoration-line-through" style={{ fontSize: "14px" }}>
                    {Number(product.price).toLocaleString()} VND
                  </p>
                )}
                  <button   className="btn btn-primary btn-lg"
                  style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}  onClick={() => handleProductClick(product.id)}>
                      Chi tiết
                </button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeProduct;
