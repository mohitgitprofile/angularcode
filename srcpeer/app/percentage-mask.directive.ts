import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPercentageMask]'
})
export class PercentageMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }


  onInputChange(event, backspace) {
    console.log(event)
    let newVal = event.replace(/\D/g, ''); 
    newVal = newVal + '%'
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}
