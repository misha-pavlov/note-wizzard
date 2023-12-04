import dayjs from "dayjs";

export const noteWizardDateFormat = (date: Date) => {
  dayjs.extend(require("dayjs/plugin/calendar"));
  // fix calendar doesn't exist in dayjs because actually it is in dayjs
  // @ts-ignore
  return dayjs().calendar(date, {
    sameDay: "h:mm a", // The same day ( 2:30 am )
    lastDay: "[Yesterday at] h:mm a", // The day before ( Yesterday at 2:30 am )
    lastWeek: "[Last] dddd [at] h:mm a", // Last week ( Last Monday at 2:30 am )
    sameElse: "MMMM D, YYYY", // Everything else ( August 16, 2018 )
  });
};

export const secondsToMinutesAndSeconds = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = Math.floor(seconds % 60);

  // Add leading zero if seconds is less than 10
  const formattedSeconds: string = remainingSeconds < 10 ? "0" + remainingSeconds : "" + remainingSeconds;

  return `${minutes}:${formattedSeconds}`;
}