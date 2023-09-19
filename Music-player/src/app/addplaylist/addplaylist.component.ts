import { Component, OnInit,Input,Optional } from '@angular/core';
import { MyplaylistsService } from '../myplaylists.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms'
import { MessengerService } from '../messenger.service';

@Component({
  selector: 'app-addplaylist',
  templateUrl: './addplaylist.component.html',
  styleUrls: ['./addplaylist.component.scss']
})
export class AddplaylistComponent implements OnInit {

  public lists:any = []
  public playlistform:any;
  public selectedTrack:any=[]

  constructor(@Optional() private getPlayListService: MyplaylistsService,private formBuilder: FormBuilder, private messageservice:MessengerService) { }
  public addPlaylist=true

  ngOnInit(): void {
    this.getPlayListService.getPlayLists().subscribe((response:any)=>{
       
      this.lists=[...response.collection]
      response.collection.forEach((element:any,index:any) => {
        this.getPlayListService.getplayListTracks(element['playlist']['id']).subscribe((response:any)=>{
          this.lists[index]['imageUrl']=response['tracks'][0]['artwork_url']
          this.lists[index]['genre']=response['tracks'][0]['genre']
          this.lists[index]['added']=false
          this.lists[index]['tracklist']=response['tracks']
           
        })
      });
      
    })
    this.playlistform=this.formBuilder.group({
      playlistname:["",[Validators.required]]
    })
    this.selectedTrack=[]
    this.selectedTrack.push(this.messageservice.selectedTrack)
     
  }
  show()
  {
    this.messageservice.showPlaylistmodal()
  }
  close()
  {
    this.messageservice.hidePlaylistmodal()
     
  }
  onsubmit()
  {
    this.getPlayListService.createPlaylists(this.selectedTrack[0],this.playlistform.value.playlistname).subscribe((response)=>{

    })
    this.close()
    console.log(this.playlistform.valid)
  }
  addplay()
  {
    this.addPlaylist=!this.addPlaylist
  }
  addtoPlaylist(i:any)
  {
     
    this.lists[i]['added']=true
    this.getPlayListService.updatePlaylist(this.lists[i],this.selectedTrack[0]).subscribe((resp)=>{

    })
  }
  removeFromPlaylist(i:any)
  {
     
    this.lists[i]['added']=false
  }

}
