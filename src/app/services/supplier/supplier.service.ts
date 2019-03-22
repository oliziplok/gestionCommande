import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  basicUrl = 'http://gestiondecommandes.langoni.ca';

  constructor(public http: HttpClient) { }

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

  getSupplierClientsListing() {
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

  getSupplierClientById() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/createClient.php').subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  getSupplierUsersListing() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/createClient.php').subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  getSupplierUserById() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/createClient.php').subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  getSupplierOrdersListing() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/createClient.php').subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  getSupplierOrderById() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/createClient.php').subscribe((res) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }
}
