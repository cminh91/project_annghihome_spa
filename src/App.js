import { useRoutes } from 'react-router-dom';
import LayoutAdmin from './layouts/admin/index';
import LayoutFrontend from './layouts/frontend/index';
import NotFound from './pages/NotFound';
import RouterAdmin from './router/RouterAdmin';
import RouterFrontend from './router/RouterFrontend ';
function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend />,
      children: RouterFrontend,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: RouterAdmin,
    },
    { path: "*", element: <NotFound /> },
  ]);

  return element;
}
export default App;