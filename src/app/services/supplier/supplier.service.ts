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
      this.dataStore.clients = res;
      this.clientsSubscriber.next(res);
    }, (err) => {
    });
  }

  addClient(body) {
    body.logo = 'http://www.logospng.com/images/144/vector-green-spoon-food-logo-download-logos-free-144324.png';
    return new Promise<any>((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/supplier/' + this.supplierId + '/client', body).subscribe((res) => {
        this.fetchSupplierClients();
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  editClient(user): Promise<any> {
    const body = this.transformSelectClient(user);
    return new Promise<any>((resolve, reject) => {
      this.http.put(this.basicUrl + '/api/supplier/' + this.supplierId + '/client/' + user.idClient, body)
        .subscribe((res) => {
        resolve(res);
        this.fetchSupplierClients();
      }, (err) => {
        reject(err);
      });
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
    // newUser.logo = user.logo;

    return newUser;
  }

  deleteClient(user) {
    this.http.delete(this.basicUrl + '/api/supplier/' + this.supplierId + '/client/' + user.idClient).subscribe((res) => {
      this.fetchSupplierClients();
    }, (err) => {
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
      this.dataStore.products = res;
      this.productsSubscriber.next(res);
    }, (err) => {
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
      this.dataStore.users = res;
      this.usersSubscriber.next(res);
    }, (err) => {
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
      this.orderSubscriber.next(res);
      this.dataStore.orders = res;
    }, (err) => {
    });
  }

  getSupplierOrderById() {
    return new Promise<any>((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/createClient.php').subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });
  }

  addOrder(commande): Promise<any> {
    const body = this.transformOrderForAPI(commande);

    return new Promise<any>((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/supplier/' + this.supplierId + '/order', body).subscribe((res: any) => {
        this.fetchOrders();
        resolve(res);
      }, (err) => {
        reject(err);
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

    return new Promise((resolve, reject) => {
      this.http.put(this.basicUrl + '/api/supplier/' + this.supplierId + '/order/' + commande.id, newBody)
        .subscribe((res: any) => {
        // this.dataStore.orders = res;
        // this.orderSubscriber.next(res);
          this.fetchOrders();
          resolve(res);
      }, (err) => {
        // reject(err);
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
      // Produits: commande.produits,
      user: commande.user,
      // status: 1,
    };

    // const newProduits = [];
    // for (const produit of commande.produits) {
    //     const newProduit = {
    //       id: produit.fkidProduct,
    //       nom: produit.nom,
    //       Qty: produit.Qty
    //     };
    //     newProduits.push(newProduit);
    // }

    return newBody;
  }

  addProduct(product): Promise<any> {
    return new Promise((resolve, reject) => {
      product.logo = 'http://www.logospng.com/images/144/vector-green-spoon-food-logo-download-logos-free-144324.png';
      this.http.post(this.basicUrl + '/api/supplier/' + this.supplierId + '/product', product).subscribe((res) => {
        this.fetchProducts();
        resolve();
      }, (err) => {
        reject(err);
      });
    });
  }

  editProduct(product): Promise<any> {
    const newBody = this.transformProduct(product);
    return new Promise<any>((resolve, reject) => {
      this.http.put(this.basicUrl + '/api/supplier/' + this.supplierId + '/product/' + product.id, newBody)
        .subscribe((res) => {
        this.fetchProducts();
        resolve(res);
      }, (err) => {
          reject(err);
      });
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
    this.http.delete(this.basicUrl + '/api/supplier/' + this.supplierId + '/product/' + commande.id)
      .subscribe((res: any) => {
        // this.dataStore.orders = res;
        // this.orderSubscriber.next(res);
        this.fetchProducts();
      }, (err) => {
      });
  }

  createNewUser(body): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.basicUrl + '/api/supplier/' + this.supplierId + '/user', body)
        .subscribe((res: any) => {
        this.fetchSupplierUsers();
        // this.dataStore.orders = res;
        // this.ordersSubscriber.next(res);
        resolve(res);
      }, (err) => {
        reject(err);
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
          resolve(res);
        }, (err) => {
          reject(err);
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
        resolve(res);
      }, (err) => {
        // reject(err);
      });
    });
  }
}
