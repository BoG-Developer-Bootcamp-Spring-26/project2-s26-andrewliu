interface NavBarProps {
  color: string;
  lineHex: string;
  stations: string[] | null;
  selectedStation: string | null;
  onSelectStation: (station: string | null) => void;
}

export default function NavBar({ lineHex, stations, selectedStation, onSelectStation }: NavBarProps) {
  return (
    <aside className="w-52 shrink-0 bg-gray-900 flex flex-col overflow-y-auto">
      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold px-4 pt-4 pb-2">
        Select your starting station
      </p>

      <button
        onClick={() => onSelectStation(null)}
        style={selectedStation === null ? { borderLeftColor: lineHex, borderLeftWidth: 3 } : {}}
        className={`w-full text-left px-4 py-3 text-sm border-b border-gray-700 transition-colors
          ${selectedStation === null
            ? 'text-white font-semibold bg-gray-800'
            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
      >
        All Stations
      </button>

      {stations?.map((station) => {
        const isActive = selectedStation === station;
        return (
          <button
            key={station}
            onClick={() => onSelectStation(isActive ? null : station)}
            style={isActive ? { borderLeftColor: lineHex, borderLeftWidth: 3 } : {}}
            className={`w-full text-left px-4 py-3 text-sm border-b border-gray-700 transition-colors
              ${isActive
                ? 'text-white font-semibold bg-gray-800'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
          >
            {station.replace(' STATION', '')}
          </button>
        );
      })}
    </aside>
  );
}
