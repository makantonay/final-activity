import { TicketListComponent } from './pages/tickets/ticket-list/ticket-list.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { TicketViewComponent } from './pages/tickets/ticket-view/ticket-view.component';

const routes: Routes = [
  { path: '', component: ContentComponent, children:[
    { path: '' , component: HomeComponent },
    { path: 'my-profile', component: MyProfileComponent },
    { path: 'tickets', component: TicketListComponent },
    { path: 'tickets/:id/view', component: TicketViewComponent }
  ]},
  { path: 'about-us', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
