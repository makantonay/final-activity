import { Title } from '@angular/platform-browser';
import { GlobalService } from './../../../services/global.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {
  isLogged: any;
  @Input() ticket:any;
  @Input() selectedTicket:any;

  tickets = [];

  constructor(
    private _globalService: GlobalService,
    private routerActive: ActivatedRoute,
    private router: Router,
    private titleService: Title) {
      this.isLogged = false;
      this.titleService.setTitle("MyTicket | Ticket")

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
        this.tickets = response.data;

        this.routerActive.params.subscribe(
          (params: Params) => {
            const id = params.id;
            const selected = this.tickets.filter(
              (ticket:any) => {
                return ticket.id === id;
              }
            )

            if(selected.length > 0){
              this.selectedTicket = selected[0];
            }

          }
        )

      }
    )
  }

  onBack(): void {
    Swal.fire({
      timer: 300,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

}
