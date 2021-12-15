import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../services/permissions.service';
import { OptionMenuModel } from '../model/OptionMenu.model';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css'],
})
export class LeftPanelComponent implements OnInit {
  menu: OptionMenuModel[] = Array<OptionMenuModel>();

  constructor(private permissions: PermissionsService) {}

  ngOnInit(): void {
    this.permissions.getMenuOptionsValidated().then((options) => {
      this.menu = options.filter((optionFiltered) => optionFiltered.isShow);
    });
  }
}
