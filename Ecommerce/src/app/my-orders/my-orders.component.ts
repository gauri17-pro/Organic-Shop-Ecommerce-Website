import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders!: any
  constructor(private orderService: OrderService) {
    this.orderService.getOrderById()
    .subscribe(res=>{
      console.log("Hello Order")
      console.log(res);
      this.orders = res;
    });
   }

  ngOnInit(): void {
  }

}
