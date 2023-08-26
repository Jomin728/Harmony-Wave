import { Component, OnInit,Optional } from '@angular/core';
import { MyplaylistsService } from './myplaylists.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'UIpractise';
  constructor( @Optional() private getPlayListService: MyplaylistsService,
  ) { }

  ngOnInit(): void {
    // this.initalization()
  }

  public playListCreated=false


  initalization()
  {
  this.getPlayListService.getPlayLists().subscribe((data:any)=>{
    console.log(data)
    if(data['collection'].length!=0)
    {
      this.playListCreated=true
      this.getPlayListService.getplayListTracks(data['collection'][0]['playlist']['id']).subscribe((response:any)=>{
        console.log(response)
      })
    }

   })
  }


}
