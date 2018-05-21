import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wip-processing',
  templateUrl: './wip-processing.component.html',
  styleUrls: ['./wip-processing.component.scss']
})
export class WipProcessingComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "WIP Processing",
      path: ''
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
