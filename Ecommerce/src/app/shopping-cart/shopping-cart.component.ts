import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Router } from '@angular/router';
import { Product } from '../models/product';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  carts !: any;
  totalCarts !: number;
  totalPrice !: number;

  constructor(private _cartService: ShoppingCartService, private router: Router) { }

  reload() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

    addToCart(product: Product) {
      this._cartService.create(product.product_id)
    .subscribe(
      result => {
        localStorage.setItem('cartId', Object.values(result)[0]);
        this.router.navigate(['/shopping-cart'])
      }
    )
    }

    remove(productId: any){
      this._cartService.removeFromCart(productId)
      .subscribe(result=>{
        console.log(result);
        this.router.navigate(['/shopping-cart'])
      })
    }
  

  ngOnInit(): void {
    this._cartService.getCart()
    .subscribe(cart=>{
      this.totalCarts = 0;
      this.totalPrice = 0;
      this.carts = cart;
      console.log(this.carts);
      for(var c of this.carts){
        this.totalCarts += c.CartItem.quantity;
        this.totalPrice += c.CartItem.quantity*c.price;
      }
    });
  }

  clearCart(productId: any){
    this._cartService.clearCart(productId)
    .subscribe(result=>{
      console.log(result)
    });
    this.reload();
  }

}
