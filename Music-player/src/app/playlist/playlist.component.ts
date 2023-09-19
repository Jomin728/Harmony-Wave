import { Component, Input, OnInit } from '@angular/core';
import { GethomepagetracksService } from '../gethomepagetracks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessengerService } from '../messenger.service';
import { GetaudiofileService } from '../getaudiofile.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  @Input() title=''
  @Input() imageUrl=''
  @Input() item:any={}
  constructor(public gethomepagetracksService:GethomepagetracksService,
    private getmesseage:MessengerService,
    private router:Router,
    private gettrackService: GetaudiofileService) { }

  ngOnInit(): void {
  }
  public openPlaylist(item:any)
  {
    debugger
    item=item['playlist']
     
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
