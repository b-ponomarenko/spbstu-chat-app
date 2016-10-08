import {Injectable} from "@angular/core";
import {URL} from "../config";
import {AuthHttpService} from "../shared/auth-http.service";
import {Observable} from "rxjs";
import {IDialog} from "../shared/models/IDialog";

@Injectable()
export class DialogService {

  constructor(private http: AuthHttpService) { }

  getDialogs(): Observable<IDialog[]> {
    return this.http.get(`${URL}/api/dialogs`)
      .map(response => response.json());
  }

}
