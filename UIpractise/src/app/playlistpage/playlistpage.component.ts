import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetaudiofileService } from '../getaudiofile.service';
import { MessengerService } from '../messenger.service';
@Component({
  selector: 'app-playlistpage',
  templateUrl: './playlistpage.component.html',
  styleUrls: ['./playlistpage.component.scss']
})
export class PlaylistpageComponent implements OnInit {

  public tracks:any=[];
  public trackslist:any=[]
  public kind:any="";
  public id:any="";
  constructor(private activatedRoute:ActivatedRoute,private location:Location,private gettrackService:GetaudiofileService,private getmesseage:MessengerService
    ) { }

  ngOnInit(): void {
      this.tracks=this.location.getState();
      this.trackslist=this.tracks['tracks']?this.tracks['tracks']:[]
       
      console.log(this.tracks,'jomin729')
      this.initialization()

  }
  public initialization()
  {
   this.activatedRoute.queryParams.subscribe((param)=>{
    this.kind=param['kind']
    this.id=param['id']
    this.tracks=this.location.getState();
    this.trackslist=this.tracks['tracks']?this.tracks['tracks']:[]

    this.initialdata()
   })
  }
  public play(item:any)
  {
    this.getmesseage.selectPlaylist(item,'play')
  }
  public initialdata()
  {
    debugger
     
    if(this.trackslist.length==0)
    {
      if(this.kind=='playlist')
      {
        this.gettrackService.getplaylist(this.id).subscribe((reponse:any)=>{
          this.tracks=reponse
          if(this.tracks['artwork_url'] === null)
          this.tracks['artwork_url']=this.tracks['tracks'][0]['artwork_url']
          this.gettrackService.gettracksData(reponse['tracks']).subscribe((response:any)=>{
            this.trackslist=response;
            
          })
        })
      }
      else{
        this.gettrackService.getSystemPlaylist(this.id).subscribe((reponse:any)=>{
          this.tracks=reponse
          this.gettrackService.gettracksData(reponse['tracks']).subscribe((response:any)=>{
            this.trackslist=response;
            
          })
        })
        
      }
    }
    else
    {
      this.gettrackService.gettracksData(this.trackslist).subscribe((response:any)=>{
        this.trackslist=response;
        
      })
    }
  }
  public addtoplaylist(item:any)
  {
    this.getmesseage.selecttrack(item)
    this.getmesseage.showPlaylistmodal()
  }

}
