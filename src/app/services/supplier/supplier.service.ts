import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  basicUrl = 'https://gestiondecommandes.langoni.ca';
  supplierId = 1;
  orderSubscriber: BehaviorSubject<any> = new BehaviorSubject([]);
  usersSubscriber: BehaviorSubject<any> = new BehaviorSubject([]);
  clientsSubscriber: BehaviorSubject<any> = new BehaviorSubject([]);
  productsSubscriber: BehaviorSubject<any> = new BehaviorSubject([]);
  dataStore = {
    orders: [],
    users: [],
    clients: [],
    products: []
  };

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

  getSupplierProducts(): Observable<any> {
    if (this.dataStore.products.length === 0) {
      this.fetchProducts();
    }
    return this.productsSubscriber.asObservable();
  }

  fetchProducts() {
    this.http.get(this.basicUrl + '/api/supplier/' + this.supplierId + '/product').subscribe((res: any) => {
      console.log(res);
      this.dataStore.products = res;
      this.productsSubscriber.next(res);
    }, (err) => {
      console.log(err);
    });
  }

  getSupplierClientsListing() {
    if (this.dataStore.clients.length === 0) {
      this.fetchSupplierClients();
    }
    return this.clientsSubscriber.asObservable();
  }

  private fetchSupplierClients() {
    this.http.get(this.basicUrl + '/api/supplier/' + this.supplierId + '/client').subscribe((res: any) => {
      console.log(res);
      this.dataStore.clients = res;
      this.clientsSubscriber.next(res);
    }, (err) => {
      console.log(err);
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
    if (this.dataStore.users.length === 0) {
      this.fetchSupplierUsers();
    }
    return this.usersSubscriber.asObservable();
  }

  private fetchSupplierUsers() {
    this.http.get(this.basicUrl + '/api/supplier/' + this.supplierId + '/user').subscribe((res: any) => {
      console.log(res);
      this.dataStore.users = res;
      this.usersSubscriber.next(res);
      console.log(res);
    }, (err) => {
      console.log(err);
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

  getSupplierOrdersListing(): Observable<any> {
    if (this.dataStore.orders.length === 0) {
      this.fetchOrders();
    }
    return this.orderSubscriber.asObservable();
  }

  private fetchOrders() {
    this.http.get(this.basicUrl + '/api/supplier/' + this.supplierId + '/order').subscribe((res: any) => {
      console.log(res);
      this.orderSubscriber.next(res);
      this.dataStore.orders = res;
    }, (err) => {
      console.log(err);
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

  addOrder(commande): Promise<any> {
    console.log(commande);
    console.log(this.transformOrderForAPI(commande));
    const body = this.transformOrderForAPI(commande);

    return new Promise<any>((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/client/' + this.supplierId + '/order', body).subscribe((res:any) => {
        this.dataStore.orders = res;
        this.orderSubscriber.next(res);
        resolve(res);
        console.log(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  transformOrderForAPI(order) {
    const actualOrder = order.value;
    const body: any = {
      produits: [],
      fkidClient: actualOrder.fkidClient
    };
    body.commentaire = actualOrder.commentaire;
    for (const produitFromOrder of actualOrder.produits) {
      const produitToPush = {
        fkidProduct: produitFromOrder.idProduct,
        quantite: produitFromOrder.qtt
      };
      body.produits.push(produitToPush);
    }
    return body;
  }
}
