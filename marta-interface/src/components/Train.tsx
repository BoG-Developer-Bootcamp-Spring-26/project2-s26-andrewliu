// the design for an exportable Train component that takes in the data for one train and returns the display for it. To display whether or not a train is On Time or Delayed check if DELAY === "T0S" (if the equality is true, it is on time, and if not, we consider it delayed). Display each of the train components for the specified line (first make sure to import the Train component into the file). Hint: You do not need to display each component manually as the number of trains in a line or subject to change. Instead you can use the map and spread functions you learned in Exercise 4 to take in the props at each index and display a component for each train's props.

import React from "react";
import type { TrainData } from "../types/train";

interface TrainProps {
  train: TrainData;
}

export default function Train({ train }: TrainProps) {
  const isOnTime = train.DELAY === "T0S";

  return(
    <>
      <div>
        <span>{train.STATION}{" -> "}{train.DESTINATION}</span>
        <span>{train.NEXT_ARR}</span>
      </div>
      <div>
        <span>{train.LINE}</span>
        <span>Train {train.TRAIN_ID}</span>
        <span>{isOnTime ? "On Time" : "Delayed"}</span>
        <span>{train.WAITING_TIME}</span>
      </div>
    </>
  )
}
