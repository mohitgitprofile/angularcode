import { Pipe, PipeTransform } from '../index';

@Pipe({
    name: 'limitTo'
})

export class LimitToPipe implements PipeTransform {
    constructor() {}
    transform(value, args) {
        // console.log(`value => ${value} , args => ${args}`)
        return value.substr( 0, parseInt(args) )
        // console.log(value.substr( 0, parseInt(args) ))
    }
}