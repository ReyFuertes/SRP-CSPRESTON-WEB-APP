import { Component, OnInit, ViewChild } from '@angular/core';
import { FormType } from '../../shared/data/FormType';

@Component({
    selector: 'app-create-estimate',
    templateUrl: './create-estimate.component.html',
    styleUrls: ['./create-estimate.component.scss']
})

export class CreateEstimateComponent implements OnInit {

  	public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "View Jobs",
      path: '/view-jobs'
    },
    {
      text: "Create Estimate",
      path: ''
    }
  ];

  public formType = FormType.New;

  public ngOnInit() {
      //
  }
}
