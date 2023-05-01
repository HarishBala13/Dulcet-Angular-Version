import { DOCUMENT } from "@angular/common";
import { Directive } from '@angular/core';
import { AfterViewInit, ElementRef, EventEmitter, Inject, OnDestroy, Output } from "@angular/core";
import { filter, fromEvent, Subscription } from "rxjs";

@Directive({
  selector: '[clickOutside]'
})
export class ClickedOutsideDirective implements AfterViewInit, OnDestroy{
  @Output() clickOutside = new EventEmitter<void>();

  documentClickSubscription:Subscription | undefined;

  constructor(private Element:ElementRef, @Inject(DOCUMENT) private document:Document) { }

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click').pipe(filter((event)=>{
      return !this.isInside(event.target as HTMLElement)
    })).subscribe(()=>{
      this.clickOutside.emit();
    })
  }

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }
  isInside(elementToCheck:HTMLElement):boolean{
    return(
      elementToCheck === this.Element.nativeElement ||
      this.Element.nativeElement.contains(elementToCheck)
    )
  }

}
