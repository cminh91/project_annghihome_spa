
import React from "react";
import Header from "../frontend/home/Header";
import Footer from "../frontend/home/Footer";
import AllProduct from "./product/AllProduct";
const ProductPage = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "190px" }}>
      <h2 className="text-center mb-4 text-primary fw-bold">Tất cả sản phẩm</h2>
      <AllProduct />
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
