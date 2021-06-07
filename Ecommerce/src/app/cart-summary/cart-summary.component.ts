import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  constructor(private _cartService: ShoppingCartService) { }
  cart !: any
  cartCount !: number
  totalPrice !: any

  ngOnInit(): void {
    this._cartService.getCart()
    .subscribe(cart=>{
      this.cartCount = 0;
      this.totalPrice = 0;
      this.cart = cart;
      console.log(this.cart)
      for(var item of this.cart){
        this.cartCount += item.CartItem.quantity;
        this.totalPrice += item.CartItem.quantity*item.price;
      }
    })
  }

}
