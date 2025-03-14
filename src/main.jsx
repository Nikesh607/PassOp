import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Manager from './components/Manager.jsx';
import Loginpage from '../pages/loginpage.jsx';
const router = createBrowserRouter([
  {
    path:"/",
    element: <App />, 
    children: [
      {
        path: "",
        element: <Loginpage /> 
      },
      {
        path: "home",
        element: <Manager/>,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact", 
        element: <Contact />,
      },
    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)