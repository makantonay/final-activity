import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLogged: boolean;

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
  }

}
