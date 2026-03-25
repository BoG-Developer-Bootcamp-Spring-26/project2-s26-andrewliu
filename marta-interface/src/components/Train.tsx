import type { TrainData } from "../types/train";

interface TrainProps {
  train: TrainData;
  lineHex: string;
}

export default function Train({ train, lineHex }: TrainProps) {
  const isOnTime = train.DELAY === "T0S";
  const isGold = lineHex === "#E4A820";

  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">

      {/* MARTA M logo */}
      <div className="w-10 h-10 shrink-0 flex items-center justify-center">
        <span className="text-2xl font-black text-gray-900 leading-none">M</span>
      </div>

      {/* Route info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {train.STATION} --&gt; {train.DESTINATION}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: lineHex, color: isGold ? '#000' : '#fff' }}
          >
            {train.LINE}
          </span>
          <span className={`text-xs font-medium ${isOnTime ? 'text-green-600' : 'text-red-500'}`}>
            {isOnTime ? 'On Time' : 'Delayed'}
          </span>
        </div>
      </div>

      {/* Waiting time */}
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-gray-600">{train.WAITING_TIME}</p>
      </div>
    </div>
  );
}
