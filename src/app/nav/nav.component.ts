import { GlobalService } from './../services/global.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  isLogged = false;

  constructor(private _globalService: GlobalService, private router: Router) { }

  ngOnInit(): void {
    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    )
    this._globalService.checkLogStatus();
  }

  onLogout(): void {
    Swal.fire({
      icon: 'success',
      title: 'Logout Successfully!',
    });
    this._globalService.deleteToken();
    this._globalService.onHttpGetProfile.next('');
    this.router.navigate([''], {})
  }

  ngOnDestroy(): void {
    this._globalService.onHttpGetProfile.unsubscribe();
  }
}
