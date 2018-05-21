import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'srp-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: [ './breadcrumbs.component.scss' ]
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: any[] = [];
  
  constructor(private router: Router) {}
  
  goToBreadcrumb(path: string) {
    this.router.navigate([path]);
  }
}
