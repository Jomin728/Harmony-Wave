import { Directive, Input,ComponentRef,ElementRef,ComponentFactoryResolver,Injector,ApplicationRef, ViewContainerRef, HostListener, OnInit, OnDestroy } from '@angular/core';
import { TooltipCompComponent } from './tooltip-comp/tooltip-comp.component';
import { Form } from '@angular/forms';

@Directive({
  selector: '[appCustomtooltip]'
})
export class CustomtooltipDirective implements OnInit  {

  @Input() tooltip = ''
   
  public component:any
  constructor( private elementRef: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private container:ViewContainerRef
    ) {}
     ngOnInit() {
      
     }

    @HostListener('mouseenter')
    onMouseEnter():void
    {
        const componentRefe=this.componentFactoryResolver.resolveComponentFactory(TooltipCompComponent)
        this.component =this.container.createComponent(componentRefe)
        this.setTooltipComponentProperties()
    }
    setTooltipComponentProperties()
    {
      this.component.instance.tooltip=this.tooltip
      const {left, right, bottom} = 		  	
          this.elementRef.nativeElement.getBoundingClientRect();
      this.component.instance.top=bottom
      this.component.instance.left = (right - left) / 2 + left;
    }

    @HostListener('mouseleave')
    onMouseLeave():void{
      this.destroy()
    }
    
    destroy()
    {
      this.component.destroy();
    }
  

}
