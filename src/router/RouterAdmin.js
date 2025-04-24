import Dashboard from '../pages/admin/Dashboard';
import Loginpage from '../pages/admin/LoginPage';




import BlogPage from '../pages/admin/blog/BlogPage';
import BlogEdit from '../pages/admin/blog/BlogEdit';
import BlogTrash from '../pages/admin/blog/BlogTrash';

import ProductPage from '../pages/admin/product/ProductPage';
import ProductTrash from '../pages/admin/product/ProductTrash';
import ProductEdit from '../pages/admin/product/lib/editform';

import CategoryPage from '../pages/admin/category/CategoryPage';
import CategoryTrash from '../pages/admin/category/CatrgoryTrash';

import IntroPage from '../pages/admin/intro/IntroPage';
import IntroTrash from '../pages/admin/intro/IntroTrash';

import ContactPage from '../pages/admin/contact/ContactPage';
import ContactTrash from '../pages/admin/contact/ContactTrash';

import ServicePage from '../pages/admin/service/ServicePage';
import ServiceTrash from '../pages/admin/service/ServiceTrash';

import ImagePage from '../pages/admin/image/ImagePage';
import VideoPage from '../pages/admin/video/VideoPage';

import SliderPage from '../pages/admin/banner/SliderPage';
import SliderTrash from '../pages/admin/banner/SliderTrash';

import AboutPage from '../pages/admin/about/AboutPage';
import AboutTrash from '../pages/admin/about/AboutTrash';

import StorePage from '../pages/admin/store/StorePage';
import StoreTrash from '../pages/admin/store/StoreTrash';

import TeamPage from '../pages/admin/teams/TeamPage';
import TeamTrash from '../pages/admin/teams/TeamTrash';

import PartnerPage from '../pages/admin/partner/PartnerPage';
import PartnerTrash from '../pages/admin/partner/PartnerTrash';

import StoreInforPage from '../pages/admin/storeinfor/StoreInforPage';
import StoreInforTrash from '../pages/admin/storeinfor/StoreInforTrash';

import PolicyPage from '../pages/admin/policy/PolicyPage';
import PolicyTrash from '../pages/admin/policy/PolicyTrash';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const RouterAdmin = [
  { path: '/admin/login', element: <PublicRoute><Loginpage /></PublicRoute> },
  { path: '/admin', element: <PrivateRoute><Dashboard /></PrivateRoute> },

  { path: '/admin/blog', element: <PrivateRoute><BlogPage /></PrivateRoute> },
  { path: '/admin/blog/edit', element: <PrivateRoute><BlogEdit /></PrivateRoute> },
  { path: '/admin/blog/trash', element: <PrivateRoute><BlogTrash /></PrivateRoute> },

  { path: '/admin/product', element: <PrivateRoute><ProductPage /></PrivateRoute> },
  { path: '/admin/product/create', element: <PrivateRoute><ProductPage /></PrivateRoute> },
  { path: '/admin/product/trash', element: <PrivateRoute><ProductTrash /></PrivateRoute> },
  { path: '/admin/product/edit', element: <PrivateRoute><ProductEdit /></PrivateRoute> },

  { path: '/admin/category', element: <PrivateRoute><CategoryPage /></PrivateRoute> },
  { path: '/admin/category/trash', element: <PrivateRoute><CategoryTrash /></PrivateRoute> },

  { path: '/admin/intro', element: <PrivateRoute><IntroPage /></PrivateRoute> },
  { path: '/admin/intro/trash', element: <PrivateRoute><IntroTrash /></PrivateRoute> },

  { path: '/admin/contact', element: <PrivateRoute><ContactPage /></PrivateRoute> },
  { path: '/admin/contact/trash', element: <PrivateRoute><ContactTrash /></PrivateRoute> },

  { path: '/admin/service', element: <PrivateRoute><ServicePage /></PrivateRoute> },
  { path: '/admin/service/trash', element: <PrivateRoute><ServiceTrash /></PrivateRoute> },

  { path: '/admin/image', element: <PrivateRoute><ImagePage /></PrivateRoute> },
  {path : '/admin/video', element:<PrivateRoute><VideoPage /></PrivateRoute> },


  { path: '/admin/slider', element: <PrivateRoute><SliderPage /></PrivateRoute> },
  { path: '/admin/slider/trash', element: <PrivateRoute><SliderTrash /></PrivateRoute> },

  { path: '/admin/about', element: <PrivateRoute><AboutPage /></PrivateRoute> },
  { path: '/admin/about/trash', element: <PrivateRoute><AboutTrash /></PrivateRoute> },

  { path: '/admin/store', element: <PrivateRoute><StorePage /></PrivateRoute> },
  { path: '/admin/store/trash', element: <PrivateRoute><StoreTrash /></PrivateRoute> },

  { path: '/admin/team', element: <PrivateRoute><TeamPage /></PrivateRoute> },
  { path: '/admin/team/trash', element: <PrivateRoute><TeamTrash /></PrivateRoute> },

  { path: '/admin/partner', element: <PrivateRoute><PartnerPage /></PrivateRoute> },
  { path: '/admin/partner/trash', element: <PrivateRoute><PartnerTrash /></PrivateRoute> },

  { path: '/admin/storeinfor', element: <PrivateRoute><StoreInforPage /></PrivateRoute> },
  { path: '/admin/storeinfor/trash', element: <PrivateRoute><StoreInforTrash /></PrivateRoute> },

  { path: '/admin/policy', element: <PrivateRoute><PolicyPage /></PrivateRoute> },
  { path: '/admin/policy/trash', element: <PrivateRoute><PolicyTrash /></PrivateRoute> },
];

export default RouterAdmin;
