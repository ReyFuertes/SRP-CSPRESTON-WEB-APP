import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'jobs-tabmenu',
  templateUrl: './jobs-tabmenu.component.html',
  styles: [
      ':host { width: 100%; }'
  ]
})
export class JobsTabmenuComponent implements OnInit {

  items: MenuItem[];

  activeItem: MenuItem;

  @Input() selected: number = 1;

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {

    this.items = [
      {label: 'Job List', icon: 'fa-briefcase', routerLink: '/view-jobs' },
      {label: 'Timecards', icon: 'fa-clock-o', routerLink: '/employee-timecards' },
      {label: 'Vendor Invoices', icon: 'fa-book'},
      {label: 'Costs', icon: 'fa-usd'},
    ];

    this.activeItem = this.items[this.selected];

  }

}
