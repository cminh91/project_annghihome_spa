import { useRoutes } from 'react-router-dom';
import LayoutFrontend from './layouts/frontend/index';
import NotFound from './pages/NotFound';
import RouterFrontend from './router/RouterFrontend';
function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <LayoutFrontend />,
      children: RouterFrontend,
    },
        { path: "*", element: <NotFound /> },
  ]);

  return element;
}
export default App;