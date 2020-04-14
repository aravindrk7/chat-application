import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value = new Date(value);
    let minutes = (value.getMinutes() < 10) ? '0' + value.getMinutes() : value.getMinutes();
    let period = (value.getHours() >= 12) ? 'PM' : 'AM';
    let hours = (value.getHours() > 12) ? value.getHours() % 12 : value.getHours();

    value = hours + ' : ' + minutes + ' ' + period;
    return value;
  }

}
