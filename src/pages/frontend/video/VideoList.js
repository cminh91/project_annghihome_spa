import React, { useState, useEffect } from "react";
import videoService from "../../functionservice/videoService";
import { Spinner } from "react-bootstrap";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await videoService.getAllVideos();
        setVideos(Array.isArray(data.videos) ? data.videos : []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch videos");
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  // Split videos into groups of 3 for the carousel
  const videoGroups = [];
  for (let i = 0; i < videos.length; i += 3) {
    videoGroups.push(videos.slice(i, i + 3));
  }

  return (
    <div>
      <div className="row mt-5">
        <div className="col-lg-12">
          <div id="videoCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {videoGroups.map((group, groupIdx) => (
                <div
                  className={`carousel-item ${groupIdx === 0 ? "active" : ""}`}
                  key={groupIdx}
                >
                  <div className="row g-4 justify-content-center">
                    {group.map((video) => {
                      const videoId = new URL(video.linkYtb).searchParams.get("v");
                      const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                      return (
                        <div className="col-md-4" key={video.id}>
                          <div className="ratio ratio-16x9">
                            <a href={video.linkYtb} target="_blank" rel="noopener noreferrer">
                              <img
                                src={thumbnail}
                                alt="Video thumbnail"
                                className="img-fluid"
                                style={{ objectFit: "cover" }}
                              />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel navigation */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#videoCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#videoCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
