import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyplaylistsService {

  constructor(public http:HttpClient) { }

  getPlayLists()
  {
    const params = new HttpParams()
    .set('limit', "10")
    .set('offset',"0")
    .set('linked_partitioning','1')
    .set('app_version','1692695220')
    .set('app_locale','en')


    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization','OAuth 2-294140-1293559353-qmfH32EKPE1yQ')
    .set('name','https://api-v2.soundcloud.com/me/library/all?limit=10&offset=0&linked_partitioning=1&app_version=1692695220&app_locale=en');

   return this.http.get("http://localhost:3000",{'params':params,'headers': headers})
  }
  getplayListTracks(id:string)
  {
    const params = new HttpParams()
    .set('representation',"full")
    .set('app_version','1692695220')
    .set('app_locale','en')

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization','OAuth 2-294140-1293559353-qmfH32EKPE1yQ')
    .set('name','https://api-v2.soundcloud.com/playlists/'+id+'?representation=full&&app_version=1692695220&app_locale=en');
    return this.http.get("http://localhost:3000",{'params':params,'headers': headers})

  }
}
