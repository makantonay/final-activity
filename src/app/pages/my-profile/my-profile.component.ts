import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Profile } from './profile-model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  isLogged: boolean;
  profileForm: any;

  profile: Profile = {
    email: '',
    firstName: '',
    lastName: '',
    alias: '',
    jobTitle: '',
    mobileNumber: '',
    password: '',
  }


  constructor(
    private _globalService: GlobalService,
    private router: Router,
    private titleService: Title) {
    this.isLogged = true;
    this.titleService.setTitle("MyTicket | Profile")
  }

  ngOnInit(): void {

    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    )
    this._globalService.checkLogStatus();

    this.profileForm = new FormGroup({
        email: new FormControl('',[Validators.required, Validators.email]),
        firstName: new FormControl('',[Validators.required]),
        lastName: new FormControl('',[Validators.required]),
        alias: new FormControl('',[Validators.required]),
        jobTitle:  new FormControl('',[Validators.required]),
        mobileNumber:  new FormControl('',[Validators.required]),
        password:  new FormControl(''),
        confirmPassword: new FormControl(''),
    })


    !(this._globalService.getToken()) ? this.router.navigate([''], {}) : '';
      this._globalService.httpGetProfile();
      this._globalService.onHttpGetProfile.subscribe(
        (response: any) => {
          if(response){
              this.fillForm(response);
          }
        }
      )



  }

  fillForm(data: any): void {
    this.profileForm.patchValue({
      firstName: data.meta.first_name,
      lastName: data.meta.last_name,
      alias: data.alias,
      jobTitle: data.meta.job_ttle,
      email: data.email,
      mobileNumber: data.meta.mobile_number
    });
  }

  onSubmit(): void {

        if(this.profileForm.valid){
          const formValues = this.profileForm.value;
          const newFormValues = {
            meta: {
              first_name: formValues.firstName,
              last_name: formValues.lastName,
              job_ttle: formValues.jobTitle,
              mobile_number: formValues.mobileNumber,
              timezone: 'Asia/Manila'
            },
            current_password: '',
            email: formValues.email,
            alias: formValues.alias
          }

          this._globalService.httpUpdateProfile(newFormValues);
          Swal.fire({
            timer: 300,
            didOpen: () => {
              Swal.showLoading();
            }
          }).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Successfully Updated',
              });
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Form Field Required',
            text: 'Please complete all required fields'
          });
        }

  }

}
