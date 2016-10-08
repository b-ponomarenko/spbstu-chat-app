import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  currentTabIndex: number;

  constructor(private router: Router) { }

  transitionToRoute() {
    const currentUrl = this.router.url.split('/').pop();
    switch (currentUrl) {
      case 'login':
        this.router.navigateByUrl('/auth/sign-up');
        break;
      case 'sign-up':
        this.router.navigateByUrl('/auth/login');
    }
  }

  ngOnInit() {
    const currentUrl = this.router.url.split('/').pop();
    switch (currentUrl) {
      case 'login':
        this.currentTabIndex = 0;
        break;
      case 'sign-up':
        this.currentTabIndex = 1;
        break;
      default:
        this.currentTabIndex = 0;
    }
  }

}
