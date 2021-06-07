import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(public http: HttpClient) { }

  create(productId: any){
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      cartId = "0";
    }
    return this.http.post("http://localhost:8090/api/cart/", {id:productId, cartId: cartId},{
      observe: 'body',
    });
  }

  getCart(){
    let cartId=localStorage.getItem('cartId');
    if(!cartId){
        cartId="0";
    }
    return this.http.get("http://localhost:8090/api/cart/"+cartId,{
      observe: 'body',
    });
  }

  removeFromCart(productId: any){
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      cartId = "0";
    }
    return this.http.put("http://localhost:8090/api/cart/", {id: productId, cartId: cartId});
  }
  
  clearCart(productId: any){
    let cartId=localStorage.getItem('cartId');
    console.log("http://localhost:8090/api/cart/"+`${cartId}`+"/"+`${productId}`)
    return this.http.delete("http://localhost:8090/api/cart/"+`${cartId}`+"/"+`${productId}`);
  }  
   

}
