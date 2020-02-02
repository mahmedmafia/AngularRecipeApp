import { Directive, HostListener, HostBinding, } from '@angular/core';

@Directive({
    selector: '[appDropdown]',
})
export class DropdownDirective {

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
