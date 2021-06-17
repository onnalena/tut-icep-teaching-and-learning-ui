import {Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../service/login.service';
import { Router } from '@angular/router';
import {Login} from '../model/login';
import {Registration} from '../model/registration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public hasError = false;
  public errorMsg = '';
  public nameToChild = '';
  public loginFormGroup: FormGroup;
  public fieldTextType = false;
  public retrievedUserDetails: Registration;
  public loggedInUser: Registration;
  public isLoggedIn = false;

  constructor(private router: Router, private loginService: LoginService) {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.retrievedUserDetails = new Registration('', '', '',
      '', '', '', '', '');
    this.loggedInUser = new Registration('', '', '',
      '', '', '', '', '');
  }

  retrieveLoginUserDetails(username: string): void {
    if (username !== '') {
      this.loginService.retrieveUserDetails(username)
        .subscribe((res) => {
            this.retrievedUserDetails = res;
          },
          (err) => {
            this.errorMsg = err.error;
            this.hasError = true;
          });
      console.log(this.retrievedUserDetails);
    }
}

  onSubmit(): void {
    const login = new Login(this.loginFormGroup.controls.username.value, this.loginFormGroup.controls.password.value);
    this.loginService.loginUser(login)
      .subscribe((res) => {
        this.loggedInUser = res;
        console.log(this.loggedInUser);
        this.isLoggedIn = true;
        /*this.loginService.setLoginUser(this.loggedInUser*/
        }, (err) => { this.hasError = true;
                      this.errorMsg = err.error; });

  }
}
