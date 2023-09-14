import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GethomepagetracksService {

  constructor(public http:HttpClient) { }

  public getMixedSelections()
  {
    const params = new HttpParams()
    .set('variant_ids', "2613")
    .set('client_id',"iMxZgT5mfGstBj8GWJbYMvpzelS8ne0E")
    .set('limit','10')
    .set('offset','0')
    .set('linked_partitioning','1')
    .set('app_version','1692695220')
    .set('app_locale','en')

    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization','OAuth 2-294215-1285281471-6Cxq2SKO0Os26')
    .set('name','https://api-v2.soundcloud.com/mixed-selections?variant_ids=2613&client_id=iMxZgT5mfGstBj8GWJbYMvpzelS8ne0E&limit=10&offset=0&linked_partitioning=1&app_version=1693487844&app_locale=en');

    return this.http.get("http://localhost:3000",{'params':params,'headers': headers})

  }
  public gettracks()
  {
    
  }
}
