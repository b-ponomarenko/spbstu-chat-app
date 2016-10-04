import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  checkForm: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  signUpUser() {
    this.checkForm = true;
    if ( this.signUpForm.valid ) {
      // send data to server
    }
  }

  resetForm() {
    this.checkForm = false;
  }

  isInvalidField(isError): boolean {
    return isError && this.checkForm;
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
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
