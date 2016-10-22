import {Component, OnInit} from "@angular/core";
import {DialogService} from "../dialog.service";
import {IDialog} from "../../shared/interfaces/IDialog";
import {Input} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss']
})
export class ChatsListComponent implements OnInit {

  @Input() dialogs: IDialog[];
  showedDialogs: number = 4;

  constructor(private dialogService: DialogService) { }

  isShowBtnDisabled() {
    return this.showedDialogs >= (this.dialogs ? this.dialogs.length : 0);
  }

  ngOnInit() {

  }

  showMore() {
    this.showedDialogs += 4;
  }

}
