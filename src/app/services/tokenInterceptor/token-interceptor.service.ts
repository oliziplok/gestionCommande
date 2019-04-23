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
    this.token = this.authService.getToken();

    let newReq = null;
    if (request.url !== 'https://gestiondecommandes.langoni.ca/oauth/token.php') {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + this.token);
      // headers = headers.set('Access-Control-Allow-Headers', '*');
      newReq = request.clone({headers});
    } else {
      newReq = request.clone();
    }

    return next.handle(newReq).pipe(tap(
      (res: any) => {
      }
    ), catchError(
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {

            return from(this.authService.refreshToken()).pipe(mergeMap((res: any) => {

              const newRequest = request.clone({
                setHeaders: {
                  Authorization : 'Bearer ' + res
                }
              });

              // this.actuallyRefreshing = false;
              return next.handle(newRequest);

            }), catchError((error) => {
              // this.actuallyRefreshing = false;
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
