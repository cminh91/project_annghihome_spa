import React, { useState, useEffect } from "react";
import aboutService from "../../functionservice/aboutService"; // Import aboutService

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await aboutService.getAllAbout(); // Fetch data from API
        // Assuming the API returns an array and we need the first record
        setAboutData(data[0]); // Get the first item in the array
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch About data");
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container py-5">
      {/* Nội dung chính */}
      <div className="text-center mb-5">
        <h2 className="mb-3">{aboutData.title}</h2>
        <p className="w-75 mx-auto">{aboutData.content}</p>
      </div>

      {/* Tầm Nhìn & Sứ Mệnh */}
      <div className="row mb-5">
        <div className="col-md-6">
          <h3 className="mb-3 text-center">Tầm Nhìn</h3>
          <p>{aboutData.vision}</p>
        </div>
        <div className="col-md-6">
          <h3 className="mb-3 text-center">Sứ Mệnh</h3>
          <p>{aboutData.mission}</p>
        </div>
      </div>

      {/* Lịch Sử */}
      <div className="text-center mb-5">
        <h3 className="mb-3">Lịch Sử</h3>
        <p className="w-75 mx-auto">{aboutData.history}</p>
      </div>
    </div>
  );
};

export default AboutUs;