import { Pipe, PipeTransform } from '../index';

@Pipe({
    name: 'letterCase'
})

export class LetterCasePipe implements PipeTransform {
    transform(value: string): string {
        // console.log(value)
        if(value)
            return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
        else 
         return ''
    }
}