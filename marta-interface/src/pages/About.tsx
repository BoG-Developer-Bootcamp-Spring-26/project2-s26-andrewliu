import { Link } from "react-router-dom";

const LINE_INFO = [
  { color: 'GOLD',  hex: '#E4A820', desc: 'Airport ↔ Doraville' },
  { color: 'RED',   hex: '#CE2939', desc: 'Airport ↔ North Springs' },
  { color: 'BLUE',  hex: '#009AD6', desc: 'H.E. Holmes ↔ Indian Creek' },
  { color: 'GREEN', hex: '#4BA54B', desc: 'Bankhead ↔ Edgewood' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header: MARTA centered, Home top-right */}
      <header className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex-1" />
        <span className="flex-1 text-center text-2xl font-black tracking-widest text-gray-900">MARTA</span>
        <div className="flex-1 flex justify-end">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            ← Home
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 flex flex-col gap-8 w-full">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">About MARTA</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            The Metropolitan Atlanta Rapid Transit Authority (MARTA) is the primary public
            transportation operator in the Atlanta metropolitan area. MARTA operates heavy-rail
            rapid transit, bus rapid transit, and bus service across the region, connecting
            communities from the airport to the northern suburbs.
          </p>
        </div>

        {/* System map */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">System Map</h2>
          <img
            src="/images/marta-map.png"
            alt="MARTA system map"
            className="w-full border border-gray-200"
          />
        </div>

        {/* Rail lines list */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">Rail Lines</h2>
          <div className="flex flex-col">
            {LINE_INFO.map((line) => (
              <div key={line.color} className="flex items-center gap-3 py-3 border-b border-gray-200">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: line.hex }} />
                <span className="text-sm font-semibold text-gray-900">
                  {line.color.charAt(0) + line.color.slice(1).toLowerCase()} Line
                </span>
                <span className="text-sm text-gray-400 ml-auto">{line.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <Link to="/" className="self-start text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          ← Return to Home
        </Link>
      </main>
    </div>
  );
}
