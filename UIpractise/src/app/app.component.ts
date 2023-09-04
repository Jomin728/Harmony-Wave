import { Component, OnInit,Optional } from '@angular/core';
import { MyplaylistsService } from './myplaylists.service';
import { MessengerService } from './messenger.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'UIpractise';
  constructor( @Optional() private getPlayListService: MyplaylistsService,
  private getmesseage:MessengerService
  ) { }

  ngOnInit(): void {
    this.initalization()
  }

  public playListCreated=false
  public lists:any=[]


  initalization()
  {
  this.getPlayListService.getPlayLists().subscribe((data:any)=>{
    console.log(data)
    if(data['collection'].length!=0)
    {
      this.lists=[...data.collection]
      this.playListCreated=true
      data.collection.forEach((element:any,index:any) => {
        this.getPlayListService.getplayListTracks(element['playlist']['id']).subscribe((response:any)=>{
          console.log(response)
          this.lists[index]['imageUrl']=response['tracks'][0]['artwork_url']
          console.log(this.lists)

        })
      });
    }

   })
  }


}
