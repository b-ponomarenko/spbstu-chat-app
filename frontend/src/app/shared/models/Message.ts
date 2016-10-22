import {IMessage} from "../interfaces/IMessage";

export class Message implements IMessage {
  constructor(public message, public firstName, public lastName, public email, public createdDatetime) {}
}