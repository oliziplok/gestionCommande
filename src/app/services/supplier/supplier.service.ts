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

  private fetchSupplierClients() {
    this.http.get(this.basicUrl + '/api/supplier/' + this.supplierId + '/client').subscribe((res: any) => {
      console.log(res);
      this.dataStore.clients = res;
      this.clientsSubscriber.next(res);
    }, (err) => {
      console.log(err);
    });
  }

  addClient(body) {
    console.log(body);
    body.logo = 'http://www.logospng.com/images/144/vector-green-spoon-food-logo-download-logos-free-144324.png';
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/supplier/' + this.supplierId + '/client', body).subscribe((res) => {
        // console.log(res);
        this.fetchSupplierClients();
        resolve(res);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  editClient(user) {
    console.log(user);
    const body = this.transformSelectClient(user);
    this.http.put(this.basicUrl + '/api/supplier/' + this.supplierId + '/client/' + user.idClient, body).subscribe((res) => {
      console.log(res);
      this.fetchSupplierClients();
    }, (err) => {
      console.log(err);
    });
  }

  private transformSelectClient(user) {
    const newUser: any = {};
    newUser.name = user.nom;
    newUser.compagny = user.compagnie;
    newUser.email = user.courriel;
    newUser.buy_condition = user.condition_achat;
    newUser.rec_adress = user.adresseFacturation;
    newUser.ship_adress = user.adresseLivraison;
    newUser.logo = user.logo;

    return newUser;
  }

  deleteClient(user) {
    this.http.delete(this.basicUrl + '/api/supplier/' + this.supplierId + '/client/' + user.idClient).subscribe((res) => {
      console.log(res);
      this.fetchSupplierClients();
    }, (err) => {
      console.log(err);
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
      this.http.post(this.basicUrl + '/api/supplier/' + this.supplierId + '/order', body).subscribe((res: any) => {
        this.fetchOrders();
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
      fkidClient: actualOrder.fkidClient,
      fkidSupplier: 1
    };
    body.commentaire = actualOrder.commentaire;
    for (const produitFromOrder of actualOrder.produits) {
      const produitToPush = {
        idProduct: produitFromOrder.idProduct,
        quantite: produitFromOrder.Qty
      };
      body.produits.push(produitToPush);
    }
    return body;
  }

  editOrder(commande): Promise<any> {
    const newBody = this.transformOrderPut(commande);
    console.log(newBody);

    return new Promise((resolve, reject) => {
      this.http.put(this.basicUrl + '/api/supplier/' + this.supplierId + '/order/' + commande.id, newBody)
        .subscribe((res: any) => {
        // this.dataStore.orders = res;
        // this.orderSubscriber.next(res);
          this.fetchOrders();
          console.log(res);
          resolve(res);
      }, (err) => {
        // reject(err);
        console.log(err);
      });
    });
  }

  private transformOrderPut(commande) {
    const newBody = {
      commentaire: commande.commentaire,
      done: 1,
      fkidClient: commande.fkidClient,
      // fkidSupplier: commande.fkidSupplier,
      // nom: commande.nom,
      idOrder: commande.id,
      orderDate: commande.orderDate,
      Produits: commande.produits,
      user: commande.user,
      status: 1,
    };

    return newBody;
  }

  addProduct(product): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(product);
      product.logo = 'http://www.logospng.com/images/144/vector-green-spoon-food-logo-download-logos-free-144324.png';
      this.http.post(this.basicUrl + '/api/supplier/' + this.supplierId + '/product', product).subscribe((res) => {
        this.fetchProducts();
        resolve();
        console.log(res);
      }, (err) => {
        reject(err);
        console.log(err);
      });
    });
  }

  editProduct(product) {
    console.log(product);
    const newBody = this.transformProduct(product);
    this.http.put(this.basicUrl + '/api/supplier/' + this.supplierId + '/product/' + product.id, newBody).subscribe((res) => {
      this.fetchProducts();
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  transformProduct(product) {
    const newProduct = {
      nom: product.nom,
      logo: product.logo,
      price: product.prix,
      description: product.description,
      origine: product.origine,
      code: product.code,
      format: product.format
    };

    return newProduct;
  }

  deleteProduct(commande) {
    console.log(commande);
    this.http.delete(this.basicUrl + '/api/supplier/' + this.supplierId + '/product/' + commande.idProduct)
      .subscribe((res: any) => {
        // this.dataStore.orders = res;
        // this.orderSubscriber.next(res);
        this.fetchProducts();
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }

  createNewUser(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/supplier/' + this.supplierId + '/user', body)
        .subscribe((res: any) => {
        this.fetchSupplierUsers();
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

  changePassword(user, formUser): Promise<any> {
    const body = {
      username: formUser.username,
      password: formUser.password
    };

    return new Promise((resolve, reject) => {
      this.http.put(this.basicUrl + '/api/supplier/' + this.supplierId + '/user/' + user.id, body)
        .subscribe((res: any) => {
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
      this.http.delete(this.basicUrl + '/api/user/' + userId)
        .subscribe((res: any) => {

        // for (let i = 0; i < this.dataStore.users.length; i ++) {
        //   if (this.dataStore.users[i].id === userId) {
        //     this.dataStore.users.splice(i, 1);
        //   }
        // }
        this.fetchSupplierUsers();
        // this.usersSubscriber.next(this.dataStore.users);
        console.log(res);
        resolve(res);
      }, (err) => {
        // reject(err);
        console.log(err);
      });
    });
  }
}
