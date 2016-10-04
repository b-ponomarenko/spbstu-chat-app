import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  checkForm: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  loginUser() {
    this.checkForm = true;
    if ( this.loginForm.valid ) {
      // send data to server
    }
  }

  isInvalidField(isError): boolean {
    return isError && this.checkForm;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
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
