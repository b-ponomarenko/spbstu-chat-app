import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {ChatsListComponent} from "./dialogs/chat-list/chats-list.component";
import {RoutingModule} from "./app-routing.module";
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./auth/auth.service";
import {DialogService} from "./dialogs/dialog.service";
import {AuthHttpService} from "./shared/auth-http.service";
import {LogoutComponent} from "./auth/logout/logout.component";
import { DialogsPageComponent } from './dialogs/dialogs-page/dialogs-page.component';
import {DialogsResolve} from "./dialogs/dialogs.resolver";
import {SocketService} from "./shared/socket.service";
import { DialogPageComponent } from './dialogs/dialog-page/dialog-page.component';
import {DialogResolve} from "./dialogs/dialog.resolver";
import { MessageListComponent } from './dialogs/message-list/message-list.component';
import { MessageInputComponent } from './dialogs/message-input/message-input.component';
import { MdTextareaComponent } from './shared/md-textarea/md-textarea.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ChatsListComponent,
    AuthComponent,
    LogoutComponent,
    DialogsPageComponent,
    DialogPageComponent,
    MessageListComponent,
    MessageInputComponent,
    MdTextareaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, DialogService, DialogsResolve, DialogResolve, AuthHttpService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
