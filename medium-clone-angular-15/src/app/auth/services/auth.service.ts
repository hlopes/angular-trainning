import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RegisterRequest } from '../types/registerRequest.interface'
import { map, Observable } from 'rxjs'

import { CurrentUser } from '../../shared/types/currentUser.interface'
import { AuthResponseInterface } from '../types/authResponse.interface'
import { environment } from '../../../environments/environment'
import { LoginRequestInterface } from '../types/loginRequest.interface'
import { CurrentUserRequestInterface } from '../../shared/types/currentUserRequest.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponseInterface): CurrentUser {
    return response.user
  }

  getCurrentUser(): Observable<CurrentUser> {
    const url = `${environment.apiUrl}/user`

    return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser))
  }

  register(data: RegisterRequest): Observable<CurrentUser> {
    const url = `${environment.apiUrl}/users`

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  login(data: LoginRequestInterface): Observable<CurrentUser> {
    const url = `${environment.apiUrl}/users/login`

    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }

  updateCurrentUser(
    request: CurrentUserRequestInterface,
  ): Observable<CurrentUser> {
    const url = `${environment.apiUrl}/user`

    return this.http
      .put<AuthResponseInterface>(url, request)
      .pipe(map(this.getUser))
  }
}
