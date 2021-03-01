import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[phoneNumbers]'
})
export class PhoneNumberDirective {
  plusCounter: number = 0;

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9+]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }


  }

}