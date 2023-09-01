import { Component, ElementRef, OnInit ,Optional, ViewChild} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GetaudiofileService } from '../getaudiofile.service';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']
})
export class AudioplayerComponent implements OnInit {
 public title=""
 public imageUrl=""
 public username=""
 public position ='0px';
 public percentage =0;
 public marginLeft = 0
 public centerProgressBar:any ="0%";
 public pause =false
 public soundposition =50
 public duration=''
 public currenttime=''
 @ViewChild('range',{static:false}) range:ElementRef<HTMLElement>
 @ViewChild('thumb',{static:false}) thumb:ElementRef<HTMLElement>

  constructor(public http:HttpClient,
    @Optional() private gettrackService: GetaudiofileService,
    ) { }
public onchange(e:any)
{
this.percentage=e.target.value
let seekto=(this.gettrackService.state.duration * this.percentage)/100
this.gettrackService.seekTo(seekto)
this.changeProgressbar()
}
public changeProgressbar()
{
  this.position=this.percentage+'%'
  const rangeWidth = this.range.nativeElement.getBoundingClientRect().width
  const thumbWidth = this.thumb.nativeElement.getBoundingClientRect().width
  const centerThumb = (thumbWidth / 100) * this.percentage * -1
  this.centerProgressBar =
  thumbWidth + (rangeWidth / 100) * this.percentage - (thumbWidth / 100) * this.percentage
  this.centerProgressBar=this.centerProgressBar+'px'
  this.marginLeft=centerThumb  
}
  ngOnInit(): void {


    this.gettrackService.gettrack().subscribe((response:any)=>{
      console.log(response)
      this.imageUrl=response['artwork_url']
      this.title=response['title']
      this.username=response['user']['username']
      this.gettrackService.gethls(response['id'],response['media']['transcodings'][1]['url']).subscribe((response:any)=>{
         console.log('',response)
         this.gettrackService.playStream(response['url']).subscribe((data:any)=>{

         })
      })
    })
    this.gettrackService.stateChange.subscribe((data)=>{
      console.log(data)
      this.pause=this.gettrackService.state.playing
      this.duration=this.gettrackService.state.readableDuration
      this.currenttime=this.gettrackService.state.readableCurrentTime
      if(data.event == 'timeupdate')
      {
      this.percentage=((this.gettrackService.state.currentTime)/this.gettrackService.state.duration) * 100
      this.changeProgressbar()
      }
    })
  }
 public onsoundchange(e:any)
 {
  this.soundposition=e.target.value
  this.gettrackService.sound(this.soundposition /100)
 }
  public play()
  {
    this.gettrackService.play()
  }
  public pauseplay()
  {
    this.gettrackService.pause()
  }

}
