import Home from '../pages/frontend/index';
import Blog from '../pages/frontend/blog/Blog';
import AboutUs from '../pages/frontend/AboutPage';
import NewsEvents from '../pages/frontend/NewsPage';
import ContactPage from '../pages/frontend/ContactPage';
import ServicePages from '../pages/frontend/Services';
import CategoryDetail from '../pages/frontend/CategoryDetail'
import ServiceDetail from '../pages/frontend/service/ServiceDetail';
import ProductPage from '../pages/frontend/ProductPages';
import ProductDetail from '../pages/frontend/product/ProductDetail';
import ProductWithCategory from '../pages/frontend/product/ProductWithCategory';

const RouterFrontend = [
    { path: "/", element: <Home /> },  
    { path: "/blog", element: <Blog /> },
    { path: "/gioi-thieu", element: <AboutUs /> },
    { path: "/tin-tuc", element: <NewsEvents /> },
    { path: "/lien-he", element: <ContactPage /> },
    { path :"/dich-vu",element:<ServicePages/>},
    { path :"/dich-vu/:id",element:<ServiceDetail />},
    {path: '/san-pham',element:<ProductPage/>},
    {path: '/san-pham/:id',element:<ProductDetail/>},
    {path:"/category/:slug", element:<CategoryDetail />},
    {path:"/dich-vu/:slug",element:<ProductWithCategory/>},
];

export default RouterFrontend;