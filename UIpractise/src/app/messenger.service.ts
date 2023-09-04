import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject, Subject, observable,pipe, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private playlists:Array<any> =[]

  private playlistsubject:BehaviorSubject<any>=new BehaviorSubject(this.playlists)
  public playlistObs=this.playlistsubject.asObservable();

  selectPlaylist(item:any,event?:any)
  {
    if(event=='play')
    {
      this.playlists.push(item)
    }
    item['event']=event
    this.playlistsubject.next(item)
  }

  constructor() { }
}
