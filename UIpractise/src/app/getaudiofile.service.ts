import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetaudiofileService {

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
    .set('name','https://api-v2.soundcloud.com/tracks/'+601224351+'?app_locale=en');

   return this.http.get("http://localhost:3000",{'params':params,'headers': headers})

   }
}
