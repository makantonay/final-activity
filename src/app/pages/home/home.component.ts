import { GlobalService } from './../../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: boolean;
  name: any;

  constructor(
    private _globalService: GlobalService,
    private titleService: Title) {
    this.isLogged = false;
    this.titleService.setTitle('MyTicket | Home')
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
          this.name = response.alias;

        }
      )
    }

  }

}
