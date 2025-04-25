import React, { useState, useEffect } from "react";
import Footer from "../home/Footer";
import Header from "../home/Header";
import blogService from "../../functionservice/BlogService";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Header />
      <main>
        <div className="container-fluid fruite py-5" style={{ backgroundColor: "skyblue" }}>
          <div className="container py-5">
            <div className="tab-class text-center">
              <div className="row g-4 justify-content-center">
                <div className="col-lg-4 text-center">
                  <h1
                    className="fw-bold"
                    style={{ whiteSpace: "nowrap", fontSize: "36px", color: "#0000FF" }}
                  >
                    Blog
                  </h1>
                  <div className="d-flex align-items-center mt-3 justify-content-center">
                    <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                    <img src="logo.png" alt="Logo" className="mx-3" style={{ width: "40px", height: "40px" }} />
                    <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                  </div>
                </div>
              </div>

              <div className="tab-content">
                <div id="tab-1" className="tab-pane fade show p-0 active">
                  <div className="row g-4">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="col-md-6 col-lg-4 col-xl-3">
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
                              <p>{blog.description}</p>
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
      </main>
      <Footer />
    </div>
  );
};

export default Blog;