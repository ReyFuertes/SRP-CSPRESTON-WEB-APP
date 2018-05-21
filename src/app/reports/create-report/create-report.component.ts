import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "Create Report",
      path: ''
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
