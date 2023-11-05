import TimeAgo from 'javascript-time-ago';

export const timeAgo = (input) => {
  const timeAgo = new TimeAgo('da-DK');
  if (!input) return '-';

  const date = input.toString().length <= 10 ? input * 1000 : input;
  return timeAgo.format(new Date(date));
};
