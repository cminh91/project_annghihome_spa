import React from "react";
import Header from "../frontend/home/Header";
import Footer from "../frontend/home/Footer";
import ContactForm from "./contact/ContactForm";
const ContactPage = () => {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "80px" }}>
      <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
