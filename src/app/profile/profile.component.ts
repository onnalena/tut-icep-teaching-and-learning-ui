import {Component, Input, OnInit} from '@angular/core';
import {Registration} from '../model/registration';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {RegistrationService} from '../service/registration.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() userDetails = new Registration('216609874', 'Kopano', 'Rakodi',
    'Female', 'natasharakodi@gmail.com', '0712345678', '', 'Student');

  public menuItems = ['profile', 'tests', 'assignments', 'marks'];

  public isEdit = false;
   public updateUserDetailsFormGroup: FormGroup;
  public updateErrorMessage = '';
  public updateHasError = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private updateUserService: RegistrationService) {
    this.updateUserDetailsFormGroup = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cellNumber: new FormControl('', Validators.required)
    });
  }
  ngOnInit(): void {
    console.log(this.userDetails);
  }
  edit(): void{
    this.isEdit = true;
  }
  update(): void{
    this.userDetails.firstName = this.updateUserDetailsFormGroup.controls.firstname.value;
    this.userDetails.lastName = this.updateUserDetailsFormGroup.controls.lastname.value;
    this.userDetails.cellNumber = this.updateUserDetailsFormGroup.controls.cellNumber.value;
    this.userDetails.email = this.updateUserDetailsFormGroup.controls.email.value;
    this.updateUserService.updateUserDetails(this.userDetails).subscribe((res) => {this.userDetails = res;
                                                                                   this.isEdit = false; },
      (err) => {this.updateErrorMessage = err.error; this.updateHasError = true; });
  }
}
