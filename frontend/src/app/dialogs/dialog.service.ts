import {Injectable} from "@angular/core";
import {URL} from "../config";
import {AuthHttpService} from "../shared/auth-http.service";
import {Observable} from "rxjs";
import {IDialog} from "../shared/interfaces/IDialog";

@Injectable()
export class DialogService {

  constructor(private http: AuthHttpService) {
  }

  getDialogs(): Observable<IDialog[]> {
    return this.http.get(`${URL}/api/dialogs`)
      .map(response => response.json());
  }

  getDialogById(id): Observable<IDialog> {
    return this.http.get(`${URL}/api/dialogs/${id}`)
      .map(response => response.json())
  }

}
