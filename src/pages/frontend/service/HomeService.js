import React, { useEffect, useState } from "react";
import serviceService from "../../functionservice/servicesFunction";
import { useNavigate } from "react-router-dom";

const HomeService = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAllServices(1, 4);
        setServices(data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy dịch vụ");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);
  const handleServiceClick = (id) => {
    navigate(`/dich-vu/${id}`);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="tab-content"  type="button">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="col-md-6 col-lg-4 col-xl-3"
                      onClick={() => handleServiceClick(service.id)}
                    >
                      <div className="rounded position-relative fruite-item">
                        <div className="fruite-img">
                          <img
                            src={service.image || "default-image.jpg"}
                            className="img-fluid w-100 rounded-top"
                            alt={service.name}
                          />
                        </div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                          <h4
                            style={{
                              borderBottom: "3px solid #007bff",
                              paddingBottom: "3px",
                            }}
                          >
                            {service.name}
                          </h4>
                          <p
                            style={{ fontSize: "18px", color: "#007bff" }}
                          >
                            {service.price
                              ? `${service.price} VND/buổi`
                              : "Giá liên hệ"}
                          </p>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeService;