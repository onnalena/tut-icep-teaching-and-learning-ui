import {Component, Input, OnInit} from '@angular/core';
import {Registration} from '../model/registration';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() loggedInUser = new Registration('', '', '', '', '', '', '', '');
  @Input() isLoggedIn = false;
  constructor() {
  }

  ngOnInit(): void {
  }

}
