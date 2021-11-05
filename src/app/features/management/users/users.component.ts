import { Component, OnInit } from '@angular/core';
import { NewUserModel } from './models/newUserModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  subject = new Subject<NewUserModel>();

  constructor() {}

  ngOnInit(): void {}
}
