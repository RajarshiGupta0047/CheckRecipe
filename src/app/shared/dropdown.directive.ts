import {Directive,HostBinding,HostListener} from '@angular/core'
@Directive(
    {
        selector:'[appDirective]'
    }
)
export class DropDownDirective{

    @HostBinding('class.open')status=false;

    @HostListener('click')toggleOpen(){
        this.status=!this.status;
    }


}