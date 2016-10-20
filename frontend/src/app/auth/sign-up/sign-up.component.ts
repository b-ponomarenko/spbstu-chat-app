import {Component, OnInit} from "@angular/core";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../../shared/models/User";
import {FormComponent} from "../form.component";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends FormComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    super();
  }

  sendData({ email, password, firstName, lastName }) {
    debugger;
    this.authService.signUp(new User( email, password, firstName, lastName ))
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('inbox');
        }
      );
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
