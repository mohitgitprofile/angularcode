import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[onlyNumber]'
})

export class OnlyNumberDirective {
    constructor() { }

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        console.log(event)
        let e = <KeyboardEvent> event;
        if ( (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode ==8 || (e.keyCode >= 35 && e.keyCode <= 39) || ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1) ) {
            // console.log('if')
            return;
        } else {
            // console.log('else')
            e.preventDefault();
            
        }
    }
}