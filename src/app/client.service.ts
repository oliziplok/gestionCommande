import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  basicUrl = 'gestiondecommandes.langoni.ca';

  constructor(public http: HttpClient) {}

  getClient() {
    const params = new HttpParams();

    this.http.get(this.basicUrl + '/api', {params}).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
