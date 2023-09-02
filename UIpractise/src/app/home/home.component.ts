import { Component, OnInit } from '@angular/core';
import { GethomepagetracksService } from '../gethomepagetracks.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
public list =['one','two','three','four','five','six']
public listone=[]
  constructor(public gethomepagetracksService:GethomepagetracksService) { }

  ngOnInit(): void {
    this.gethomepagetracksService.getMixedSelections().subscribe((response:any)=>{
      console.log('jomin',response)
      let collection = response['collection'][0]['items']['collection']
      this.list=[]
      this.listone=response['collection'][2]
      collection.forEach((element:any,index:number) => {
        if(!element['calculated_artwork_url'])
        element['calculated_artwork_url']=element['user']['avatar_url']
        this.list.push(element)     
      });
      this.list=this.list.slice(0,6)
      debugger
      
    })
  }

}
