import { Component, OnInit, ViewChild } from '@angular/core';
import { Estimate } from '../../models/estimate.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancialService } from '../financial.service';
import { FormType } from '../../shared/data/FormType';

@Component({
    selector: 'app-edit-estimate',
    templateUrl: './edit-estimate.component.html',
    styleUrls: ['./edit-estimate.component.scss']
})

export class EditEstimateComponent implements OnInit {

	public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "View Jobs",
      path: 'dashboard/view-jobs'
    },
    {
      text: "Edit Estimate",
      path: ''
    }
  ];

  public title = "Edit Estimate";

  public estimate: Estimate;

  public formType = FormType.Edit;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private financialService: FinancialService) {

  }

  public ngOnInit() {
     this
      .route.paramMap
      .subscribe(params => {
          const estimateId = +params.get('estimate_id');
          this.estimate = new Estimate();

          this.financialService.show(estimateId)
              .subscribe(res => {
                  this.estimate.parseDataIn(res.data);
              });
      });
  }
}
