import { Component, ElementRef, OnInit ,Optional, ViewChild} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GetaudiofileService } from '../getaudiofile.service';
import { MessengerService } from '../messenger.service';

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
 public tracks = [];
 public autoplay=false

 @ViewChild('range',{static:false}) range:ElementRef<HTMLElement>
 @ViewChild('thumb',{static:false}) thumb:ElementRef<HTMLElement>

 public reset()
 {
  this.username=""
  this.position ='0px';
  this.percentage =0;
  this.marginLeft = 0
  this.centerProgressBar ="0%";
  this.pause =false
  this.soundposition =50
  this.duration=''
  this.currenttime=''
 }

 public playlist:Observable<any>

  constructor(public http:HttpClient,
    @Optional() private gettrackService: GetaudiofileService,
    private getmesseage:MessengerService

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

    this.playlist=this.getmesseage.playlistObs
    this.playlist.subscribe((response:any)=>{
      console.log('jomin',response)
      if(response['event']=='play')
      {
        this.gettrackService.stop();
        this.reset()
        if(response['kind']=="system-playlist")
        {
          this.tracks=response['tracks']
          this.playTrack(this.tracks[0]['id'])

        }
        else if(response['kind']=="playlist")
        {
           this.gettrackService.getplaylist(response['id']).subscribe((data:any)=>{
            this.tracks=data['tracks']
            this.playTrack(this.tracks[0]['id'])

           })
        }

        // this.gettrackService.playStream()
      }
    })
  this.playTrack('155648317')
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
      if(data.event=='canplay' && this.autoplay )
      {
        this.gettrackService.play()
      }
    })
  }
  public playTrack(id?:any)
  {
    this.gettrackService.gettrack(id).subscribe((response:any)=>{
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
  }
 public onsoundchange(e:any)
 {
  this.soundposition=e.target.value
  this.gettrackService.sound(this.soundposition /100)
 }
  public play()
  {
    this.autoplay=true
    this.gettrackService.play()
  }
  public pauseplay()
  {
    this.gettrackService.pause()
  }

}
