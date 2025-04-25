
import React from "react";
import Header from "../frontend/home/Header";
import Footer from "../frontend/home/Footer";
import AllService from "./service/AllServices";
const ServicePages = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "80px" }}>
      <AllService />
      </main>
      <Footer />
    </>
  );
};

export default ServicePages;
