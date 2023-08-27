import { Component, OnInit ,Optional} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GetaudiofileService } from '../getaudiofile.service';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']
})
export class AudioplayerComponent implements OnInit {

  constructor(public http:HttpClient,
    @Optional() private gettrackService: GetaudiofileService) { }

  ngOnInit(): void {
    this.gettrackService.gettrack().subscribe((response)=>{
      console.log(response)
    })
  }

}
