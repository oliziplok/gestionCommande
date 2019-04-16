import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  basicUrl = 'https://gestiondecommandes.langoni.ca';
  clientID = 'gestionCMD';
  clientSecret = 'inf5001';
  private islogIn = false;
  private actualToken = '';
  private actualRefreshToken = '';
  // private islogIn = true;
  private role = 'client';
  private id = 1;
  // private role = 'fournisseur';

  constructor(private router: Router, private http: HttpClient ) { }

  isAuthenticated() {
    return this.islogIn;
  }

  getRole() {
    return this.role;
  }

  getID() {
    return this.id;
  }

  logInAuth(usernameR, passwordR) {
    console.log('Login trigger');

    return new Promise((resolve, reject) => {

      const bodyTest = {
        grant_type : 'password',
        username : usernameR,
        password : passwordR,
        scope : '',
        client_id : this.clientID,
        client_secret: this.clientSecret
      };

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(this.basicUrl + '/oauth/token.php', bodyTest, {headers: headers})
        .subscribe((res: any) => {

          // let expireTime = new Date();
          // expireTime.setSeconds(expireTime.getSeconds() + res.expires_in);
          // console.log(expireTime);

          const data: any = res;
          const token = data.access_token;
          const refresh_token = data.refresh_token;

          console.log(res);
          this.actualToken = token;
          this.actualRefreshToken = refresh_token;

          const promises: Promise<any>[] = [];

          // promises.push(this.storage.set('token', token));
          // promises.push(this.storage.set('refresh_token', refresh_token));
          // promises.push(this.storage.set('expiration', expireTime));

          // Promise.all(promises).then((values) => {
          //   console.log('Values from login', values);
          //   this._autorize.next(true);
          //   resolve(values[0]);
          // }).catch((err) => {
          //   this._autorize.next(false);
          //   reject(err);
          // });

          if (this.role === 'client') {
            this.router.navigate(['client/home']);
          } else if (this.role === 'fournisseur') {
            this.router.navigate(['fournisseur/home']);
          }
        }, (err) => {
          console.log('Trigger error login: ', err);
          // this._autorize.next(false);
          // reject(err);
        });

    });
  }

  logIn(username, password) {
    // if (username === '' && password === '') {
      console.log(username, password);
      if (username === 'client') {
        this.role = 'client';
        this.islogIn = true;
      } else if (username === 'fournisseur') {
        this.role = 'fournisseur';
        this.islogIn = true;
      }
      console.log(this.role);
      if (this.role === 'client') {
        this.router.navigate(['client/home']);
      } else if (this.role === 'fournisseur') {
        this.router.navigate(['fournisseur/home']);
      }
    // }
  }

  refreshToken(): Promise<any> {
    return new Promise((resolve, reject) => {

        const bodyTest = {
          grant_type : 'refresh_token',
          refresh_token: this.actualRefreshToken,
          client_id : this.clientID,
          client_secret: this.clientSecret
        };

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.http.post(this.basicUrl + '/oauth/token.php', bodyTest,{headers: headers})
          .subscribe((res: any) => {
            console.log('Result from refresh ', res);

            // let expireTime = new Date();
            // expireTime.setSeconds(expireTime.getSeconds() + res.expires_in);

            const data: any = res;
            const token = data.access_token;
            const refresh_token = data.refresh_token;

            this.actualToken = token;
            this.actualRefreshToken = refresh_token;

            // let promises:Promise<any>[] = [];
            //
            // promises.push(this.storage.set('token', token));
            // promises.push(this.storage.set('refresh_token', refresh_token2));
            // promises.push(this.storage.set('expiration', expireTime));

            // Promise.all(promises).then((values) => {
            //   console.log("Values from refreshToken ", values);
            //   this._autorize.next(true);
            //   resolve(values[0]);
            // }).catch((err) => {
            //   console.log("Error from set memory refresh token");
            //   this._autorize.next(false);
            //   reject(err);
            // });
          }, (err) => {
            console.log('Error from refresh token');
            // this._autorize.next(false);
            reject(err);
          });
      });
  }

  logOut() {
    this.islogIn = false;
    this.router.navigate(['/login']);
  }
}
