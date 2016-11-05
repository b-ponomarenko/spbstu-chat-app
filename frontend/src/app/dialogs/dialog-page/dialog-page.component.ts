import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IDialog} from "../../shared/interfaces/IDialog";
import {Dialog} from "../../shared/models/Dialog";
import {IMessage} from "../../shared/interfaces/IMessage";
import {SocketService} from "../../shared/socket.service";
import {EventTypes} from "../../shared/enums/EventTypes";
import {Message} from "../../shared/models/Message";

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent implements OnInit {

  messages: IMessage[];
  dialog: IDialog;
  connection;

  constructor(private route: ActivatedRoute, private socketService: SocketService) { }

  ngOnInit() {
    const { avatar, title, messages } = this.route.snapshot.data['dialog'];
    this.dialog = new Dialog(title, avatar);
    this.messages = messages;
    this.connection = this.socketService.getSocket(this.onSocketMessage.bind(this));
  }

  onSocketMessage(messageEvent) {
    const data = JSON.parse(messageEvent.data);
    switch (data.event) {
      case EventTypes.SEND_MESSAGE:
        this._pushMessage(data);
        break;
    }
  }

  sendMessage(message) {
    const dataObject = {
      event: EventTypes.SEND_MESSAGE,
      data: {
        message,
        dialog: this.route.snapshot.params['id']
      }
    };
    this.socketService.send(dataObject);
  }

  private _pushMessage(data) {
    const message = new Message(data.message, data.user.firstName, data.user.lastName, data.user.email, new Date(data.createdDatetime));
    this.messages.push(message);
  }

}
