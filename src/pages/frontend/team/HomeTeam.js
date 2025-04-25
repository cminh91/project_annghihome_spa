import React, { useEffect, useState } from "react";
import Footer from "../home/Footer";
import Header from "../home/Header";

import teamService from "../../functionservice/teamService";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await teamService.getAllTeams();
        setTeams(data);
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy danh sách đội");
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="row g-4 mt-4 justify-content-center tab-pane fade show p-0 active">
      {teams.map((team, index) => (
        <div key={index} className="col-md-4 col-lg-3 text-center">
          <div className="overflow-hidden rounded">
            <img
              src={team.image || "default-image.jpg"}
              alt={team.name}
              className="img-fluid rounded transition"
              style={{
                maxHeight: "200px",
                objectFit: "cover",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          <h5 className="fw-bold mt-2">{team.name}</h5>
          <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
            {team.description}
          </p>
        </div>
      ))}
</div>

  );
};

export default TeamList;
