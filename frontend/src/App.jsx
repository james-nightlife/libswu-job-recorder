import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LayoutRoot from './layout/LayoutRoot'
import NewReport from './pages/NewReport'
import EditReport from './pages/EditReport'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayoutRoot />}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='new-record' element={<NewReport />} />
        <Route path='*' element={<h1>ไม่พบหน้า</h1>} />
        <Route path='edit/:_id' element={<EditReport />} />
      </Route>
    ),{
      basename: '/job-recorder'
    }
  )


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
