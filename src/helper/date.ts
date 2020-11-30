import moment, { Moment } from 'moment';

export const dateFormat = 'YYYY-MM-DD';

export function formatDate(date: Moment): string {
  return date.format(dateFormat);
}

export interface DateExpired {
  count: moment.DurationInputArg1;
  unit: moment.unitOfTime.DurationConstructor;
}

export function convertExpiredAt(expiredAt: string): DateExpired {
  // only accept day/days now
  const ch = 'd';
  const expired: Array<string> = expiredAt.split(ch);
  const count = Number(expired[0]);
  const unit: string = ch + expired[1];
  const dateExpired: DateExpired = {
    count: <moment.DurationInputArg1>count,
    unit: <moment.unitOfTime.DurationConstructor>unit,
  };
  return dateExpired;
}
