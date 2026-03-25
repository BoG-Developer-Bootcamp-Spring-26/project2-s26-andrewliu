export interface TrainData {
  DESTINATION: string;
  DIRECTION: string;
  EVENT_TIME: string;
  LINE: string;
  NEXT_ARR: string;
  STATION: string;
  TRAIN_ID: string;
  WAITING_SECONDS: string;
  WAITING_TIME: string;
  DELAY: string;
}

export type LineColor = "GOLD" | "RED" | "BLUE" | "GREEN";

export const LINE_COLORS: LineColor[] = ["GOLD", "RED", "BLUE", "GREEN"];

export const STATIONS: Record<LineColor, string[]> = {
  GOLD: [
    "AIRPORT STATION",
    "ARTS CENTER STATION",
    "BROOKHAVEN STATION",
    "BUCKHEAD STATION",
    "CIVIC CENTER STATION",
    "DORAVILLE STATION",
    "DUNWOODY STATION",
    "FIVE POINTS STATION",
    "GARNETT STATION",
    "LENOX STATION",
    "LINDBERGH STATION",
    "MEDICAL CENTER STATION",
    "MIDTOWN STATION",
    "NORTH SPRINGS STATION",
    "PEACHTREE CENTER STATION",
    "SANDY SPRINGS STATION",
    "WEST END STATION",
  ],
  RED: [
    "AIRPORT STATION",
    "ARTS CENTER STATION",
    "CIVIC CENTER STATION",
    "FIVE POINTS STATION",
    "GARNETT STATION",
    "LINDBERGH STATION",
    "MIDTOWN STATION",
    "NORTH AVENUE STATION",
    "PEACHTREE CENTER STATION",
    "WEST END STATION",
    "OAKLAND CITY STATION",
    "LAKEWOOD STATION",
    "EAST POINT STATION",
    "COLLEGE PARK STATION",
  ],
  BLUE: [
    "ARTS CENTER STATION",
    "ASHBY STATION",
    "AVONDALE STATION",
    "DECATUR STATION",
    "EAST LAKE STATION",
    "EDGEWOOD CANDLER PARK STATION",
    "FIVE POINTS STATION",
    "GEORGIA STATE STATION",
    "HAMILTON E HOLMES STATION",
    "INDIAN CREEK STATION",
    "INMAN PARK STATION",
    "KENSINGTON STATION",
    "KING MEMORIAL STATION",
    "VINE CITY STATION",
  ],
  GREEN: [
    "ASHBY STATION",
    "BANKHEAD STATION",
    "EDGEWOOD CANDLER PARK STATION",
    "FIVE POINTS STATION",
    "GEORGIA STATE STATION",
    "VINE CITY STATION",
    "GWCC/CNN CENTER STATION",
    "INMAN PARK STATION",
    "KING MEMORIAL STATION",
  ],
};

export function getDirectionLabels(line: LineColor): [string, string] {
  if (line === "GREEN" || line === "BLUE") {
    return ["Eastbound", "Westbound"];
  }
  return ["Northbound", "Southbound"];
}

export function getDirectionCodes(line: LineColor): [string, string] {
  if (line === "GREEN" || line === "BLUE") {
    return ["E", "W"];
  }
  return ["N", "S"];
}
