import { Moment } from 'moment';

export function formatDate(date: Moment): string {
  return date.format('YYYY-MM-DD');
}
