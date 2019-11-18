import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {api} from '../config/api.constant';
import { userInfoGetter, userInfoSetter } from '../util/userinfo.helper';
import { UserInfo } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

    getUserByEmail(email: string): Observable<UserInfo> {
        return this.http.get<UserInfo>(environment.baseUrl.MS_USER + api.USER.GET_BY_EMAIL + '/' + email, {}).pipe(
            map((result: any) => {
              if (result.success) {
                console.dir(result);
                const strUserInfo = JSON.stringify(result.data);
                userInfoSetter(strUserInfo);
                return result;
              } else {
                  console.dir(result);
                return result;
              }
            })
          );
    }

    updateUserInfo(post: UserInfo): Observable<UserInfo> {
        return this.http.post<UserInfo>(environment.baseUrl.MS_USER + api.USER.SAVE , post);
    }

    getActiveUser(): UserInfo {
        if (!userInfoGetter()) {
          return null;
        }
        return JSON.parse(userInfoGetter());
      }
}
