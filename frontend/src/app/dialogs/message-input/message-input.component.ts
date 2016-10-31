import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  message: string;
  MAX_MESSAGE_LENGTH: number = 140;

  @Output() messageSended: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  sendMessage(message: string): void {
    this.messageSended.emit(message);
  }

}
