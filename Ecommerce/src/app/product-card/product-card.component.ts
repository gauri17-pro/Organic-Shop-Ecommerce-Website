import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart !: any;

  constructor(private _cartService: ShoppingCartService,
              private router: Router) { }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/'],{queryParamsHandling:'preserve'});
  }

  addToCart(product: Product) {
      this._cartService.create(product.product_id)
    .subscribe(
      result => {
        localStorage.setItem('cartId', Object.values(result)[0]);
      }
    )
    this.reload();
  }
    
    getQuantity(){
      if(!this.shoppingCart) return 0;
      let item = this.shoppingCart.filter((p:any)=>this.product.product_id === p.CartItem.ProductProductId)
      return item.length>0 ? item[0].CartItem.quantity : 0
    }

    removeFromCart(product: Product){
      this._cartService.removeFromCart(product.product_id)
      .subscribe((result:any)=>{
      console.log(result);
    });
    this.reload();
    }
    
  }

