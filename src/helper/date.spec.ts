import { formatDate, convertExpiredAt, DateExpired } from './date';
import moment from 'moment';

describe('date', () => {
  test('formatDate', () => {
    const date: string = formatDate(moment('20111031', 'YYYYMMDD'));
    expect(date).toBe('2011-10-31');
  });

  test('convertExpiredAt 3days', () => {
    const date: DateExpired = convertExpiredAt('3days');
    expect(date.count).toBe(3);
    expect(date.unit).toBe('days');
  });

  test('convertExpiredAt 1day', () => {
    const date: DateExpired = convertExpiredAt('1day');
    expect(date.count).toBe(1);
    expect(date.unit).toBe('day');
  });
});
