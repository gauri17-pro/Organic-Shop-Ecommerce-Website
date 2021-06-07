import { OrderService } from './../services/order.service';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  shipping = {
    name: "",
    Address1: "",
    Address2: "",
    City: ""
  }
  carts !: any
  subscription !: Subscription;

  constructor(private _cartService: ShoppingCartService,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService) { }

  checkForm = this.fb.group({
    name: new FormControl('', Validators.required),
    Address1: new FormControl('', Validators.required),
    Address2: new FormControl('', Validators.required),
    City: new FormControl('', Validators.required)
  });

  async ngOnInit() {
    let cart$ = await this._cartService.getCart()
    this.subscription = cart$.subscribe((cart: any)=>{
      this.carts=cart
      console.log(this.carts)
    })
  }

  placeOrder(){
    const cartId = localStorage.getItem('cartId')
    console.log(this.shipping)  
    this.orderService.addOrder(this.shipping, cartId)
    .subscribe(res=>{
      console.log("Place Order")
      console.log(res);
      this.router.navigate(['/my-orders']);
    })
  }
}
