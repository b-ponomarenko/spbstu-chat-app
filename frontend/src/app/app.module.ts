import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ChatsListComponent } from './chats-list/chats-list.component';
import {RoutingModule} from "./app-routing.module";

// import {ChatsListComponent} from "./chats-list/chats-list.component";
// import {Routes, RouterModule} from "@angular/router";
//
// const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/inbox' },
//   { path: 'inbox', component: ChatsListComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ChatsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
