import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serviceService from "../../functionservice/servicesFunction";
import productService from "../../functionservice/productService";
import blogService from "../../functionservice/BlogService";

const CategoryDetail = () => {
  const { slug } = useParams();
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryById = async () => {
      try {
        // Fetch all services
        const serviceData = await serviceService.getAllServices(1, 6);
        const filteredServices = serviceData.filter(service => service.category?.slug === slug);
        setServices(filteredServices);

        // Fetch all products
        const productData = await productService.getAllProducts(1, 6);
        const filteredProducts = productData.products.filter(
          product => product.category?.slug === slug && product.category?.type === 'product'
        );
        setProducts(filteredProducts);

        // Fetch all blogs
        const blogData = await blogService.getAllBlogs();
        console.log(blogData);
        const filteredBlogs = blogData.filter(
          post => post.slug === slug 
        );
        setPosts(filteredBlogs);

        setLoading(false);
      } catch (err) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchCategoryById();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center">{slug}</h1>

      {/* Display products if category type is 'product' */}
      {products.length > 0 && (
        <div>
          <div className="row g-4">
            {products.map((product) => (
              <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="card">
                  <img
                    src={product.imageUrl || "/default-image.jpg"}
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
            ))}
          </div>
        </div>
      )}

      {/* Display services */}
      {services.length > 0 && (
        <div>
          <div className="row g-4">
            {services.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-4 col-xl-3">
                <div className="card">
                  <img
                    src={service.image || "/default-image.jpg"}
                    className="card-img-top"
                    alt={service.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text">{service.description}</p>
                    <p className="text-muted">Price: {service.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display blogs */}
      {posts.length > 0 && (
        <div>
          <div className="">
            {posts.map((post) => (
              <div key={post.id} className="">
                <div className="text-center">
                  <img
                    src={post.imageUrl || "/default-image.jpg"}
                    className="card-img-top"
                    alt={post.title || "Blog post image"}
                  />
                  <div className="card-body">
                    <div
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: post.content || "<p>No content available</p>"
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



      {/* If no products, services, or blogs */}
      {products.length === 0 && services.length === 0 && posts.length === 0 && (
        <div className="col-12">
          <p>No products, services, or blogs available in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
