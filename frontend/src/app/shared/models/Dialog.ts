import {IDialog} from "../interfaces/IDialog";
import {Message} from "./Message";

export class Dialog implements IDialog {
  lastMessage: Message;
  messages: Message[];
  constructor(public title, public avatar?, public id?) { }
}