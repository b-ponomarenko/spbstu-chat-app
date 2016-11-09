import {Component, OnInit} from "@angular/core";
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
  dialogName: string;

  socket;

  constructor(private route: ActivatedRoute, private socketService: SocketService) {}

  createDialog(dialogName) {
    this.socketService.send({
      event: EventTypes.CREATE_DIALOG,
      data: {
        dialogName
      }
    });
    this.dialogName = null;
  }

  ngOnInit() {
    this.dialogs = this.route.snapshot.data['dialogs'];
    this.socket = this.socketService.getSocket(this.onSocketMessage.bind(this), this.onOpenSocket.bind(this));
  }

  onSocketMessage(data) {
    const { dialog } = data;
    switch (data.event) {
      case EventTypes.CREATE_DIALOG:
        this.dialogs.unshift(new Dialog(dialog.title, dialog.avatar));
    }
  }

  onOpenSocket(e) {
    console.log(e);
  }

}
