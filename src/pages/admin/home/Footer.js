import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto border-top">
      <div className="container text-center">
        <p className="mb-0 text-muted">
          &copy; {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
