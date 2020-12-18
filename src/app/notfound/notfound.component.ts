import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('My Ticket | Not Found');
   }

  ngOnInit(): void {
  }

}
