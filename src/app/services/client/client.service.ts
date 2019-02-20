import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ClientService {

  basicUrl = 'http://gestiondecommandes.langoni.ca';

  constructor(public http: HttpClient) {}

  getClients(): Promise<any> {
    let params = new HttpParams();
    params = params.append('idSupplier', '1');

    return new Promise<any>((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/supplierClients.php', {params}).subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  addClient(body) {
    let params = new HttpParams();
    params = params.append('idSupplier', '1');

    return new Promise<any>((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/createClient.php', body).subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }
}
