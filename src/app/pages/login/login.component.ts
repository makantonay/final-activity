import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Login } from './login-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean;

  loginForm: any;

  logins: Login = {
    username: '',
    password: ''
  };

  constructor(
    private _globalService: GlobalService,
    private router: Router,
    private titleService: Title) {
    this.isLogged = false;
    this.titleService.setTitle('MyTicket | Login')
  }

  ngOnInit(): void {

    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    )
    this._globalService.checkLogStatus();

    (this._globalService.getToken()) ? this.router.navigate([''], {}) : '';

    // validate
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }

  onSubmit(): void {

    if(this.loginForm.valid){
      this._globalService.httpLogin(this.loginForm.value);
      this._globalService.onHttpLogin.subscribe(
        (response:any) => {
          if(response.token){
            const token = response.token;
            this._globalService.setToken(token);
            Swal.fire({
              icon: 'success',
              title: 'Logged In Successfully!',
            });
            this.router.navigate([''], {})
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized User'
            });
          }
        }

      )
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Form Field Required',
        text: 'Please complete all required fields'
      });
    }

  }


}
