import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../../shared/models/User";
import {FormComponent} from "../form.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormComponent implements OnInit {

  constructor(public router: Router, public formBuilder: FormBuilder, public authService: AuthService) {
    super();
  }

  sendData({ email, password }) {
    this.authService.login(new User( email, password ))
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('inbox');
        }
      );
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(32)
      ])]
    });
  }

}
