import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import storeinforService from "../../functionservice/storeinforService";
import storeService from "../../functionservice/storeService";

const Footer = () => {
  const [storeInfo, setStoreInfos] = useState([]);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await storeService.getAlladdresses();
        setAddress(Array.isArray(response) ? response : [response]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchStoreInfos = async () => {
      setLoading(true);
      try {
        const data = await storeinforService.getAllStoreinfo();
        setStoreInfos(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreInfos();
  }, []);

  const store = storeInfo[0] || {};
  const addr = address[0] || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  if (loading) return <footer>Loading...</footer>;

  return (
    <footer>
      {/* Nội dung chính */}
      <div className="container-fluid text-white-50 footer pt-5 mt-5" style={{ backgroundColor: "#363636" }}>
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-4 col-md-6">
              <div className="h-100 rounded overflow-hidden">
                <iframe
                  title="map"
                  src={store.googleMap}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-item">
                <h4 className="text-white mb-3">Thông Tin Cửa Hàng</h4>
                <p className="mb-2"><i className="fa fa-info me-2"></i>{addr.fullName}</p>
                <p className="mb-2"><i className="fa fa-map-marker-alt me-2"></i>{addr.street}</p>
                <p className="mb-2"><i className="fa fa-phone me-2"></i>hotline: {addr.phoneNumber}</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 text-center">
              <div className="mb-3">
                <img src={store.logo} alt="Logo" style={{ maxWidth: "120px" }} className="mb-3" />
                <h5 className="text-white mb-2">Giờ làm việc</h5>
                <p className="mb-1">{store.workingHours}</p>
              </div>
              
              {/* Phần nút xã hội */}
              <div className="d-flex justify-content-center pt-3">
                <a className="btn btn-outline-light me-2 btn-md-square rounded-circle" href={store.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-light me-2 btn-md-square rounded-circle" href={store.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-outline-light btn-md-square rounded-circle" href={`https://zalo.me/${store.zalo}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>           
            </div>

          </div>
        </div>
      </div>

      {/* Nút nổi bên phải */}
      <div
        className="position-fixed d-flex flex-column align-items-center gap-2"
        style={{ bottom: "20px", right: "20px", zIndex: 1030 }}
      >
        {/* Nút mũi tên */}
        <button
          onClick={() => {
            scrollToTop();
            toggleButtons();
          }}
          className="btn btn-primary rounded-circle shadow"
          title="Lên đầu"
        >
          <i className="fas fa-arrow-up"></i>
        </button>

        {/* Các nút phụ với animation */}
        <AnimatePresence>
          {showButtons && (
            <>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                href={`https://m.me/yourpage`}
                className="btn btn-primary rounded-circle shadow"
                title="Messenger"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-messenger"></i>
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                href={`https://zalo.me/${store.zalo}`}
                className="btn btn-info rounded-circle shadow p-0"
                title="Zalo"
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: "40px", height: "40px" }}
              >
                <img
                  src="https://imgs.search.brave.com/1Rr1DxgEtlp2efPxOo3atZYBUk5_NzaoTtj2PAuDZyc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmFu/ZGxvZ29zLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8x/MS96YWxvLWxvZ28t/NTEyeDUxMi5wbmc"
                  alt="Zalo"
                  style={{ width: "40px" }}
                />
              </motion.a>
            </>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;
