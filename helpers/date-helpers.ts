import dayjs, { PluginFunc } from "dayjs";
import * as calendar from "dayjs/plugin/calendar"; // import plugin

export const noteWizardDateFormat = (date: Date) => {
  // fix types
  dayjs.extend(calendar as unknown as PluginFunc<unknown>);
  return dayjs().calendar(date, {
    sameDay: "h:mm a", // The same day ( 2:30 am )
    lastDay: "[Yesterday at] h:mm a", // The day before ( Yesterday at 2:30 am )
    lastWeek: "[Last] dddd [at] h:mm a", // Last week ( Last Monday at 2:30 am )
    sameElse: "DD/MM/YYYY", // Everything else ( 17/10/2011 )
  });
};
