import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { TrainData, LineColor } from '../types/train';
import { LINE_COLORS, STATIONS } from "../types/train";
import NavBar from '../components/NavBar';
import TrainList from '../components/TrainList';

const API_BASE = "/api";

// Hex values used in inline styles — bypasses Tailwind static analysis entirely
const LINE_HEX: Record<string, string> = {
  GOLD:  "#E4A820",
  RED:   "#CE2939",
  BLUE:  "#009AD6",
  GREEN: "#4BA54B",
};

const LINE_TEXT: Record<string, string> = {
  GOLD:  "#000000",
  RED:   "#ffffff",
  BLUE:  "#ffffff",
  GREEN: "#ffffff",
};

export default function LinesPage() {
  const { color } = useParams();
  const navigate = useNavigate();

  const lineColor = color?.toUpperCase() as LineColor | undefined;
  const safeColor: LineColor = LINE_COLORS.includes(lineColor as LineColor)
    ? (lineColor as LineColor)
    : "GOLD";

  const [trainData, setTrainData] = useState<TrainData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);
  const [stations, setStations] = useState<string[] | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const fetchArrivals = async (line: LineColor) => {
    try {
      const response = await fetch(`${API_BASE}/arrivals/${line?.toLowerCase()}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      console.log('arrivals response:', data);
      setTrainData(Array.isArray(data) ? data : data.trainList ?? []);
    } catch (err) {
      console.error('fetchArrivals failed:', err);
      setError('Failed to load arrivals. The API may be waking up — try again in a moment.');
      setTrainData([]);
    } finally {
      setLoading(false);
    }
  }

  const fetchStations = async (line: LineColor) => {
    try {
      const response = await fetch(`${API_BASE}/stations/${line?.toLowerCase()}`);
      const data = await response.json();
      console.log('stations response:', data);
      // API returns an array of station name strings
      const list: string[] = Array.isArray(data) ? data : data.stations ?? [];
      setStations(list.length > 0 ? list : STATIONS[line]);
    } catch (err) {
      console.error('fetchStations failed:', err);
      // Fall back to hardcoded list
      setStations(STATIONS[line]);
    }
  }

  useEffect(() => {
    setSelectedStation(null);
    setActiveFilters(new Set());
    setLoading(true);
    setTrainData(null);
    setStations(null);
    setError(null);

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
    <div className="flex flex-col h-screen bg-white">

      {/* Line switcher — solid colored rectangular buttons across the top */}
      <div className="flex border-b border-gray-200">
        <Link to="/" className="flex items-center px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 border-r border-gray-200 transition-colors">
          ← Home
        </Link>
        {LINE_COLORS.map((lc) => {
          const isActive = safeColor === lc;
          return (
            <button
              key={lc}
              onClick={() => navigate(`/lines/${lc.toLowerCase()}`)}
              style={isActive
                ? { backgroundColor: LINE_HEX[lc], color: LINE_TEXT[lc] }
                : { backgroundColor: '#ffffff', color: '#1a1a1a' }
              }
              className="flex-1 py-3 text-sm font-bold tracking-wide border-r border-gray-200 last:border-r-0 transition-colors"
            >
              {lc.charAt(0) + lc.slice(1).toLowerCase()}
            </button>
          );
        })}
      </div>

      {/* Line name heading */}
      <div className="text-center py-4 border-b border-gray-200">
        <h1 className="text-3xl font-black tracking-widest text-gray-900">{safeColor}</h1>
      </div>

      {/* Thin loading bar */}
      {loading && (
        <div className="h-0.5 w-full bg-gray-100">
          <div
            className="h-full w-1/3 animate-pulse"
            style={{ backgroundColor: LINE_HEX[safeColor] }}
          />
        </div>
      )}

      {/* Sidebar + main content side by side */}
      <div className="flex flex-1 min-h-0">
        <NavBar
          color={safeColor}
          lineHex={LINE_HEX[safeColor]}
          stations={stations ?? STATIONS[safeColor]}
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
        />

        <main className="flex-1 overflow-y-auto">
          {error && (
            <div className="mx-4 mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {error}
            </div>
          )}
          <TrainList
            color={safeColor}
            lineHex={LINE_HEX[safeColor]}
            data={trainData}
            loading={loading}
            selectedStation={selectedStation}
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
          />
        </main>
      </div>
    </div>
  );
}
