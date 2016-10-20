import {Injectable} from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {IDialog} from "../shared/models/IDialog";
import {DialogService} from "./dialog.service";

@Injectable()
export class DialogResolve implements Resolve<any> {

  constructor(private dialogService: DialogService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dialogService.getDialogs();
  }
}