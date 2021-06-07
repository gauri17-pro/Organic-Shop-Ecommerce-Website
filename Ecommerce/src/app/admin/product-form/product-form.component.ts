import { AdminServicesService } from './../admin-services.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories !: any
  product={
    product_id: 0,
    name: "",
    price: 0,
    imageURL: "",
    CategoryId: 0
  }
  id !: any


  constructor(private _adminservice: AdminServicesService, 
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { 
    this._adminservice.getAllCategories()
    .subscribe(
      data=> {
        this.categories = Object.values(data)[0];
        console.log(this.categories);
      }
    )
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this._adminservice.getProduct(this.id)
    .pipe(take(1)).subscribe(
      p => {
        console.log(Object.values(p)[0]);
        this.product = Object.values(p)[0];
      }
    )
  }
  
  productForm = this.fb.group({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    CategoryId: new FormControl('', Validators.required),
    imageURL: new FormControl('', Validators.required)
  });

  get f(){
    return this.productForm.controls;
  }

  delete(){
    if(confirm('Are you sure you want to delete this product?')) {
      this._adminservice.deleteProduct(this.id)
      .subscribe(
        data =>  "Product was deleted successfully",
        error => "Error in deletion",
      )
      this.router.navigate(['/admin/products']);
    }
    return;
  }

  save(){
    if(this.productForm.valid){
      if(this.id)
        this._adminservice.update(this.id, this.productForm.value)
        .subscribe();
      else{
        this._adminservice.addProduct(this.productForm.value)
        .subscribe();
      }
      
    }
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
