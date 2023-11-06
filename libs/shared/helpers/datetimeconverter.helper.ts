/**
 *
 * @param date A number in seconds, not millisenconds
 * @returns date and time formatted as dd/mm/yyyy hh:mm:ss
 */
export const formatDateAndTime = (date) => {
  if (!date) return '';

  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'medium' })
    .format(new Date(date * 1000))
    .replace(',', '');
};
