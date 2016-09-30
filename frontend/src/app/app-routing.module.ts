import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatsListComponent } from "./chats-list/chats-list.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inbox' },
  { path: 'inbox', component: ChatsListComponent },
  { path: 'auth', children: [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
