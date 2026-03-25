import { Link } from "react-router-dom";

const LINE_INFO = [
  { color: "GOLD", desc: "Airport ↔ Doraville" },
  { color: "RED", desc: "Airport ↔ North Springs" },
  { color: "BLUE", desc: "H.E. Holmes ↔ Indian Creek" },
  { color: "GREEN", desc: "Bankhead ↔ Edgewood" },
];

export default function About() {
  return (
    <>
      <header>
        <span>MARTA</span>
        <Link to="/">Home</Link>
      </header>

      <main>
        <h1>About MARTA</h1>
        <p>
          The Metropolitan Atlanta Rapid Transit Authority (MARTA) is the primary public
          transportation operator in the Atlanta metropolitan area. MARTA operates heavy-rail
          rapid transit, bus rapid transit, and bus service across the region, connecting
          communities from the airport to the northern suburbs.
        </p>

        <h2>Rail Lines</h2>
        <div>
          {LINE_INFO.map((line) => (
            <div key={line.color}>
              <span>{line.color.charAt(0) + line.color.slice(1).toLowerCase()} Line</span>
              <span>{line.desc}</span>
            </div>
          ))}
        </div>

        <Link to="/">← Return to Home</Link>
      </main>
    </>
  )
}
