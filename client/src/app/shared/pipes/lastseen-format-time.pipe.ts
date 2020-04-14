import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastseenFormatTime'
})
export class LastseenFormatTimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    value = new Date(value);
    const now: any = new Date();
    let time_string = 'last seen on';
    var hours_diff = Math.floor(Math.abs(now - value) / 36e5);
    // console.log(hours_diff);
    // console.log(now.getHours());
    // console.log(value.getHours());
    // console.log(now.getHours() - hours_diff);
    if ((now.getHours() - hours_diff < 0) && (now.getHours() - hours_diff > (now.getHours()) + (-47))) {
      time_string = 'last seen yesterday at'
    }
    else if ((now.getHours() - hours_diff <= (now.getHours()) + (-47))) {
      time_string = 'last seen ' + value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear() + ' at'
    }

    let minutes = (value.getMinutes() < 10) ? '0' + value.getMinutes() : value.getMinutes();
    let period = (value.getHours() >= 12) ? 'PM' : 'AM';
    let hours = (value.getHours() > 12) ? value.getHours() % 12 : value.getHours();

    value = time_string + ' ' + hours + ' : ' + minutes + ' ' + period;
    return value.trim();
  }

}
