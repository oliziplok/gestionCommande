import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {reject} from 'q';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class ClientService {

  basicUrl = 'https://gestiondecommandes.langoni.ca';
  userId;
  ordersSubscriber: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  usersSubscriber: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  dataStore = {
    orders: [],
    users: []
  };

  constructor(public http: HttpClient, private auth: AuthenticationService) {
    this.userId = this.auth.getUserFkId();
  }

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

  public addOrder(body): Promise<any> {
    console.log(body);
    const newBody = this.transformClientOrder(body);
    console.log(newBody);
    return new Promise((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/client/' + this.userId + '/order', newBody).subscribe((res) => {
        this.fetchOrders();
        resolve();
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  private transformClientOrder(order) {
    const actualDate = this.formatDate(new Date());

    const newOrder = {
      fkidClient: this.auth.getUserFkId(),
      user: this.auth.getUserUniqueId(),
      fkidSupplier: 1,
      produits: [],
      commentaire: order.commentaire,
      orderDate: actualDate
    };

    for (const produit of order.produits) {
      const newProduit = {
        fkidProduct: produit.idProduct,
        Qty: produit.Qty
      };
      newOrder.produits.push(newProduit);
    }

    return newOrder;
  }

  private formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return year + '-' + (month + 1) + '-' + day;
  }

  createNewUser(body): Promise<any> {
    body.fkidClient = this.auth.getUserFkId();
    return new Promise((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/client/' + this.userId + '/user', body).subscribe((res: any) => {
        this.fetchClientUser();
        // this.dataStore.orders = res;
        // this.ordersSubscriber.next(res);
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
      this.http.delete(this.basicUrl + '/api/user/' + userId).subscribe((res: any) => {

        // for (let i = 0; i < this.dataStore.users.length; i ++) {
        //   if (this.dataStore.users[i].id === userId) {
        //     this.dataStore.users.splice(i, 1);
        //   }
        // }
        this.fetchClientUser();
        // this.usersSubscriber.next(this.dataStore.users);
        console.log(res);
        resolve(res);
      }, (err) => {
        // reject(err);
        console.log(err);
      });
    });
  }

  changePassword(user, formUser): Promise<any> {
    const body = {
      username: formUser.username,
      password: formUser.password
    };

    return new Promise((resolve, reject) => {
      this.http.put(this.basicUrl + '/api/client/' + this.userId + '/user/' + user.id, body)
        .subscribe((res: any) => {
        console.log(res);
        resolve(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }
}
