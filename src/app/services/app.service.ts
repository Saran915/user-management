import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public Base_URL: string = 'http://localhost:3000/users';
  #http: HttpClient = inject(HttpClient);

  createUser(data: any): Observable<any> {
    return this.#http.post(this.Base_URL, data);
  }

  updateUser(data: any): Observable<any> {
    return this.#http.put(`${this.Base_URL}/${data.id}`, data);
  }

  getUserList(): Observable<any> {
    return this.#http.get(this.Base_URL);
  }

  getUserBy(id: number | string): Observable<any> {
    return this.#http.get(`${this.Base_URL}/${id}`);
  }

  deleteUserBy(id: number): Observable<any> {
    return this.#http.delete(`${this.Base_URL}/${id}`);
  }
}
