import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blogService from "../../functionservice/BlogService";
import Footer from "../home/Footer";
import Header from "../home/Header";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogById(slug);
        console.log(data);
        setBlog(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog details.");
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p>Loading blog details...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!blog) {
    return <p>No blog found.</p>;
  }

  return (
    <div>
    <Header />
    <main style={{ paddingTop: "80px" }}>
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="mb-4">{blog.title}</h1>
          <img
            src={blog.image || "https://via.placeholder.com/150"}
            alt={blog.title || "Blog Image"}
            className="img-fluid mb-4"
          />
          <p>{blog.description}</p>
          <div className="blog-content"
           dangerouslySetInnerHTML={{
            __html: blog.content || "<p>No content available</p>"
          }}>
          
          </div>
        </div>
      </div>
    </div>
    </main>
    <Footer />
</div>

  );
};

export default BlogDetail;