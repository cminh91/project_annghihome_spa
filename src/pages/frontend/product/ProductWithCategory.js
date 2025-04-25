import React, { useState, useEffect } from "react";
import productService from "../../functionservice/productService";  // Change to productService
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate

const ProductWithCategory = () => {
  const { slug } = useParams();  // Capture the category slug from the URL
  const navigate = useNavigate(); // Get navigate function from React Router
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts(1, 6);  // Fetch products from API
        const filteredProducts = data.filter(product => product.category.slug === slug);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const handleProductClick = (productId) => {
    navigate(`/san-pham/${productId}`);  // Navigate to the product details page
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center">Sản phẩm</h1>
      <div className="row g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="card"
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: 'pointer' }} 
              >
                <img
                  src={product.image || "/default-image.jpg"}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="text-muted">Price: {product.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductWithCategory;
