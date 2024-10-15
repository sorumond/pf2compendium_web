import React, { } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SpellsPage from './components/SpellsPage/SpellsPage.tsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { RacesPage } from './components/RacesPage/RacesPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/spells/',
        element: <SpellsPage />,
        children: [
          {
            path: '/spells/:id'
          }
        ]
      },
      {
        path: '/races/',
        element: <RacesPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>

);
