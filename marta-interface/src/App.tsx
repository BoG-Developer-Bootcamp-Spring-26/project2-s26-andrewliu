import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import LinesPage from './pages/LinesPage';
import About from './pages/About';
import Home from './pages/Home';

// Wrapper forces a full remount of LinesPage when the color param changes,
// preventing stale-state / race-condition bugs between fetches.
function LinesPageWrapper() {
  const { color } = useParams();
  return <LinesPage key={color} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/lines/:color" element={<LinesPageWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}
