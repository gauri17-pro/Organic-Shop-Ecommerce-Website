import { AdminServicesService } from './../../admin/admin-services.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories !: any
  @Input('category') category: any;
  
  constructor(private _adminservice: AdminServicesService) { 
    this._adminservice.getAllCategories()
    .subscribe(
      data => {
        this.categories = Object.values(data)[0];
      }
    )
  }

  ngOnInit(): void {
  }

}
