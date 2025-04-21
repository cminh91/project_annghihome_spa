import React from "react";
import Footer from "../home/Footer";
import Header from "../home/Header";

const Blog = () => {
    return (
        <div>
            <Header />
            <main>
                <div className="container-fluid fruite py-5" style={{backgroundColor:"skyblue"}}>
                  <div className="container py-5">
            <div className="tab-class text-center">
            <div className="row g-4 justify-content-center">
                <div className="col-lg-4 text-center">
                <h1
                    className="fw-bold"
                    style={{ whiteSpace: "nowrap", fontSize: "36px", color: "#0000FF" }}
                >
                    Blog
                </h1>
                <div className="d-flex align-items-center mt-3 justify-content-center">
                    <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                    <img src="logo.png" alt="Logo" className="mx-3" style={{ width: "40px", height: "40px" }} />
                    <div className="border-top border-dark flex-grow-1" style={{ maxWidth: "50px" }}></div>
                </div>
                </div>
            </div>

            <div className="tab-content">
                {/* Tab 1 */}
                <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                    {Array(4).fill().map((_, idx) => (
                    <div key={idx} className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item bg-white">
                        <div className="fruite-img">
                            <img
                            src="https://imgs.search.brave.com/5BGSvPnjH5DF7_aIuUKfFqmXN3GgN2z7gcr_xP0w41I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZkLzFj/L2RmLzZkMWNkZmRl/ZDRiMzEyMGM5ZDNm/Yjc1ZjI0MjFkODhj/LmpwZw"
                            className="img-fluid w-100 rounded-top"
                            alt=""
                            />
                        </div>
                        <div
                            className="text-white px-3 py-1 rounded position-absolute"
                            style={{ top: "10px", left: "10px" }}
                        ></div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <h4 style={{ borderBottom: "3px solid #007bff", paddingBottom: "3px" }}>Grapes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Tab 2 */}
                <div id="tab-2" className="tab-pane fade show p-0">
                <div className="row g-4">
                    <div className="col-md-6 col-lg-4 col-xl-3">
                    <div className="rounded position-relative fruite-item">
                        <div className="fruite-img">
                        <img
                            src="https://imgs.search.brave.com/5BGSvPnjH5DF7_aIuUKfFqmXN3GgN2z7gcr_xP0w41I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZkLzFj/L2RmLzZkMWNkZmRl/ZDRiMzEyMGM5ZDNm/Yjc1ZjI0MjFkODhj/LmpwZw"
                            className="img-fluid w-100 rounded-top"
                            alt=""
                        />
                        </div>
                        <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: "10px", left: "10px" }}></div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <div className="d-flex justify-content-between flex-lg-wrap">
                            <h4 style={{ borderBottom: "3px solid #007bff", paddingBottom: "3px" }}>Grapes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Add more product cards here as needed */}
                </div>
                </div>

                {/* Tab 3, Tab 4, Tab 5 — You can replicate the same pattern and map data dynamically if needed */}

            </div>
            </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default Blog;