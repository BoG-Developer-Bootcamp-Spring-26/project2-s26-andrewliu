import { Link } from 'react-router-dom';
import { LINE_COLORS } from '../types/train';

import martaLogo from '../assets/marta_logo.png'

export default function Home() {
  return (
    <div>
      <header>
        <span>MARTA</span>
        <Link to="/about">About</Link>"
      </header>

      <main>
        <h1>View Routes & Schedule</h1>
        <p>Select a line to see live arrivals</p>
        
        <div>
          {LINE_COLORS.map((lc) => (
            <Link key={lc} to={`/lines/${lc.toLowerCase()}`}>
              {lc.charAt(0) + lc.slice(1).toLowerCase()} Line
            </Link>
          ))}
        </div>
      </main>
      
      {/* <button><img src={martaLogo} alt="MARTA Logo" />Home</button> */}
    </div>
  )
}
