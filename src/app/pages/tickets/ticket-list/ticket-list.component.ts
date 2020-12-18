import { Title } from '@angular/platform-browser';
import { GlobalService } from './../../../services/global.service';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  isLogged: any;
  @Input() tickets: any;

  ticket = [];
  total_tickets: any;

  constructor(
    private _globalService: GlobalService,
    private router: Router,
    private titleService: Title) {
    this.isLogged = false;
    this.titleService.setTitle('MyTicket | Ticket')
  }

  ngOnInit(): void {

    this._globalService.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    )
    this._globalService.checkLogStatus();

    if(!this._globalService.getToken()){
      Swal.fire({
        timer: 2000,
        icon: 'error',
        title: 'An Error Occured',
        text: 'Unauthorized Access!'
      }).then(() =>{
        this.router.navigate([''], {})
      });

    }

    this._globalService.httpGetTicket();
    this._globalService.onHttpGetTickets.subscribe(
      (response: any) => {
        if(response){
          this.tickets = response.data;
          this.total_tickets = response.total;
        }

      }
    )
  }

  onView(): void {
    Swal.fire({
      timer: 300,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

}
