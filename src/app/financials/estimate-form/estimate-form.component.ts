import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { JobService } from '../../jobs/job.service';
import { FinancialService } from '../financial.service';
import { SharedService } from '../../shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../notifications/notifications.service';
import { Estimate } from '../../models/estimate.model';
import { EstimateTypeEnum, CostTypeEnum } from '../../models/estimate.enum';
import { FormType } from '../../shared/data/FormType';
import { NumberService } from '../../shared/services/number/number.service';

@Component({
    selector: 'app-estimate-form',
    templateUrl: './estimate-form.component.html',
    styleUrls: ['./estimate-form.component.scss']
})

export class EstimateFormComponent implements OnInit {

  @Input()
  public formType = FormType.New;

  @Input()
  public breadcrumbs: any = [];

  @Input()
  public title = 'Create New Estimate';

  @Input()
  public estimate: Estimate = new Estimate(); 

  @Output()
  public backButtonClick = new EventEmitter();

  @Output()
  public messageUpdater = new EventEmitter();

  public id = null;

  public job = null;

  public estimateForm: FormGroup;

  public estimateType = 'FIXED_BID';

  public estimateTypes: any[] = [];

  public itemRows: any[] = [];

  public details: any = [];

  // FixedBid items
  public costTypes: any[] = [];

  public lineItems: any[] = [];

  // Fixed bid totals
  public estimateAmtTotal = 0;

  public marginTotal = 0;

  public budgetTotal = 0;

  public actualCostTotal = 0;

  public pendingCostTotal = 0;

  public actualBillableTotal = 0;

  public runningBillableTotal = 0;

  public tmMarginTotal = 0;

  public tmBudgetTotal = 0;

  public editedColumn = null;

