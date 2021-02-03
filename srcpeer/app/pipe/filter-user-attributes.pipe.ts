import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUserAttributes'
})
export class FilterUserAttributesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      let data = value.filter(item => {
        return item.Name === args;
      });
      console.log('data ===>>',data)
      if(data.length) {
        return data[0].Value;
      } else {
        return '--';
      }
      
    } else {
      return '--';
    }
  }

}
