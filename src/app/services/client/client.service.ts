import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {reject} from 'q';

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

  getListingClientsUsers(): Observable<any> {
    if(this.dataStore.users.length === 0) {
      this.fetchClientUser();
    }
    return this.usersSubscriber.asObservable();
  }

  getClientUser() {
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
      this.http.get(this.basicUrl + '/api/client/' + this.userId + '/product').subscribe((res: any) => {
        resolve(res);
        console.log(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  getClientOrdersListing(): Observable<any> {
    if (this.dataStore.orders.length === 0) {
      this.fetchOrders();
    }
    return this.ordersSubscriber.asObservable();
  }

  private fetchOrders() {
    this.http.get(this.basicUrl + '/api/client/' + this.userId + '/order/0').subscribe((res:any) => {
      this.dataStore.orders = res;
      this.ordersSubscriber.next(res);
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  createNewUser(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/client/' + this.userId + '/user', body).subscribe((res:any) => {
        this.dataStore.orders = res;
        this.ordersSubscriber.next(res);
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  deleteUser(userId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.basicUrl + '/api/client/' + this.userId + '/user/' + userId).subscribe((res:any) => {
        this.dataStore.orders = res;
        this.ordersSubscriber.next(res);
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  changePassword(user, formUser): Promise<any> {
    const body = {};

    return new Promise((resolve, reject) => {
      this.http.put(this.basicUrl + '/api/client/' + this.userId + '/user/' + user.id, body)
        .subscribe((res: any) => {
        this.dataStore.orders = res;
        this.ordersSubscriber.next(res);
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }
}
