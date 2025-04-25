import React, { useState, useEffect } from "react";
import IntroModal from "./IntroModal";
import { useNavigate } from "react-router-dom";
import aboutService from "../../../functionservice/aboutService";

const IntroList = () => {
  const [showModal, setShowModal] = useState(false);
  const [intros, setIntros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch intros when the component mounts
  useEffect(() => {
    const fetchIntros = async () => {
      try {
        const data = await aboutService.getAllAbout(); // Fetch from API
        setIntros(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch intros");
        setLoading(false);
      }
    };

    fetchIntros();
  }, []);

  const handleSaveIntro = async (newIntro) => {
    try {
      const savedIntro = await aboutService.createAbout(newIntro); // Save to API
      setIntros([...intros, savedIntro]); // Update state
    } catch (err) {
      setError("Failed to save new intro");
    }
  };

  const handleOpenTrash = () => {
    navigate("/admin/intro/trash");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Bài viết giới thiệu</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-circle me-2"></i>Thêm bài viết
          </button>
          <button className="btn btn-danger" onClick={handleOpenTrash}>
            <i className="bi bi-trash me-2"></i>thùng rác
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {intros.map((intro) => (
            <tr key={intro.id}>
              <td>
                {intro.image && (
                  <img
                    src={intro.image}
                    alt="Ảnh bài viết"
                    style={{ width: "80px", objectFit: "cover" }}
                  />
                )}
              </td>
              <td>{intro.title}</td>
              <td>{intro.mission}</td>
              <td>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-warning">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-danger">
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <IntroModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveIntro}
      />
    </div>
  );
};

export default IntroList;