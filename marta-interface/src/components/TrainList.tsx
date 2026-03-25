import { useMemo } from "react";
import type { TrainData, LineColor } from "../types/train";
import { getDirectionLabels, getDirectionCodes } from "../types/train";
import Train from "./Train";

interface TrainListProps {
  color: LineColor;
  lineHex: string;
  data: TrainData[] | null;
  loading: boolean;
  selectedStation: string | null;
  activeFilters: Set<string>;
  onToggleFilter: (filter: string) => void;
}

export default function TrainList({
  color, lineHex, data, loading, selectedStation, activeFilters, onToggleFilter,
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
    <div className="flex flex-col">

      {/* Filter buttons */}
      <div className="flex justify-center gap-4 px-4 py-3 border-b border-gray-200">
        {filterButtons.map((label) => {
          const isActive = activeFilters.has(label);
          return (
            <button
              key={label}
              onClick={() => onToggleFilter(label)}
              style={isActive ? { borderColor: lineHex, color: lineHex } : {}}
              className={`px-8 py-1.5 text-sm border rounded transition-all
                ${isActive
                  ? 'opacity-60'
                  : 'border-gray-300 text-gray-600 hover:border-gray-500 hover:text-gray-900'
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Train cards */}
      {loading || filtered === null ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div
            className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-current animate-spin"
            style={{ borderTopColor: lineHex }}
          />
          <p className="text-sm text-gray-400">Loading trains…</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-16 text-sm">No current trains match filters</p>
      ) : (
        <div>
          {filtered.map((train) => (
            <Train key={`${train.TRAIN_ID}-${train.STATION}`} train={train} lineHex={lineHex} />
          ))}
        </div>
      )}
    </div>
  );
}
