import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import type { TrainData, LineColor } from '../types/train'
import { LINE_COLORS, STATIONS } from "../types/train";
import NavBar from '../components/NavBar'
import TrainList from '../components/TrainList'

// the whole interface 
const API_BASE = "https://midsem-bootcamp-api.onrender.com";

export default function LinesPage() {
  const { color } = useParams();
  const navigate = useNavigate();

  const lineColor = color?.toUpperCase() as LineColor | undefined;
  const safeColor: LineColor = LINE_COLORS.includes(lineColor as LineColor)
    ? (lineColor as LineColor)
    : "GOLD";

  const [trainData, setTrainData] = useState<TrainData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStation, setSelectedStation] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());


  const fetchArrivals = async (line: LineColor) => {
    const response = await fetch(`${API_BASE}/arrivals/${line?.toLowerCase()}`);
    const data = await response.json();
    setTrainData(data);
  }

  const fetchStations = async (line: LineColor) => {
    const response = await fetch(`${API_BASE}/stations/${line?.toLowerCase()}`);
    const data = await response.json();
    console.log(data);
    setLoading(false);
  }

  useEffect(() => {
    setSelectedStation(null);
    setActiveFilters(new Set());
    setLoading(true);
    setTrainData(null);

    fetchArrivals(safeColor);
    fetchStations(safeColor);
  }, [safeColor]);

  function toggleFilter(filter: string) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filter)) next.delete(filter);
      else next.add(filter);
      return next;
    });
  }

  return (
    <div>
      {/* Line switcher */}
      <header>
        <span>MARTA</span>
        {LINE_COLORS.map((lc) => (
          <button
            key={lc}
            onClick={() => navigate(`/lines/${lc.toLowerCase()}`)}
          >
            {lc.charAt(0) + lc.slice(1).toLowerCase()}
          </button>
        ))}
      </header>

      {/* Station navbar */}
      <NavBar
        color={safeColor}
        stations={STATIONS[safeColor]}
        selectedStation={selectedStation}
        onSelectStation={setSelectedStation}
      />

      {loading && <p>Loading...</p>}

      {/* Train list */}
      <main>
        <TrainList
          color={safeColor}
          data={trainData}
          selectedStation={selectedStation}
          activeFilters={activeFilters}
          onToggleFilter={toggleFilter}
        />
      </main>
    </div>
  );
}
