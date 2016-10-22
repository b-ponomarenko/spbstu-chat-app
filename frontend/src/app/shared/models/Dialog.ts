import {IDialog} from "../interfaces/IDialog";

export class Dialog implements IDialog {
  constructor(public title, public avatar?) { }
}