import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.scss']
})
export class ViewReportsComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "View Reports",
      path: ''
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
