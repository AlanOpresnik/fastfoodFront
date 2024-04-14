import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import '@fontsource-variable/onest';
import Navbar from './components/Navbar/Navbar.jsx'


const router = createHashRouter([
  {
    path: "/",

    element: (
      <>
      <Navbar/>
        <div className='max-w-[1280px] mx-auto'>
          <App />
        </div>

      </>
    ),
  },
  {
    path: "/login",

    element: (
      <>
        <h1>login</h1>
        <Login />

      </>
    ),
  },
  {
    path: "/register",

    element: (
      <>
        <h1>login</h1>
        <Login />

      </>
    ),
  },
]
)



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
