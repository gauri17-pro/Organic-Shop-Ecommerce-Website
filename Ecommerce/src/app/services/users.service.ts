import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

    submitRegister(body: any){
      return this.http.post('http://localhost:8090/api/users/register', body, {
        observe: 'body'
      });
    }

    login(body: any){
      return this.http.post('http://localhost:8090/api/users/login', body, {
        observe: 'body'
      });
    }

    getUserName(){
      return this.http.get('http://localhost:8090/api/users/username', {
        observe: 'body',
        params: new HttpParams().append('token', localStorage.getItem('token') || '')
      });
    }

}
