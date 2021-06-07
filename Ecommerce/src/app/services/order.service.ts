import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  getOrders(){
    const headers = { 'Authorization': 'Be '+  localStorage.getItem('token')};
    return this.http.get("http://localhost:8090/api/order/", {
      'headers': headers,
      observe: 'body'
    });
  }
  
  addOrder(shipping: any, cartId: any){
    console.log(shipping)
    const headers = { 'Authorization': 'Be '+  localStorage.getItem('token')};
    return this.http.post("http://localhost:8090/api/order/",{shipping:shipping,cartId: cartId},{
    'headers': headers
  });

  }
  getOrderById(){
    const headers = { 'Authorization': 'Be '+  localStorage.getItem('token')};
    return this.http.get("http://localhost:8090/api/order/id",{
      'headers': headers,
      observe: 'body'
    })
  }

}
