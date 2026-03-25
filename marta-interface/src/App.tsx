import { BrowserRouter, Route, Routes } from 'react-router'
import LinesPage from './pages/LinesPage'
import About from './pages/About'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lines/:color" element={<LinesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
