import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import About from './pages/About'
import LinesPage from './pages/LinesPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lines/:lineColor" element={<LinesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
