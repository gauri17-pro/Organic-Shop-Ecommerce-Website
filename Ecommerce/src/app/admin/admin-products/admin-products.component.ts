import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AdminServicesService } from '../admin-services.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products !: Product[];
  filteredProducts!: any[];
  subscription!: Subscription;
  constructor(private _adminservice: AdminServicesService) {
    this.subscription = this._adminservice.getAllProducts()
    .subscribe(
      data=>{
        this.filteredProducts = this.products = Object.values(data)[0];
        console.log(this.products[0].name);
      }
    )
  }

  filter(query: string){
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }


}
