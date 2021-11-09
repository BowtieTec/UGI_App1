import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements AfterViewInit {
  constructor(private router: Router, private messageService: MessageService) {}

  get loading() {
    return this.messageService.loading;
  }

  ngAfterViewInit(): void {
    /*  this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.messageService.showLoading();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
        }
      });*/
  }
}
