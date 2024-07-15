// convert seconds into hh:mm:ss
// export const secondsToHms = (seconds) => {
//     if (!seconds) return "00:00:00"
//     seconds = parseInt(seconds);
//     const duration = seconds;
//     const hours = duration / 3600;
//     const hoursFormatted = hours >= 1 ? `${Math.floor(hours)}:` : "";
//     const minutes = (hours % 1) * 60;
//     const minutesFormatted = `${Math.floor(minutes)}:`;
//     const secondsFormatted = Math.floor((minutes % 1) * 60);
//     return `${hoursFormatted}${minutesFormatted}${secondsFormatted}`;
// }
// convert seconds into hh mm ss
// hour should be 00 if hour is 0
// minute should be 00 if minute is 0

import { Box } from "@mui/material";
import { CONSTANTS } from "./Constants";

export const secondsToHm = (seconds) => {
  if (!seconds) return "00:00:00";
  seconds = parseInt(seconds);
  const duration = seconds;
  const hours = duration / 3600;
  const hoursFormatted = hours >= 1 ? `${Math.floor(hours)}h` : "";
  const minutes = (hours % 1) * 60;
  const minutesFormatted = `${Math.floor(minutes)}`;
  return `${hoursFormatted} ${minutesFormatted}m`;
};

// second should be 00 if second is 0
export const secondsToHms = (seconds) => {
  if (!seconds) return "00:00:00";
  seconds = parseInt(seconds);
  const duration = seconds;
  const hours = duration / 3600;
  const hoursFormatted = hours >= 1 ? `${Math.floor(hours)}` : "00";
  const minutes = (hours % 1) * 60;
  const minutesFormatted = `${Math.floor(minutes)}`;
  const secondsFormatted = Math.floor((minutes % 1) * 60);
  return `${hoursFormatted}h ${minutesFormatted}m ${secondsFormatted}s`;
};
export const secondsToHms2 = (seconds) => {
  if (!seconds) return "00:00:00";
  seconds = parseInt(seconds);
  const duration = seconds;
  const hours = duration / 3600;
  const hoursFormatted = hours >= 1 ? `${Math.floor(hours)}` : "00";
  const minutes = (hours - hoursFormatted) * 60;
  const minutesFormatted = `${Math.floor(minutes)}`;
  const secondsFormatted = Math.floor((minutes - minutesFormatted) * 60);
  return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
};
export const conlog = (x) => {
  if (CONSTANTS.debug) console.log(x);
};

export function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear() % 100;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return (
    <>
      <Box>
        {day} {months[monthIndex]} {year}
      </Box>
      <Box>
        {formattedHours < 10 ? "0" + formattedHours : formattedHours}:
        {minutes < 10 ? "0" + minutes : minutes} {amOrPm}
      </Box>
    </>
  );
}

export function formatDate2(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear() % 100;

  return (
    <>
      <Box>
        {day} {months[monthIndex]} {year}
      </Box>
    </>
  );
}
