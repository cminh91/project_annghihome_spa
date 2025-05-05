import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";
import productService from "../../functionservice/productService";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(slug);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải chi tiết sản phẩm.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div className="container py-5">Đang tải chi tiết sản phẩm...</div>;
  }

  if (error) {
    return <div className="container py-5">{error}</div>;
  }

  if (!product) {
    return <div className="container py-5">Sản phẩm không tồn tại.</div>;
  }

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "110px" }}>
        <div className="container py-5">
          <h1 className="text-center mb-4">{product.name}</h1>
          <div className="row">
            <div className="col-12">
              {/* Long description */}
              {product.longDescription && (
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{ __html: product.longDescription }}
                />
              )}
            </div>
            <div className="col-md-6 mb-4">
              {/* Main Image */}
              <img
                src={product.imageUrl || "/default-image.jpg"}
                className="img-fluid rounded"
                alt={product.name}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <div className="d-flex flex-wrap gap-2 mt-3">
                {(product.additionalImages || []).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`ảnh phụ ${index + 1}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-6">
              {/* Description, Price, SalePrice */}
              {product.description && (
                <p className="mb-3">{product.description}</p>
              )}
              <p className="mb-2">
                <strong>Giá: </strong>
                {product.price
                  ? `${product.price.toLocaleString("vi-VN")} VND`
                  : "Liên hệ"}
              </p>
              {product.salePrice && (
                <p className="mb-3">
                  <strong>Giá khuyến mãi: </strong>
                  {`${product.salePrice.toLocaleString("vi-VN")} VND`}
                </p>
              )}

              {/* Nút mua */}
              <div className="d-flex gap-3 mt-4">
                <button className="btn btn-success btn-lg">
                  Thêm vào giỏ
                </button>
                <Link to={`/checkout/${product.id}`}>
                  <button className="btn btn-primary btn-lg">
                    Mua ngay
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
