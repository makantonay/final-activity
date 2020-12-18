import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Login } from './../pages/login/login-model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isLogged = new Subject();
  onHttpLogin = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();
  onHttpGetTickets = new Subject();


  constructor(private http: HttpClient) { }

  httpLogin(logins: Login){
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    this.http.post(url, logins).subscribe(
      (response: any) => {
        if(response.status === 'success'){
          this.onHttpLogin.next(response.data)
          this.isLogged.next(true)
        }
      },
      (error) => {
        this.onHttpLogin.next(error)
        console.log('Error response', error);
      }
    );
  }

  httpGetProfile(): void{
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.get(url,{
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response: any) => {
        console.log('this is from httpGetProfile Service', response);

        if(response.status === 'success'){
           this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log('Error response in httpGetProfile', error);
      }
    )
  }

  httpUpdateProfile(data: any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this.http.put(url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response: any) => {
        console.log('this is from httpUpdateProfile serve', response);

        if (response.status === 'success'){
          this.onHttpUpdateProfile.next(response.data);
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log('Error response in httpUpdateProfile', error);
      }
    );
  }

  httpGetTicket(): void {

    const ticketUrl = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my?exclude_signature=1';
    const token = this.getToken();

    this.http.get(ticketUrl, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
    }).subscribe(
      (response: any) => {
        if(response.status === 'success'){
          this.onHttpGetTickets.next(response);
        }

      },
      (error) => {
        console.log('Error response in httpGetTicket', error);
      }
    );

  }

  setToken(token: string): string{
    localStorage.setItem('token', token);
    return token;
  }

  getToken(): string{
    const token = localStorage.getItem('token');
    return token?.toString() || '';
  }

  checkLogStatus(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }


}
