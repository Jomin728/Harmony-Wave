import { Component, Input, OnInit, ViewChild,ElementRef, AfterViewInit, Renderer2,Optional } from '@angular/core';
import { MessengerService } from '../messenger.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetaudiofileService } from '../getaudiofile.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit,AfterViewInit {

  @Input() items:any={title:''}
  constructor(public renderer:Renderer2,
    private getmesseage:MessengerService,
    private router:Router,
    @Optional() private gettrackService: GetaudiofileService,

    ) { }
  public showNext=false;
  public showPrev=false;
  public index=0;

  @ViewChild('innerscroll') innerscroll:ElementRef<HTMLElement>
  @ViewChild('cards') cards:ElementRef<HTMLElement>


  ngOnInit(): void {
  }
  ngAfterViewInit()
  {
   let innerscrollwidth=this.innerscroll.nativeElement.scrollWidth
   this.hideNext()
   this.hidePrev()

  }
  public hideNext()
  {
    let scrollwidth=this.innerscroll.nativeElement.offsetWidth
    let innerscrollwidth=this.innerscroll.nativeElement.scrollWidth
    if((this.index+1)*scrollwidth<innerscrollwidth)
    {
      this.showNext=true;
    }
    else
    this.showNext=false;
  }
  public hidePrev()
  {
    let scrollwidth=this.innerscroll.nativeElement.offsetWidth
    let innerscrollwidth=this.innerscroll.nativeElement.scrollWidth
    if(this.index!=0)
    {
      this.showPrev=true;
    }
    else
    this.showPrev=false;
  }
  public onNext()
  {
    this.index++
    let innerscrollwidth=this.innerscroll.nativeElement.offsetWidth
    let value = -1*this.index*innerscrollwidth +'px'
    
    this.renderer.setStyle(this.cards.nativeElement,'transform',`translateX(${value})`)
    this.renderer.setStyle(this.cards.nativeElement,'transition','transform 0.2s ease-in-out')
    this.hideNext()
    this.hidePrev()
  }
  public onPrev()
  {   
    let value
    let innerscrollwidth=this.innerscroll.nativeElement.offsetWidth
    
    this.index=this.index-1

     value = -1*this.index*innerscrollwidth +'px'


     this.renderer.setStyle(this.cards.nativeElement,'transform',`translateX(${value})`)
    this.renderer.setStyle(this.cards.nativeElement,'transition','transform 0.2s ease-in-out')

    this.hideNext()
    this.hidePrev()


  }
  public mouseEnter(item:any)
  {
    // console.log(item)
    this.getmesseage.selectPlaylist(item)
  }
  public play(item:any)
  {
    this.getmesseage.selectPlaylist(item,'play')
  }
  public openPlaylist(item:any)
  {
     
    let data:any={}
    if(item['kind']=="system-playlist")
    {
      // data['id']=(item['id'].split(':'))
      // data['id']=data['id'][data['id'].length-1]
      this.router.navigateByUrl(`/playlist?id=${item.id}&kind=system-playlist`, {state:item }); 
    }
    else{
      this.gettrackService.getplaylist(item['id']).subscribe((data:any)=>{

        this.router.navigateByUrl(`/playlist?id=${data.id}&kind=playlist`,{state:item}); 
      })
        }

  }
}
