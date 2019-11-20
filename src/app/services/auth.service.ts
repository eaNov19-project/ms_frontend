import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {api} from '../config/api.constant';
import {JwtHelperService} from '@auth0/angular-jwt';
import {tokenGetter, tokenRemove, tokenSetter} from '../util/token.helper'; 
import { environment } from 'src/environments/environment';
import { userInfoGetter } from '../util/userinfo.helper';
import { UserInfo } from '../models/user.model';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<boolean> {
    // console.log('API_GATEWAY = ' + environment.baseUrl.API_GATEWAY );
    // console.dir(environment);
    // console.dir(api);
    return this.http.post<{ token: string }>(environment.baseUrl.API_GATEWAY + api.AUTH.LOGIN, {email, password})
      .pipe(
        map((result: any) => {
          if (result.success) {
            tokenSetter(result.data.token);
            return result;
          } else {
            return result;
          }
        })
      );
  }

  signup(userObj: object): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(environment.baseUrl.API_GATEWAY + api.USER.REGISTER_V2, userObj)
      // .pipe(
      //   map((result:any) => {
      //     console.log(result);
      //     if(result.sucess) {
      //       return result;
      //     }
      //     return result.error;
      //   })
      // );
  }

  logout() {
    tokenRemove();
  }

  public get loggedIn(): boolean {
    const token = tokenGetter();
    return (token !== null && token !== undefined && token !== '');
  }

  public get currentUser(): UserInfo {
    const user = JSON.parse(userInfoGetter()) ;
    return user;
  }

  public getToken() {    
    const token = tokenGetter();
    return (token !== null && token !== undefined && token !== '') ? token : '';
  }

}
