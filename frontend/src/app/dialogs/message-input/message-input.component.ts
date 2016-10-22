import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {

  message: string;
  MAX_MESSAGE_LENGTH: number = 140;

  constructor() { }

  ngOnInit() {
  }

  foo() {
    console.log(arguments);
  }

}
