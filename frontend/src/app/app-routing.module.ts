import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./auth/auth.service";
import {LogoutComponent} from "./auth/logout/logout.component";
import {DialogsPageComponent} from "./dialogs/dialogs-page/dialogs-page.component";
import {DialogsResolve} from "./dialogs/dialogs.resolver";
import {DialogPageComponent} from "./dialogs/dialog-page/dialog-page.component";
import {DialogResolve} from "./dialogs/dialog.resolver";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inbox' },
  { path: 'inbox', component: DialogsPageComponent, resolve: { dialogs: DialogsResolve }, canActivate: [AuthService] },
  { path: 'dialogs/:id', component: DialogPageComponent, resolve: { dialog: DialogResolve } },
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
