import React, { useEffect, useState } from "react";
import productService from "../../functionservice/productService";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(1, 12);
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
    <div className="container-fluid fruite py-5">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4 ">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="col-md-6 col-lg-4 col-xl-3"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <div className="rounded position-relative fruite-item border border-secondary border-top-0 rounded-bottom">
                        <div className="fruite-img" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <img
                            src={product.imageUrl || "default-image.jpg"}
                            className="img-fluid w-50 rounded-top"
                            alt={product.name}
                          />
                        </div>
                        <div className="p-4 text-center ">
                          <h4
                            style={{
                              borderBottom: "3px solid #007bff",
                              paddingBottom: "3px",
                            }}
                          >
                            {product.name}
                          </h4>
                          <p
                            style={{ fontSize: "18px", color: "#007bff" }}
                          >
                            Giá: {Number(product.salePrice || product.price).toLocaleString()} VND
                          </p>
                          {product.salePrice && (
                            <p
                              className="mb-1 text-muted text-decoration-line-through"
                              style={{ fontSize: "14px" }}
                            >
                              {Number(product.price).toLocaleString()} VND
                            </p>
                          )}
                          <p>{product.description}</p>
                          <button
                            className="btn btn-primary btn-lg"
                            style={{
                              backgroundColor: "#007bff",
                              borderColor: "#007bff",
                            }}
                            onClick={() => handleProductClick(product.id)}
                          >
                            Chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    </div>
  );
};

export default AllProducts;
