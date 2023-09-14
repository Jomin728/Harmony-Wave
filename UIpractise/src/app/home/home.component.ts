import { Component, OnInit,Optional } from '@angular/core';
import { GethomepagetracksService } from '../gethomepagetracks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessengerService } from '../messenger.service';
import { GetaudiofileService } from '../getaudiofile.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
public list =['one','two','three','four','five','six']
public listone=[]
public collection=[]
  constructor(public gethomepagetracksService:GethomepagetracksService,
    private getmesseage:MessengerService,
    private router:Router,
    @Optional() private gettrackService: GetaudiofileService,

    ) { }

  ngOnInit(): void {
    this.gethomepagetracksService.getMixedSelections().subscribe((response:any)=>{
      console.log('jomin',response)
      let collection = response['collection'][0]['items']['collection']
      this.list=[]
      this.collection=response['collection'].slice(0)
      this.listone=response['collection'][2]
      collection.forEach((element:any,index:number) => {
        if(!element['calculated_artwork_url'])
        element['calculated_artwork_url']=element['user']['avatar_url']
        this.list.push(element)     
      });
      this.list=this.list.slice(0,6)
      
      
    })
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
