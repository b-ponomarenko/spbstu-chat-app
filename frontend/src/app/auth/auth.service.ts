import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "../shared/models/User";
import {Observable} from "rxjs/Observable";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {URL} from "../config";

@Injectable()
export class AuthService implements CanActivate {

  constructor(private http: Http) { }

  login(user: User) {
    return this.http.post(`${URL}/auth/login`, user)
      .map(response => response.json())
      .catch(this.handleError);
  }

  signUp(user: User) {
    return this.http.post(`${URL}/auth/sign-up`, user)
      .map(response => response.json())
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn();
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
