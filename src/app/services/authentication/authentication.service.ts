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
  private user: any = {};
  private islogIn = false;
  private actualToken = '';
  private actualRefreshToken = '';
  // private islogIn = true;
  private role = 'fournisseur';
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

  getToken() {
    return this.actualToken;
  }

  getUserFkId() {
    return this.user.id;
  }

  getUserUniqueId() {
    return this.user.uId;
  }

  fetchUser() {
    return new Promise((resolve, reject) => {
      this.http.get(this.basicUrl + '/api/user').subscribe((res) => {
        console.log(res);
        if (res[0].fkidClient !== null) {
          this.user.id = res[0].fkidClient;
          this.role = 'client';
        } else {
          this.role = 'fournisseur';
          this.user.id = res[0].fkidSupplier;
        }
        this.user.uId = res[0].id;
        resolve(this.role);
      }, (err) => {
        console.log(err);
        reject(err);
      });
    });
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

          const data: any = res;
          const token = data.access_token;
          const refresh_token = data.refresh_token;

          console.log(res);
          this.actualToken = token;
          this.actualRefreshToken = refresh_token;

          this.fetchUser().then(() => {
            this.islogIn = true;
            resolve(this.role);
          }).catch((err) => {
            reject(err);
          });
        }, (err) => {
          console.log('Trigger error login: ', err);
          reject(err);
        });

    });
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

            const data: any = res;
            const token = data.access_token;
            const refresh_token = data.refresh_token;

            this.actualToken = token;
            this.actualRefreshToken = refresh_token;
            resolve(this.actualToken);

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
