// We can create a Navbar.tsx file in components. This will contain an exportable navbar display component, which we can import into LinesPage.tsx. The navbar component will be displayed with the props for their specific lines. 

// We also want four filter buttons to be displayed titled 'Arriving', 'Scheduled', 'Northbound', and 'Southbound' on each of the pages. For the green and blue lines, use 'Eastbound' and 'Westbound' instead of 'Northbound' and 'Southbound'.

// new ideas for navigation: add a navbar component that has a home and about button 
// home on the top left (picture of marta logo that is clickable button)
// about on the top right (text button)

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavBarProps {
  color: string;
  stations: string[] | null;
  selectedStation: string | null;
  onSelectStation: (station: string | null) => void;
}

export default function NavBar({ stations, selectedStation, onSelectStation}: NavBarProps) {
  const navigate = useNavigate();
  const location = useLocation(); //currentpage

  return (
    <>
      <button onClick={() => onSelectStation(null)}>
        All Stations
      </button>

      {stations?.map((station) => (
        <button
          key={station}
          onClick={() => onSelectStation(selectedStation === station ? null : station)}
        >
          {station.replace(" STATION", "")}
        </button>
      ))}
    </>
  )
}
