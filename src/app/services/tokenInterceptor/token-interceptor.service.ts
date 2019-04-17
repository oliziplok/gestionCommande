import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError, from} from 'rxjs';
import {AuthenticationService} from '../authentication/authentication.service';
import {tap, catchError, mergeMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  // actuallyRefreshing = false;
  private token;

  constructor(private authService: AuthenticationService) {
  }

  logOut() {
    this.authService.logOut();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    this.token = this.authService.getToken();
    console.log(this.token);

    let newReq = null;
    if (request.url !== 'https://gestiondecommandes.langoni.ca/oauth/token.php') {
      console.log('trigger');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + this.token);
      // headers = headers.set('Access-Control-Allow-Headers', '*');
      newReq = request.clone({headers});
      console.log(newReq);
    } else {
      newReq = request.clone();
    }

    return next.handle(newReq).pipe(tap(
      (res: any) => {
        console.log(res);
      }
    ), catchError(
      (err) => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {

            return from(this.authService.refreshToken()).pipe(mergeMap((res: any) => {

              console.log('response from refresh to inteceptor', res);

              const newRequest = request.clone({
                setHeaders: {
                  Authorization : 'Bearer ' + res
                }
              });

              console.log('Sending new request');
              // this.actuallyRefreshing = false;
              return next.handle(newRequest);

            }), catchError((error) => {
              // this.actuallyRefreshing = false;
              console.log('error auth interceptor', error);
              this.logOut();
              return throwError(error);
            }));
          }
        }
        return throwError(err);
      }
    ));
  }
}
