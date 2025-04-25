import React from "react";
import Header from "../frontend/home/Header";
import Footer from "../frontend/home/Footer";
import CateDetail from "./service/cateDetail";

const CategoryDetail = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "110px" }}>
        <CateDetail /> 
      </main>
      <Footer />
    </>
  );
};

export default CategoryDetail;
