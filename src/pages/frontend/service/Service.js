import React, { useState, useEffect } from "react";
import serviceService from "../../functionservice/serviceService";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAllServices(1, 5); // Fetch the first 6 services
        setServices(data || []); // Assuming the API response contains a `services` field
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch services.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="col-lg-6 "style={{ width: "100%"}}>
      <div className="bg-white p-4 rounded shadow-sm">
        <h2 className="fw-bold mb-4 text-center" style={{ color: "#0000FF" }}>
          Chọn dịch vụ
        </h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div className="col-12" key={index}>
              <div className="d-flex align-items-center">
                <img
                  src={service.img || "https://via.placeholder.com/100"} // Fallback image if `img` is not provided
                  alt={service.title || "Dịch vụ"}
                  className="rounded me-3"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <h5 className="fw-bold">{service.title}</h5>
                  <a href="#st" className="btn btn-primary rounded-pill px-3">
                    Liên hệ
                  </a>
                </div>
              </div>
              <div style={{ borderBottom: "3px solid #007bff", paddingBottom: "3px" }}></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <a href="#st" className="btn btn-primary rounded-pill px-5">
            Đặt dịch vụ
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;