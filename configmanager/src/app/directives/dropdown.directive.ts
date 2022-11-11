import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Renderer2,
  } from '@angular/core';
  
  @Directive({
    selector: '[appDropdown]',
  })
  export class DropdownDirective implements OnInit {
      @HostBinding('class.open') isOpen2: boolean = false;
  
    constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  
    ngOnInit(): void {}
   
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
      this.isOpen2 = this.elRef.nativeElement.contains(event.target) ? !this.isOpen2 : false;
    }
  
  }
  