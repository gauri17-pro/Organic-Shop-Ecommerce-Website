
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(private _userservice: UsersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    
  }

  submitLogin(){
      if(this.loginForm.valid){
        this._userservice.login(this.loginForm.value)
        .subscribe(
          data=>{
            if(data){
              console.log(Object.values(data)[2]);
              localStorage.setItem('token', Object.values(data)[2]);
              this._router.navigate(['']);
            }
          }
        )
      }
  }
  
}
