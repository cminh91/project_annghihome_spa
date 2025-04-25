import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../../functionservice/BlogService";

const HomeBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs.");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <div className="container-fluid fruite py-5" style={{ backgroundColor: "skyblue" }}>
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="col-md-6 col-lg-4 col-xl-3"
                      type="button"
                      onClick={() => navigate(`/blog/${blog.slug}`)}
                    >
                      <div className="rounded position-relative fruite-item bg-white">
                        <div className="fruite-img">
                          <img
                            src={blog.image || "https://via.placeholder.com/150"}
                            className="img-fluid w-100 rounded-top"
                            alt={blog.title || "Blog Image"}
                          />
                        </div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                          <div className="d-flex justify-content-between flex-lg-wrap">
                            <h4 style={{ borderBottom: "3px solid #007bff", paddingBottom: "3px" }}>{blog.title}</h4>
                          </div>
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

export default HomeBlog;