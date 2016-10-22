import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IDialog} from "../../shared/interfaces/IDialog";
import {EventTypes} from "../../shared/enums/EventTypes";
import {Dialog} from "../../shared/models/Dialog";
import {SocketService} from "../../shared/socket.service";

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialogs-page.component.html',
  styleUrls: ['./dialogs-page.component.scss']
})
export class DialogsPageComponent implements OnInit {

  dialogs: IDialog[];

  socket;

  constructor(private route: ActivatedRoute, private socketService: SocketService) { }

  createDialog(dialogName) {
    this.socket.send(JSON.stringify({
      event: EventTypes.CREATE_DIALOG,
      data: dialogName
    }));
  }

  ngOnInit() {
    this.dialogs = this.route.snapshot.data['dialogs'];
    this.socket = this.socketService.getSocket(this.onSocketMessage.bind(this), this.onOpenSocket.bind(this));
  }

  onSocketMessage(e) {
    const data = JSON.parse(e.data);
    switch (data.event) {
      case EventTypes.CREATE_DIALOG:
        this.dialogs.unshift(new Dialog(data.data));
    }
  }

  onOpenSocket(e) {
    console.log(e);
  }

}
