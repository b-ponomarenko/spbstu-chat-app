import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IDialog} from "../../shared/interfaces/IDialog";
import {Dialog} from "../../shared/models/Dialog";
import {IMessage} from "../../shared/interfaces/IMessage";

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent implements OnInit {

  messages: IMessage[];
  dialog: IDialog;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const { avatar, title, messages } = this.route.snapshot.data['dialog'];
    this.dialog = new Dialog(title, avatar);
    this.messages = messages;
  }

}
