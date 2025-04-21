import React from "react";
import Header from "../frontend/home/Header";
import Footer from "../frontend/home/Footer";
import NewsEvents from "../frontend/new/NewsEvents";

const NewsPage = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "80px" }}>
      <NewsEvents />
      </main>
      <Footer />
    </>
  );
};

export default NewsPage;
