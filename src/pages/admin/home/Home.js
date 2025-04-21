import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import Content from "../analytics/content";

const Home = () => {
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
            <Content />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
