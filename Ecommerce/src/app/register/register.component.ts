import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm!: FormGroup;
  successMessage = '';
  constructor(private _userservice: UsersService) {
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
   }

  ngOnInit(): void {
  }

  register(){

    if(this.myForm.valid){
      this._userservice.submitRegister(this.myForm.value)
    .subscribe(
      data => this.successMessage = 'Registered Successfully',
      error => this.successMessage = 'Error in registration'
    )
    }
    
  }

}
