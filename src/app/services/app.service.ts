import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public Base_URL = 'http://localhost:3000/users';
  #http: HttpClient = inject(HttpClient);

  createUser(data: IUser): Observable<IUser> {
    return this.#http.post<IUser>(this.Base_URL, data);
  }

  updateUser(data: IUser): Observable<IUser> {
    return this.#http.put<IUser>(`${this.Base_URL}/${data.id}`, data);
  }

  getUserList(): Observable<IUser[]> {
    return this.#http.get<IUser[]>(this.Base_URL);
  }

  getUserBy(id: number | string): Observable<IUser> {
    return this.#http.get<IUser>(`${this.Base_URL}/${id}`);
  }

  deleteUserBy(id: number): Observable<IUser> {
    return this.#http.delete<IUser>(`${this.Base_URL}/${id}`);
  }
}
