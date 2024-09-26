import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getTimeDifference = (start: string, end: string) => {
  const diff = dayjs.duration(dayjs(Number(end) * 1000).diff(dayjs(Number(start) * 1000)));
  const seconds = diff.seconds();
  const minutes = diff.minutes();
  const hours = diff.hours();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};