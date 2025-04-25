import React, { useState, useEffect } from "react";
import serviceService from "../../functionservice/servicesFunction";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate

const ServiceList = () => {
  const { slug } = useParams();  // Capture the category slug from the URL
  const navigate = useNavigate(); // Get navigate function from React Router
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAllServices(1, 6);
        const filteredServices = data.filter(service => service.category.slug === slug);
        setServices(filteredServices);
        setLoading(false);
      } catch (err) {
        setError("Error fetching services.");
        setLoading(false);
      }
    };

    fetchServices();
  }, [slug]); 

  const handleServiceClick = (serviceId) => {
    navigate(`/dich-vu/${serviceId}`);
  };

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center">Dịch vụ</h1>
      <div className="row g-4">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4 col-xl-3">
              <div
                className="card"
                onClick={() => handleServiceClick(service.id)}
                style={{ cursor: 'pointer' }} 
              >
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
          ))
        ) : (
          <div className="col-12">
            <p>No services available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceList;
