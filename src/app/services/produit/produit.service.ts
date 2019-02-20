import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  basicUrl = 'http://gestiondecommandes.langoni.ca';

  constructor(public http: HttpClient) { }

  getProduit() {
    let params = new HttpParams();
    params = params.append('idSupplier', '1');

    return new Promise<any>((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/supplierProduits.php', {params}).subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }
}