  public editedIndex = null;

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private ref: ChangeDetectorRef,
    private fS: FinancialService,
    private ss: SharedService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private notificationService: NotificationsService,
    private numberService: NumberService
  ) {

  }

  public ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      if (this.formType == FormType.Edit) {
        this.addItems(params['estimate_id']);
      }

      this.id = +params['id'];
    });

    this.listJob();
    this.createEstimateForm();
    this.listEstimateTypes();
    this.listCostTypes();
    this.listLineItems();
    
    if (this.formType == FormType.New) {
      this.addLineItem();
    }
  }

  protected addItems(id) {
    this
    .fS
    .show(id)
    .subscribe(res => {
        this.estimateType = res.data.type;
        this.estimateForm.get('estimateAmtTotal').setValue(this.formatNumber(res.data.estimate_amount.toFixed(2)));
        this.estimateForm.get('marginTotal').setValue(this.formatNumber(res.data.forecasted_margin.toFixed(2)));
        this.estimateForm.get('budgetTotal').setValue(this.formatNumber(res.data.budget_amount.toFixed(2)));
        this.estimateForm.get('actualCostTotal').setValue(this.formatNumber(res.data.actual_cost_total.toFixed(2)));
        this.estimateForm.get('pendingCostTotal').setValue(this.formatNumber(res.data.pending_cost_total.toFixed(2)));

        this.estimateForm.get('runningBillableTotal').setValue(this.formatNumber(res.data.estimate_amount.toFixed(2))); 
        this.estimateForm.get('tmMarginTotal').setValue(this.formatNumber(res.data.forecasted_margin.toFixed(2))); 
        this.estimateForm.get('tmBudgetTotal').setValue(this.formatNumber(res.data.budget_amount.toFixed(2))); 

        res.data.items.forEach(item => {
          this.onAddingNewLineItem(item);
          this.itemRowTotal();
        });
    });
  }

  protected listJob() {
    this
      .jobService
      .show(this.id)
      .subscribe(
      (res) => {
        this.job = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  protected listEstimateTypes() {
    this.estimateTypes = Object.keys(EstimateTypeEnum).map(key => ({
      id: key, text: EstimateTypeEnum[key]
    }));
  }

  protected listCostTypes() {
    this.costTypes = Object.keys(CostTypeEnum).map(key => ({
      id: key, text: CostTypeEnum[key]
    }));
  }

  protected listLineItems() {
    this.jobService
    .lineItems()
    .subscribe(
      (res) => {
        res.data.forEach(item => {
          this.lineItems.push({ id: item.id, text: item.name });
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  protected initItemRows(item: any = null) {

    if (item) {
      return this.fb.group({
        id: [item.id],
        costType: [item.cost_type],
        lineItem: [item.line_item_id],
        margin: [item.margin_percentage],
        budget: [item.budget],
        estimateAmt: [item.amount],
        actualBillable: [0],
        runningBillable: [item.amount],
        tmMargin: [item.margin_percentage],
        tmBudget: [item.budget],
        actualCost: new FormControl({value: item.actual_cost, disabled: true}),
        pendingCost: new FormControl({value: item.pending_cost, disabled: true}),
      });
    } else {
      return this.fb.group({
        costType: ['LABOR'],  
        lineItem: [1],
        margin: [0],
        budget: [0],
        estimateAmt: [0],
        actualBillable: [0],
        runningBillable: [0],
        tmMargin: [0],
        tmBudget: [0],
        actualCost: new FormControl({value: 0, disabled: true}),
        pendingCost: new FormControl({value: 0, disabled: true}),
      });
    }
  }

  public addLineItem() {
    this.onAddingNewLineItem();
    this.itemRowTotal();
  }

  protected onAddingNewLineItem(item = null) {
    const control = <FormArray>this.estimateForm.controls['itemRows'] as FormArray;
    control.push(this.initItemRows(item));
  }

  protected onRemovingLineItem(index) {
    const control = <FormArray>this.estimateForm.controls['itemRows'] as FormArray;
    control.removeAt(index);

    this.sumUpTotals();
  }

  protected createEstimateForm() {
    this.estimateForm = this.fb.group({
      name: ['', Validators.required],
      job: this.job,
      estimateType: [this.estimateType],
      itemRows: this.fb.array([]),

      estimateAmtTotal: [this.formatNumber(this.estimateAmtTotal.toFixed(2))],
      marginTotal: [this.formatNumber(this.marginTotal.toFixed(2))],
      budgetTotal: [this.formatNumber(this.budgetTotal.toFixed(2))],
      actualCostTotal: [this.formatNumber(this.actualCostTotal.toFixed(2))],
      pendingCostTotal: [this.formatNumber(this.pendingCostTotal.toFixed(2))],

      actualBillableTotal: [this.formatNumber(this.actualBillableTotal.toFixed(2))],
      runningBillableTotal: [this.formatNumber(this.runningBillableTotal.toFixed(2))],
      tmMarginTotal: [this.formatNumber(this.tmMarginTotal.toFixed(2))],
      tmBudgetTotal: [this.formatNumber(this.tmBudgetTotal.toFixed(2))]
    });
  }

  public onChangeName(event) {
    this.estimateForm
    .get('name')
    .setValue(event.target.value);
  }

  public onSelectingEstimateType(event) {
    this.estimateType = event.id;

    this.estimateForm
    .get('estimateType')
    .setValue(event.id);
  }

  get getItems() { return <FormArray>this.estimateForm.get('itemRows'); }

  public onEdit(column: string, index: number) {
    this.editedColumn = column;
    this.editedIndex = index;
  }

  protected itemRowTotal() {
    this.getItems.controls.forEach((control, index) => {
      control
      .valueChanges
      .debounceTime(500)
      .subscribe((val) => {
        let costType = val.costType,
            lineItem = val.lineItem,
            estimate = !val.estimateAmt ? 0 : parseFloat(val.estimateAmt),
            budget = !val.budget ? 0 : parseFloat(val.budget),
            margin = !val.margin ? 0 : (!budget || estimate == budget || !estimate || (estimate && budget) ? parseFloat(val.margin): ((Math.abs(estimate - budget) / estimate) * 100)),
            actualBillable = parseFloat(val.actualBillable),
            runningBillable = !val.runningBillable ? 0 : parseFloat(val.runningBillable), 
            tmBudget = !val.tmBudget ? 0 : parseFloat(val.tmBudget),
            tmMargin = !val.tmMargin ? 0 : (!tmBudget || runningBillable == tmBudget || !runningBillable || (runningBillable && tmBudget) ? parseFloat(val.tmMargin): ((Math.abs(runningBillable - tmBudget) / runningBillable) * 100));

        if (index == this.editedIndex) {

          if (this.estimateType == 'FIXED_BID') {

            if (this.editedColumn == 'estimate') {
              if (!margin && !budget) {
                budget = estimate;
              } else {

                if ((margin && budget) || (margin && !budget)) {
                  budget = Math.abs((estimate * (margin / 100)) - estimate);
                } else if ((!margin && budget) && (estimate > budget)) {
                  margin = (budget / estimate) * 100;
                } else {  
                  budget = 0;
                  margin = 0;
                }
              }
            }

            if (this.editedColumn == 'budget' || this.editedColumn == 'margin') {

              if (this.editedColumn == 'margin') {
                if ((estimate && !budget) || (estimate && budget)) {

                  if (estimate && budget) {
                    margin = val.margin;
                  }

                  budget = Math.abs((estimate * (margin / 100)) - estimate);
                }

                if (!estimate && budget) {
                  estimate = Math.abs((budget * (margin / 100)) + budget);
                }

                if (!margin) {
                  estimate = budget;
                }
              }

              else {
                if (estimate && !margin) {
                  budget = estimate;
                }

                if ((!estimate && margin) || (estimate && margin)) {
                  estimate = Math.abs((budget * (margin / 100)) + budget); 
                }
              }
            }
            
            this.getItems.controls[index].get('estimateAmt').setValue(estimate);
            this.getItems.controls[index].get('budget').setValue(budget);
            this.getItems.controls[index].get('margin').setValue(margin);
          } else {

            if (this.editedColumn == 'billable') {
              if (!tmMargin && !tmBudget) {
                tmBudget = runningBillable;
              } else {

                if ((tmMargin && tmBudget) || (tmMargin && !tmBudget)) {
                  tmBudget = Math.abs((runningBillable * (tmMargin / 100)) - runningBillable);
                } else if ((!tmMargin && tmBudget) && (runningBillable > tmBudget)) {
                  tmMargin = (tmBudget / runningBillable) * 100;
                } else {

                  tmBudget = 0;
                  tmMargin = 0;
                }
              }
            }

            if (this.editedColumn == 'tmBudget' || this.editedColumn == 'tmMargin') {

              if (this.editedColumn == 'tmMargin') {
                if ((runningBillable && !tmBudget) || (runningBillable && tmBudget)) {

                  if (runningBillable && tmBudget) {
                    tmMargin = val.tmMargin;
                  }

                  tmBudget = Math.abs((runningBillable * (tmMargin / 100)) - runningBillable);
                }

                if (!runningBillable && tmBudget) {
                  runningBillable = Math.abs((tmBudget * (tmMargin / 100)) + tmBudget);
                }

                if (!tmMargin) {
                  runningBillable = tmBudget;
                }
              }

              else {
                if (runningBillable && !tmMargin) {
                  runningBillable = runningBillable;
                }

                if ((!runningBillable && tmMargin) ||(runningBillable && tmMargin)) {
                  runningBillable = Math.abs((tmBudget * (tmMargin / 100)) + tmBudget); 
                }
              }
            }


            this.getItems.controls[index].get('actualBillable').setValue(actualBillable);
            this.getItems.controls[index].get('runningBillable').setValue(runningBillable);
            this.getItems.controls[index].get('tmBudget').setValue(tmBudget);
            this.getItems.controls[index].get('tmMargin').setValue(tmMargin);
          }

          this.getItems.controls[index].get('costType').setValue(costType);
          this.getItems.controls[index].get('lineItem').setValue(lineItem);

          this.sumUpTotals();
        }
      });
    });    
  }

  public onSubmit() {

    if (this.formType === FormType.New) {
      this.create();
    }

    if (this.formType === FormType.Edit) {
      this.update();
    }

  }

  protected create() {
    this.notificationService.info('Creating your estimate...');

    this
    .fS
    .create(this.job.id, this.parseData())
    .subscribe(
      (res) => {
        this.notificationService.success('Estimate created!');
       
        setTimeout(() => {
          this.getJobFinancials();
        }, 3000);
      },
      (err) => {
        if (err.errors) {
            for (let i in err.errors) {
              this.notificationService.error(err.errors[i]);
            }
        } else if (err.message) {
          this.notificationService.error(err.message); 
        } else {
          this.notificationService.error('Whhooops, something is wrong. Please notify admin.');
        }
      }
    );

  }

  protected update() {
    this.notificationService.info('Saving estimate...');

    this
    .fS
    .update(this.estimate.id, this.parseData())
    .subscribe(
      (res) => {
        this.notificationService.success('Estimate saved!');
      
        setTimeout(() => {
          this.getJobFinancials();
        }, 3000);
      },
      (err) => {
        if (err.errors) {
            for (let i in err.errors) {
              this.notificationService.error(err.errors[i]);
            }
        } else if (err.message) {
          this.notificationService.error(err.message); 
        } else {
          this.notificationService.error('Whhooops, something is wrong. Please notify admin.');
        }
      }
    );
  }

  protected parseData() {
    const data = {
      name: this.estimateForm.value.name,
      type: this.estimateForm.value.estimateType,
    };

    if (this.estimateType === 'FIXED_BID') {
      this.transformFixedBidItems();
      Object.assign(data, {items: this.details});
    } else {
      this.transformTMBidItems();
      Object.assign(data, {items: this.details});
    }

    return data;
  }

  protected transformFixedBidItems() {
    this.details = [];

    this.getItems
    .value
    .forEach((item) => {
      const data = {
        cost_type: item.costType,
        line_item_id: parseInt(item.lineItem),
        budget: parseFloat(item.budget) * 100,
        margin: parseFloat(item.margin),
        qty: 1,
        amount: parseFloat(item.estimateAmt) * 100,
        rate: parseFloat(item.estimateAmt) * 100
      }

      if (item.id) {
        data['id'] = item.id;
      };

      this.details.push(data);
    });
  }

  protected transformTMBidItems() {
    this.details = [];

    this.getItems
    .value
    .forEach((item) => {
      const data = {
        cost_type: item.costType,
        line_item_id: parseInt(item.lineItem),
        budget: parseFloat(item.tmBudget) * 100,
        margin: parseFloat(item.tmMargin),
        actual_cost: parseFloat(item.actualCost),
        actual_billable: parseFloat(item.actualBillable) * 100,
        running_billable: parseFloat(item.runningBillable) * 100,
        qty: 1,
        amount: parseFloat(item.runningBillable) * 100,
        rate: parseFloat(item.runningBillable) * 100
      };

      if (item.id) {
        data['id'] = item.id
      }

      this.details.push(data);
    });
  }

  public getJobFinancials() {
     this.router.navigate(['/financials', this.id]);
  }

  protected formatNumber(n) {
    return this.numberService.checkNumber(n);
  }

  protected sumUpTotals() {
    let totalEstimate = 0,
        totalMargin = 0,
        totalBudget = 0;

    this
    .getItems
    .value
    .forEach((item) => {
      if (this.estimateType == 'FIXED_BID') {
        totalEstimate += parseFloat(item.estimateAmt);
        totalBudget += parseFloat(item.budget);
      } else {
        totalEstimate += parseFloat(item.runningBillable);
        totalBudget += parseFloat(item.tmBudget);
      }
    });

    if (totalEstimate > 0 && totalBudget > 0) {
      totalMargin = ((Math.abs(totalEstimate - totalBudget) / totalEstimate) * 100);
    }

    if (this.estimateType == 'FIXED_BID') {
      this
       .estimateForm
       .get('estimateAmtTotal')
       .setValue(!totalEstimate ? 0 : this.formatNumber(totalEstimate.toFixed(2)), {emitEvent: false});

      this
       .estimateForm
       .get('marginTotal')
       .setValue(!totalMargin ? 0 : this.formatNumber(totalMargin.toFixed(2)), {emitEvent: false});

      this
       .estimateForm
       .get('budgetTotal')
       .setValue(!totalBudget ? 0 : this.formatNumber(totalBudget.toFixed(2)), {emitEvent: false});

    } else {

      this
       .estimateForm
       .get('runningBillableTotal')
       .setValue(!totalEstimate ? 0 : this.formatNumber(totalEstimate.toFixed(2)), {emitEvent: false});

      this
       .estimateForm
       .get('tmMarginTotal')
       .setValue(!totalMargin ? 0 : this.formatNumber(totalMargin.toFixed(2)), {emitEvent: false});

      this
       .estimateForm
       .get('tmBudgetTotal')
       .setValue(!totalBudget ? 0 : this.formatNumber(totalBudget.toFixed(2)), {emitEvent: false});
     }

  }
}
