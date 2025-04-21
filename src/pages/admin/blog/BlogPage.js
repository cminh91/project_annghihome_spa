import React from "react";
import Header from "../home/Header";
import Footer from "../home/Footer";
import SideBar from "../home/SideBar";
import BlogList from "./lib/BlogList";
const BlogPage = () => {
  return (
    <div
      className="d-flex flex-column min-vh-100"
    >
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <SideBar />
          </div>
          <div className="col-md-9">
            <BlogList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default BlogPage;
