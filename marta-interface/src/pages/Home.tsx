import { Link } from 'react-router-dom';
import martaLogo from '../assets/marta_logo.png';

const LINE_INFO = [
  { key: 'GOLD',  label: 'Gold Line',  path: '/lines/gold'  },
  { key: 'RED',   label: 'Red Line',   path: '/lines/red'   },
  { key: 'GREEN', label: 'Green Line', path: '/lines/green' },
  { key: 'BLUE',  label: 'Blue Line',  path: '/lines/blue'  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header: MARTA centered, About top-right */}
      <header className="flex items-center px-6 py-4 border-b border-gray-200">
        <div className="flex-1" />
        <h1 className="flex-1 text-center text-2xl font-black tracking-widest text-gray-900">MARTA</h1>
        <div className="flex-1 flex justify-end">
          <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            About MARTA
          </Link>
        </div>
      </header>

      {/* Two-column layout: links left, image right */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 px-12 py-12 items-start">

        <div>
          <h2 className="text-4xl font-black uppercase tracking-tight text-gray-900 mb-8">
            View Routes Schedule
          </h2>
          <div>
            {LINE_INFO.map((line) => (
              <Link
                key={line.key}
                to={line.path}
                className="block py-4 border-b border-gray-300 text-base font-bold text-gray-900 hover:text-gray-500 transition-colors"
              >
                {line.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <img
            src={martaLogo}
            alt="MARTA logo"
            className="w-full object-contain"
          />
        </div>

      </main>
    </div>
  );
}
