import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {AUTH_PREFIX} from "../config";

@Injectable()
export class AuthHttpService {

  headers: Headers;

  constructor(private http: Http) {
    const token: string = localStorage.getItem('token') || '';
    this.headers = new Headers({ 'Authorization' : this._getToken() })
  }

  get(url: string): Observable<Response> {
    this.headers.set('Authorization', this._getToken());
    return this.http.get(url, { headers: this.headers });
  }

  post(url: string, body: Object): Observable<Response> {
    this.headers.set('Authorization', this._getToken());
    return this.http.post(url, body, { headers: this.headers })
  }

  private _getToken(): string {
    const token: string = localStorage.getItem('token') || '';
    return `${AUTH_PREFIX} ${token}`;
  }

}
