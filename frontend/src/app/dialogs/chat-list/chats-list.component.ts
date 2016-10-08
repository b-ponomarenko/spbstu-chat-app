import {Component, OnInit} from "@angular/core";
import {DialogService} from "../dialog.service";
import {IDialog} from "../../shared/models/IDialog";

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit {

  dialogs: IDialog[];
  showedDialogs: number = 4;

  constructor(private dialogService: DialogService) { }

  isShowBtnDisabled() {
    return this.showedDialogs >= (this.dialogs ? this.dialogs.length : 0);
  }

  ngOnInit() {
    this.dialogService.getDialogs()
      .subscribe(data => {
        this.dialogs = data;
      });
  }

  showMore() {
    this.showedDialogs += 4;
  }

}
