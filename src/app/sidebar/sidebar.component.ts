import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isLogged: boolean;

  profile = {
    name: '',
    job: '',
    email: '',
    number: '',
    photo: ''
  }

  constructor(private _globalService: GlobalService) {
    this.isLogged = false;
  }

  ngOnInit(): void {

    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    )
    this._globalService.checkLogStatus();

    if(this.isLogged){
      this._globalService.httpGetProfile();
      this._globalService.onHttpGetProfile.subscribe(
        (response: any) => {
          if(response){
            this.profile.name = response.name;
            this.profile.job = response.meta.job_ttle;
            this.profile.email = response.email;
            this.profile.number = response.meta.mobile_number;
            this.profile.photo = response.meta.photo_url;
          } else {
            this.profile.name = '';
            this.profile.job = '';
            this.profile.email = '';
            this.profile.number = '';
            this.profile.photo = '';
          }
        }
      )
    }
  }


}
