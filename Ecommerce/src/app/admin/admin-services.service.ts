import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminServicesService {

  constructor(private http: HttpClient) { }

  getAllCategories(){
    return this.http.get('http://localhost:8090/api/category', {
        observe: 'body',
      });
  }

  addProduct(body: any){
    console.log(body);
    console.log('Be ' + localStorage.getItem('token'));
    const headers = { 'Authorization': 'Be '+  localStorage.getItem('token')};
    return this.http.post('http://localhost:8090/api/products/addProduct', body, {
      'headers':headers,
      observe: 'body'
    });
  }

  getAllProducts(){
    return this.http.get('http://localhost:8090/api/products',{
     observe: 'body',
    })
  }

  getProduct(id: any){
    return this.http.get('http://localhost:8090/api/products/' + id, {
      observe: 'body',
    })
  }

  update(id: any, body: any){
    console.log(body);
    const headers = { 'Authorization': 'Be '+  localStorage.getItem('token')};
    return this.http.put('http://localhost:8090/api/products/editProduct/'+ id, body, {
      'headers': headers,
      observe: 'body',
    })
  }

  deleteProduct(id: any){
    const headers = { 'Authorization': 'Be '+  localStorage.getItem('token')};
    return this.http.delete('http://localhost:8090/api/products/deleteProduct/' + id,{
      'headers': headers,
      observe: 'body',
    })
  }
}


