import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Registration} from '../model/registration';
import {Router} from '@angular/router';
import {RegistrationService} from '../service/registration.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  public errorReg = false;
  public errorRegMessage: string;
  public fieldTextType = false;
  public registrationFormGroup: FormGroup;
  public users = [
    {name: 'Student', value: 'Student', checked: false},
    {name: 'Lecturer', value: 'Lecturer', checked: false}
  ];
  public retrievedUserDetails: Registration;
  public successMessage = '';

  constructor(private router: Router, private registrationService: RegistrationService) {
    this.errorRegMessage = '';
    this.registrationFormGroup = new FormGroup({
      usertype: new FormControl('', Validators.required),
      accessID: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });

    this.retrievedUserDetails = new Registration
    ('', '', '', '', '', '', '', '');
  }

  retrieveUserDetails(accessID: string): void {
    if (accessID !== '') {
      this.registrationService.retrieveUserDetails(accessID)
        .subscribe((res) => {
            this.retrievedUserDetails = res;
          },
          (err) => {
            this.errorRegMessage = err.error;
            this.errorReg = true;
          });
    }
    console.log(this.retrievedUserDetails);
  }
  ngOnInit(): void{
   /* this.router.events.subscribe(event => {
      if (event instanceof NavigationStart){

      }
    });*/
  }

  onSubmit(): void {
    if (this.registrationFormGroup.controls.password.value !== this.registrationFormGroup.controls.confirmPassword.value) {
      this.errorReg = true;
      this.errorRegMessage = 'Passwords don\'t match!';
    } else {
      this.retrievedUserDetails.password = this.registrationFormGroup.controls.password.value;
      this.registrationService.saveUser(this.retrievedUserDetails)
        .subscribe((res) => {
            this.successMessage = res;
          },
          (err) => {
            this.errorReg = true;
            this.errorRegMessage = err.error;
          });
      console.log(this.successMessage);
    }
  }
}
