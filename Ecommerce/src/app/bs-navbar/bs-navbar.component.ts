
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent implements OnInit {

  username = "Username";
  role = "";
  cartCount !: number;
  constructor(private  _userservice: UsersService,
    private _router: Router,
    private _cartService: ShoppingCartService,
    private _activateRoute: ActivatedRoute) { 
      this._userservice.getUserName()
      .subscribe(
        data => {
          this.username = Object.values(data)[0];
          this.role = Object.values(data)[2];
        },
        error =>{
          console.log("Not Logged");
        }
      )
      
  }

  ngOnInit(): void {
    this._cartService.getCart()
    .subscribe(
      cart=>{
        this.cartCount = 0;
        console.log("Hello navbar")
        for(var item of Object.values(cart)){
          this.cartCount += item.CartItem.quantity;
        }
        console.log(this.cartCount);
      }
    )
  }

  logout(){
    this.username = "Username";
     localStorage.removeItem('token');
  }

}
