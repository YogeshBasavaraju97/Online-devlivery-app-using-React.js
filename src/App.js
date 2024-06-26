import React, { lazy, Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Body from './Components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import About from './Components/About';
import Contact from './Components/Contact';
import Error from './Components/Error';
import RestaurantMenu from './Components/RestaurantMenu';
import { useState, useEffect } from 'react';
// import Grocery from './Components/Grocery';
import UserContext from '../utils/UserContext';
import { Provider } from 'react-redux';
import appStore from '../utils/appStore';
import Cart from './Components/Cart';

const Grocery = lazy(() => import('./Components/Grocery'));
const About = lazy(() => import('./Components/About'));
const AppLayout = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const data = {
      name: 'yogesh',
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: (
          <Suspense>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<h1>Looooooooding.......</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: '/restaurant/:resId',
        element: <RestaurantMenu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);

const Head = () => {
  return <div>hello</div>;
};
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
