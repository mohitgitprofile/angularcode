import { Pipe, PipeTransform, DomSanitizer } from '../index';


@Pipe({
    name: 'safe'
})

export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(url) {
        let newUrl =  url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : ''
        return newUrl;
    }
}