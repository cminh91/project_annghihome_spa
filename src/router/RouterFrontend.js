import Home from '../pages/frontend/index';
import Blog from '../pages/frontend/blog/Blog';
import AboutUs from '../pages/frontend/AboutPage';
import ContactPage from '../pages/frontend/ContactPage';
import ServicePages from '../pages/frontend/Services';
import CategoryDetail from '../pages/frontend/CategoryDetail'
import ServiceDetail from '../pages/frontend/service/ServiceDetail';
import ProductPage from '../pages/frontend/ProductPages';
import ProductDetail from '../pages/frontend/product/ProductDetail';
import TeamList from '../pages/frontend/team/TeamList';
import BlogDetail from '../pages/frontend/blog/BlogDetail';
// import LoginForm from '../pages/frontend/acount/login';

// import RegisterForm from '../pages/frontend/acount/register';

const RouterFrontend = [
    { path: "/", element: <Home /> },  
    // {path:'/login',element:<LoginForm/>},
    // {path:'/register', element:<RegisterForm/>},
    { path: "/blog", element: <Blog /> },
    { path: "/gioi-thieu", element: <AboutUs /> },
    { path: "/lien-he", element: <ContactPage /> },
    { path :"/dich-vu",element:<ServicePages/>},
    { path :"/dich-vu/:id",element:<ServiceDetail />},
    {path: '/san-pham',element:<ProductPage/>},
    {path: '/san-pham/:slug',element:<ProductDetail/>},
    {path:"/category/:slug", element:<CategoryDetail />},
    {path:"/doi-ngu-nhan-su",element:<TeamList/>},
    {path :"/blog/:slug",element:<BlogDetail/>}
];

export default RouterFrontend;