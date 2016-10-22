import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {IMessage} from "../../shared/interfaces/IMessage";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input() messages: IMessage[];

  constructor() { }

  ngOnInit() {
  }

}
