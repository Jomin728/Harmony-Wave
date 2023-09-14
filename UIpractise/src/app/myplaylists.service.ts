import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { element } from 'protractor';

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
    .set('Authorization','OAuth 2-294215-1285281471-6Cxq2SKO0Os26')
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
    .set('Authorization','OAuth 2-294215-1285281471-6Cxq2SKO0Os26')
    .set('name','https://api-v2.soundcloud.com/playlists/'+id+'?representation=full&&app_version=1692695220&app_locale=en');
    return this.http.get("http://localhost:3000",{'params':params,'headers': headers})

  }
  public createPlaylists(item:any,value:any)
  {
    let body={playlist:{title:value,
                        sharing:"public",
                        tracks:[item['id']],
                        _resource_id:"f-11470",
                        _resource_type:"playlist"}}
    const params = new HttpParams()
    .set('client_id',"0nr4Ys43jAqfn0VkGXfxTWh9d4NB0o54")
    .set('app_version','1694501791')
    .set('app_locale','en')

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization','OAuth 2-294215-1285281471-6Cxq2SKO0Os26')
    .set('name','https://api-v2.soundcloud.com/playlists?client_id=0nr4Ys43jAqfn0VkGXfxTWh9d4NB0o54&app_version=1694501791&app_locale=en');
    return this.http.post("http://localhost:3000",body,{'params':params,'headers': headers})

  }
  public updatePlaylist(playlist:any,item:any)
  {
    debugger
    const params = new HttpParams()
    .set('client_id',"0nr4Ys43jAqfn0VkGXfxTWh9d4NB0o54")
    .set('app_version','1694501791')
    .set('app_locale','en')
    let tracklist=[]
    playlist['tracklist'].forEach((element:any)=>{
        tracklist.push(element['id'])
    })
    tracklist.push(item['id'])
    
    let body = {
      playlist: {
        tracks: tracklist
      }
    }

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization','OAuth 2-294215-1285281471-6Cxq2SKO0Os26')
    .set('name','https://api-v2.soundcloud.com/playlists/'+playlist['playlist']['id']+'?client_id=0nr4Ys43jAqfn0VkGXfxTWh9d4NB0o54&app_version=1694501791&app_locale=en');
    return this.http.put("http://localhost:3000",body,{'params':params,'headers': headers})

  }
  public removeFromPlaylist()
  {

  }
  public updateHomepage()
  {

  }
}
