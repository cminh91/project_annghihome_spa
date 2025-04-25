import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Added Link for navigation
import Footer from "../home/Footer";
import Header from "../home/Header";
import serviceService from "../../functionservice/servicesFunction";

const ServiceDetail = () => {
  const { id } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const data = await serviceService.getServiceById(id); // Fetch service by ID
        setService(data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải chi tiết dịch vụ.");
        setLoading(false);
      }
    };

    fetchServiceDetail();
  }, [id]); // Re-run effect if ID changes

  if (loading) {
    return <div className="container py-5">Đang tải chi tiết dịch vụ...</div>;
  }

  if (error) {
    return <div className="container py-5">{error}</div>;
  }

  if (!service) {
    return <div className="container py-5">Dịch vụ không tồn tại.</div>;
  }

  return (
    <div>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <div className="container py-5">
          <h1 className="text-center mb-4">{service.name}</h1>
          <div className="row">
            <div className="col-12">
              {/* Long description first */}
              {service.longdescription && (
                <p className="mb-4">{service.longdescription}</p>
              )}
            </div>
            <div className="col-md-6 mb-4">
              {/* Image after long description */}
              <img
                src={service.image || "/default-image.jpg"}
                className="img-fluid rounded"
                alt={service.name}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              {/* Description, price, sale price, and button */}
              {service.description && (
                <p className="mb-3">{service.description}</p>
              )}
              <p className="mb-2">
                <strong>Giá: </strong>
                {service.price
                  ? `${service.price.toLocaleString("vi-VN")} VND`
                  : "Liên hệ"}
              </p>
              {service.salePrice && (
                <p className="mb-3">
                  <strong>Giá khuyến mãi: </strong>
                  {`${service.salePrice.toLocaleString("vi-VN")} VND`}
                </p>
              )}
              <Link to={`/booking/${service.id}`}>
                <button
                  className="btn btn-primary btn-lg"
                  style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
                >
                  Đặt Dịch Vụ
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;