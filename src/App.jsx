import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full bg-green-50"><div className="absolute bottom-auto left-auto right-0 top-0 h-[320px] w-[320px] -translate-x-[182%] translate-y-[5%] rounded-full bg-green-400 opacity-25 blur-[100px]"></div></div>
      <Navbar></Navbar>
      <Outlet />

    </>
  )
}

export default App

