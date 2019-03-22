import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ClientService {

  basicUrl = 'http://gestiondecommandes.langoni.ca';

  constructor(public http: HttpClient) {}

  getListingClientsUsers() {
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

  getClientUser() {
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

  getProductsAvailableForUser(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const listing = [{
            id: 1,
            name: 'Produit 1',
            logo: 'http://www.bite.co.nz/images/recipes/Generic_Tomatoes1.jpg?width=1200&height=800&upscale=false',
            price: 34.99,
            origine: 'France',
            code: 'ty56wk7',
            format: 'caisse',
            description: 'Voici une description'
          },
          {
            id: 2,
            name: 'Produit 2',
            logo: 'http://www.bite.co.nz/images/recipes/Generic_Tomatoes1.jpg?width=1200&height=800&upscale=false',
            price: 60.00,
            origine: 'France',
            code: 'ty56wk7',
            format: 'cassot',
            description: 'Voici une description bla bla bla'
          }];
        resolve(listing);
      }, 2000);
    });
  }

  getClientOrdersListing() {
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

  addOrder(commande) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
