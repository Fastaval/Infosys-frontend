import TimeAgo from 'javascript-time-ago';
import da from 'javascript-time-ago/locale/da';

TimeAgo.addDefaultLocale(da);

export const timeAgo = (input) => {
  const timeAgo = new TimeAgo('da-DK');
  if (!input) return '-';
  const date = input.toString().length <= 10 ? input * 1000 : input;
  return timeAgo.format(new Date(date));
};
