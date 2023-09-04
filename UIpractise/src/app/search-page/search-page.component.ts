import { Component, OnInit } from '@angular/core';
import { GethomepagetracksService } from '../gethomepagetracks.service';
import { MessengerService } from '../messenger.service';
import { GetaudiofileService } from '../getaudiofile.service';
import { Subject,pipe } from 'rxjs';
import { debounceTime,distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public value=''
  public tracks=<any>[]
  public playlists=<any>[]
  public showtracks=false;
  public showPlaylist=false

  reset()
  {
    this.showtracks=false
    this.showPlaylist=false
    this.tracks=[]
    this.playlists=[]
  }

  searchChangeTerm = new Subject<any>();

  constructor(public gettracksService:GetaudiofileService,
    private getmesseage:MessengerService
    ) { }

  ngOnInit(): void {
    this.searchChangeTerm.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((value:any)=>{
        return this.gettracksService.searchQuery(value)
      })
    ).subscribe((response:any)=>{
      this.reset()
      console.log('Jesus is Lord',response)
      this.playlists=response['collection'].filter((value:any)=>{
        return value['kind']=='playlist'
      })
      this.tracks=response['collection'].filter((value:any)=>{
        return value['kind']=='track'
      })
      if(this.tracks.length!=0)
      this.showtracks=true
      if(this.playlists.length!=0)
      this.showPlaylist=true
    })
  }
  onKey(event:any)
  {
   this.value=event.target.value
   this.searchChangeTerm.next(this.value)
   if(this.value=='')
   this.reset()
   
  }
  public play(item:any)
  {
    this.getmesseage.selectPlaylist(item,'play')
  }

}
