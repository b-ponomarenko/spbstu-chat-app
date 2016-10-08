import {OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

export class FormComponent implements OnInit {

  checkForm: boolean = false;
  form: FormGroup;
  password: string = 'password';

  sendData(user) {}

  validateUser() {
    this.checkForm = true;
    if ( this.form.valid ) {
      this.sendData(this.form.value);
      this.checkForm = false;
    }
  }

  isInvalidField(isError): boolean {
    return isError && this.checkForm;
  }

  ngOnInit(): void {

  }

  showPassword() {
    this.password = 'text'
  }

  hidePassword() {
    this.password = 'password';
  }

}
