import {Injectable} from "@angular/core";
import {URL} from "../config";
import {AuthHttpService} from "../shared/auth-http.service";
import {Observable} from "rxjs";
import {IDialog} from "../shared/interfaces/IDialog";
import {Router} from "@angular/router";

@Injectable()
export class DialogService {

  constructor(private http: AuthHttpService, private router: Router) {
  }

  getDialogs(): Observable<IDialog[]> {
    return this.http.get(`${URL}/api/dialogs`)
      .map(response => response.json())
      .catch(this.handleErrors);
  }

  getDialogById(id): Observable<IDialog> {
    return this.http.get(`${URL}/api/dialogs/${id}`)
      .map(response => response.json())
  }

  handleErrors(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
