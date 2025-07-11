import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router'
import Item_page from './pages/Item_page';
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Footer from './components/Footer'
import SearchPage from './pages/SearchPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/men clothing" element={<Item_page key={location.pathname}/>} />
          <Route path="/women clothing" element={<Item_page key={location.pathname}/>} />
          <Route path="/kids clothing" element={<Item_page key={location.pathname}/>} />
          <Route path="/footwear" element={<Item_page key={location.pathname}/>} />
          <Route path="/beauty" element={<Item_page key={location.pathname}/>} />
          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
