import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ClientService {

  basicUrl = 'https://gestiondecommandes.langoni.ca';
  userId = 1;
  ordersSubscriber: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  usersSubscriber: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  dataStore = {
    orders: [],
    users: []
  };

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

  getClientUser(): Observable<any> {
    if(this.dataStore.users.length === 0) {
      this.fetchClientUser();
    }
    return this.usersSubscriber.asObservable();
  }

  private fetchClientUser() {
    this.http.get(this.basicUrl + '/api/client/' + this.userId + '/user').subscribe((res: any) => {
      console.log(res);
      this.dataStore.users = res;
      this.usersSubscriber.next(res);
      console.log(res);
    }, (err) => {
      console.log(err);
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

  getClientOrdersListing(): Observable<any> {
    if(this.dataStore.orders.length === 0) {
      this.fetchOrders();
    }
    return this.ordersSubscriber.asObservable();
  }

  private fetchOrders() {
    this.http.get(this.basicUrl + '/api/client/' + this.userId + '/order').subscribe((res:any) => {
      this.dataStore.orders = res;
      this.ordersSubscriber.next(res);
      console.log(res);
    }, (err) => {
      console.log(err);
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
