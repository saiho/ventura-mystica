import { Pipe, PipeTransform } from '@angular/core';
import { DateTime, DateTimeFormatOptions } from 'luxon';

@Pipe({ name: 'dateint' })
export class DateIntPipe implements PipeTransform {

  transform(value: string | Date | DateTime, format: DateTimeFormatOptions | null = null): string {
    if (!value || value === '') {
      return '';
    }

    let dt: DateTime;
    if (typeof value === 'string') {
      dt = DateTime.fromISO(value);
    } else if (value instanceof Date) {
      dt = DateTime.fromJSDate(value);
    } else if (value instanceof DateTime) {
      dt = value;
    } else {
      return '';
    }
    if (!format) {
      format = DateTime.DATETIME_MED;
    }
    return dt.toLocaleString(format);
  }

}
