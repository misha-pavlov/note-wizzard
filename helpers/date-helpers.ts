import dayjs from "dayjs";

export const noteWizardDateFormat = (date: Date) => {
  dayjs.extend(require("dayjs/plugin/calendar"));
  // fix calendar doesn't exist in dayjs because actually it is in dayjs
  // @ts-ignore
  return dayjs().calendar(date, {
    sameDay: "h:mm a", // The same day ( 2:30 am )
    lastDay: "[Yesterday at] h:mm a", // The day before ( Yesterday at 2:30 am )
    lastWeek: "[Last] dddd [at] h:mm a", // Last week ( Last Monday at 2:30 am )
    sameElse: "DD/MM/YYYY", // Everything else ( 17/10/2011 )
  });
};
