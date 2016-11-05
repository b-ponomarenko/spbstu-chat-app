import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, Router} from "@angular/router";
import {DialogService} from "./dialog.service";

@Injectable()
export class DialogsResolve implements Resolve<any> {

  constructor(private dialogService: DialogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dialogService.getDialogs();
  }
}