import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serviceService from "../../functionservice/servicesFunction";
import productService from "../../functionservice/productService";

const CategoryDetail = () => {
  const { slug } = useParams();
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);  // State to store products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicesAndProducts = async () => {
      try {
        // Fetch all services
        const serviceData = await serviceService.getAllServices(1, 6);
        console.log("Fetched services:", serviceData);
        const filteredServices = serviceData.filter(service => service.category?.slug === slug);
        setServices(filteredServices);

        // Fetch all products
        const productData = await productService.getAllProducts(1, 6);
        console.log("Fetched products:", productData);
        const filteredProducts = productData.products.filter(
          product => product.category?.slug === slug && product.category?.type === 'product'
        );
        setProducts(filteredProducts);

        setLoading(false);
      } catch (err) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchServicesAndProducts();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center"> {slug}</h1>

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
          <h2>{slug}</h2>
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

      {/* If no products or services */}
      {products.length === 0 && services.length === 0 && (
        <div className="col-12">
          <p>No products or services available in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
