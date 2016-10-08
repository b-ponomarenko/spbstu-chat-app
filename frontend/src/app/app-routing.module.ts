import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ChatsListComponent} from "./dialogs/chat-list/chats-list.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./auth/auth.service";
import {LogoutComponent} from "./auth/logout/logout.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inbox' },
  { path: 'inbox', component: ChatsListComponent, canActivate: [AuthService] },
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'logout', component: LogoutComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }
