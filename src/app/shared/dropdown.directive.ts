import { Directive, HostListener, HostBinding, ElementRef, Renderer2, OnInit } from '@angular/core';
import { tryParse } from 'selenium-webdriver/http';

@Directive({
    selector: '[appDropdown]',
})
export class DropdownDirective {
    constructor(private elRef: ElementRef, private render: Renderer2) { }

    /*using The Rendred*/
    // isOpen=false;
    // class: string = 'open';
    // @HostListener('click') click() {
    //     // if (!this.isOpen) {
    //     //     this.render.addClass(this.elRef.nativeElement, this.class);
    //     // } else {
    //     //     this.render.removeClass(this.elRef.nativeElement, this.class);
    //     // }
    // }

    /*Using Host Binding*/
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') click() {

        this.isOpen = !this.isOpen;
    }

}
