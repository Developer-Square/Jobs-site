export const millisecondsToDaysHoursMinutesSeconds = (milliSeconds) => {
  var milliseconds, days, hours, minutes, seconds;

  if (milliSeconds > 0) {
    milliseconds = milliSeconds;
    days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    if (days < 0) {
      days = 0;
    }
    milliseconds -= days * 24 * 60 * 60 * 1000;

    hours = Math.floor(milliseconds / (60 * 60 * 1000));
    if (hours < 0) {
      hours = 0;
    }
    milliseconds -= hours * 60 * 60 * 1000;

    minutes = Math.floor(milliseconds / (60 * 1000));
    if (minutes < 0) {
      minutes = 0;
    }
    milliseconds -= minutes * 60 * 1000;

    seconds = Math.floor(milliseconds / 1000);
    if (seconds < 0) {
      seconds = 0;
    }
  } else {
    days = hours = minutes = seconds = 0;
  }

  return { days: days, hours: hours, minutes: minutes, seconds: seconds };
};
