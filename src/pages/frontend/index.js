import React from "react";
import Footer from "./home/Footer";
import Header from "./home/Header";
import Home from "./home/Home";

const index = () => {
    return (
        <div>
            <Header />
            <main>
                <Home/>
            </main>
            <Footer />
        </div>
    );
};
export default index;