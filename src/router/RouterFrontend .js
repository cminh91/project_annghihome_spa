import Home from '../pages/frontend/index';
import Blog from '../pages/frontend/blog/Blog';
import AboutUs from '../pages/frontend/AboutPage';
import NewsEvents from '../pages/frontend/NewsPage';
import ContactPage from '../pages/frontend/ContactPage';
// import AllProduct from '../pages/frontend/product/AllProduct';
// import ProductDetail from '../pages/frontend/product/ProductDetail';
const RouterFrontend = [
    { path: "/", element: <Home /> },  
    { path: "/blog", element: <Blog /> },
    { path: "/gioi-thieu", element: <AboutUs /> },
    { path: "/tin-tuc", element: <NewsEvents /> },
    { path: "/lien-he", element: <ContactPage /> },
];

export default RouterFrontend;