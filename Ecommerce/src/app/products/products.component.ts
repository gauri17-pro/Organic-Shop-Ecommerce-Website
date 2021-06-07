import { Component, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServicesService } from '../admin/admin-services.service';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{

  products : Product[] = []
  category !: any
  filteredProducts : Product[] = [];
  carts !: any
  subscription !: Subscription
    
  reload() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/'],{queryParamsHandling:'preserve'});
    }

  constructor( _adminservice: AdminServicesService, 
     route: ActivatedRoute,
     private shoppingCart: ShoppingCartService,
     private router: Router) {
    _adminservice.getAllProducts()
    .subscribe(
      data => {
        this.products = Object.values(data)[0];
        route.queryParamMap.subscribe(params => {
          this.category = params.get('category') ;
          if(this.products){
            this.filteredProducts = (this.category ) ? 
            this.products.filter((p:Product) => p.CategoryId === parseInt(this.category)) : 
            this.products;
          }
        }
        );
      } 
    ); 
  }

  ngOnInit(){
    this.subscription = (this.shoppingCart.getCart())
    .subscribe(cart=>{
      this.carts = cart;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

