import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject, Subject, observable,pipe} from 'rxjs';
import { map,takeUntil } from 'rxjs/operators';
import * as moment from "moment";
import { StreamState } from './interfaces/stream-state';
@Injectable({
  providedIn: 'root'
})
export class GetaudiofileService {

  public state:StreamState={
    playing:false,
    readableCurrentTime:'',
    readableDuration:'',
    duration:undefined,
    currentTime:undefined,
    canplay:false,
    error:false,
    event:''
  }
  public stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );
  public stop$ =new Subject();
  public audioObj = new Audio();
  public audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];


  constructor(public http:HttpClient) {
   }

   gettrack(num?:string)
   {
    let id=601224351
    const params = new HttpParams()
    .set('app_locale','en')


    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization','OAuth 2-294140-1293559353-qmfH32EKPE1yQ')
    .set('name','https://api-v2.soundcloud.com/tracks/'+314656017+'?app_locale=en');

   return this.http.get("http://localhost:3000",{'params':params,'headers': headers})

   }
   gethls(id:string,url:string)
   {
    const params = new HttpParams()
    .set('app_locale','en')


    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization','OAuth 2-294140-1293559353-qmfH32EKPE1yQ')
    .set('name',url+'?app_locale=en');

   return this.http.get("http://localhost:3000",{'params':params,'headers': headers})
   }
   private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
      event:''
    };
  }
  
   public playStream(url:any)
   {
    return this.startStream(url).pipe((takeUntil(this.stop$)))
   }

   play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  sound(volume:any)
  {
    this.audioObj.volume = volume
    debugger
  }

  seekTo(seconds:any) {
    this.audioObj.currentTime = seconds;
  }
   startStream(url:any):any
   {
    return new Observable(observer =>{
      debugger
      this.audioObj.src = url
      this.audioObj.load();
      // this.audioObj.play()
      const handler = (event: Event) => {
        console.log(event);
        this.updateStateEvents(event)
  
      };
      this.addEvents(this.audioObj, this.audioEvents, handler);
      return ()=>{
        this.audioObj.pause()
        this.audioObj.currentTime = 0;
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        this.resetState();

      }
  
    })
   }
   
   private updateStateEvents(event: Event): void {
    this.state.event=event.type
    switch (event.type)
    {
        case "playing":
        this.state.playing = true;
        break;
        case "pause":
        this.state.playing = false;
        break;
        case "canplay":
          this.state.duration = this.audioObj.duration;
          this.state.readableDuration = this.formatTime(this.state.duration);
          this.state.canplay = true;
          break;
        case "timeupdate":
          this.state.currentTime = this.audioObj.currentTime;
          this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
            );
            break;
    }
    this.stateChange.next(this.state);

   }
   public formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

   private addEvents(obj:any, events:String [], handler:any) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }
  private removeEvents(obj:any,events:String[],handler:any)
  {
    events.forEach((event)=>{
      obj.removeEventListener(event, handler);
    })
  }

}
