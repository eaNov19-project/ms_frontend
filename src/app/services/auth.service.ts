import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {conf} from '../config/baseUrl.constant';
import {api} from '../config/api.constant';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AuthorizedUserModel } from '../models/authorizedUser.model';
import {tokenGetter, tokenRemove, tokenSetter} from '../util/token.helper'; 

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(conf.BASE_URL + api.AUTH.LOGIN, {email, password})
      .pipe(
        map((result: any) => {
          if (result.success) {
            tokenSetter(result.data.token);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  signup(userObj: object): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(conf.BASE_URL + api.AUTH.REGISTER, userObj)
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  logout() {
    tokenRemove();
  }

  public get loggedIn(): boolean {
    // tslint:disable-next-line:max-line-length
    const token = tokenGetter();
    return (token !== null && token !== undefined && token !== '');
  }

  public getToken() {    
    const token = tokenGetter();
    return (token !== null && token !== undefined && token !== '') ? token : '';
  }

}
