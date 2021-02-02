import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterData'
})
export class FilterDataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const data = value.filter(item => {
        return item.Name === args;
      });
      return data.length ? data[0].Value : '--';
    } else {
      return '--';
    }
  }

}
