import {IDialog} from "./IDialog";

export class Dialog implements IDialog {
  constructor(public title, public avatar?) { }
}