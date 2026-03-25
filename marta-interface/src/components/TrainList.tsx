// This component should have a prop specifying the line color (i.e. blue, gold, red, or green), and would contain the interface for all trains in the given line. The current line that's being displayed should be stored as a state in the LinesPage component. 
// data should be filtered to only return info for trains that are part of the specific line. For example, for the gold line we only want an array of gold trains.

import { useMemo } from "react";
import type { TrainData, LineColor } from "../types/train";
import { getDirectionLabels, getDirectionCodes } from "../types/train";
import Train from "./Train";

interface TrainListProps {
  color: LineColor;
  data: TrainData[] | null;
  selectedStation: string | null;
  activeFilters: Set<string>;
  onToggleFilter: (filter: string) => void;
}

export default function TrainList({
  color,
  data,
  selectedStation,
  activeFilters,
  onToggleFilter,
}: TrainListProps) {
  const [dir1Label, dir2Label] = getDirectionLabels(color);
  const [dir1Code, dir2Code]   = getDirectionCodes(color);
  const filterButtons = ["Arriving", "Scheduled", dir1Label, dir2Label];

  const filtered = useMemo(() => {
    if (!data) return null;
    return data.filter((train) => {
      if (selectedStation && train.STATION !== selectedStation) return false;
      if (activeFilters.has("Arriving") && train.WAITING_SECONDS !== "0") return false;
      if (activeFilters.has("Scheduled") && train.WAITING_SECONDS === "0") return false;
      if (activeFilters.has(dir1Label) && train.DIRECTION !== dir1Code) return false;
      if (activeFilters.has(dir2Label) && train.DIRECTION !== dir2Code) return false;
      return true;
    });
  }, [data, selectedStation, activeFilters, dir1Label, dir2Label, dir1Code, dir2Code]);

  return (
    <div>
      {/* Filter buttons */}
      <div>
        {filterButtons.map((label) => (
          <button
            key={label}
            onClick={() => onToggleFilter(label)}
          >
            {label} {activeFilters.has(label) ? "(on)" : ""}
          </button>
        ))}
      </div>

      {/* Train cards */}
      {filtered === null ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No current trains match filters</p>
      ) : (
        <div>
          {filtered.map((train) => (
            <Train key={`${train.TRAIN_ID}-${train.STATION}`} train={train} />
          ))}
        </div>
      )}
    </div>
  );
}
