import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { TimeCardService } from '../timecard.service';
import { GlobalEventsService } from '../../shared/services/global-events/global-events.service';
import { DateService } from '../../shared/services/date/date.service';
import { NumberService } from '../../shared/services/number/number.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-employee-timecards',
  templateUrl: './employee-timecards.component.html',
  styleUrls: ['./employee-timecards.component.scss']
})

export class EmployeeTimecardsComponent implements OnInit {

  public timecardText = 'Timecard';
  
  public timecards = []; 
  
  public timecard;
  
  public weeks = [];
  
  public prevWeek;
  
  public message;
  
  public loading = false;

  public listOfTimeCards = false;

  /**
   * The value of selected type filter
   * var number
   */
  public typeOption = null;

  /**
   * Temporary timecard used when doing filters
   * var array
   */
  protected temp = [];

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "Timecards",
      path: ''
    }
  ];

  protected authService;

  constructor(private employeeService: EmployeeService,
              private timeCardService: TimeCardService,
              private events: GlobalEventsService,
              private dateService: DateService,
              private numService: NumberService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.authService = authenticationService;
  }

  ngOnInit() {

    this.events.events$.filter(event => event.name === 'timecards:employees').subscribe(event => {
      this.timecards = [];
      this.weeks = [];
      this.listOfTimeCards = false;
      this.loadData();   
    });

    this.loadData();
  }

  protected loadData() {
    this.message = false;
    this.listOfTimeCards = true;

    this.listWeeks();
  }

  protected listWeeks() {
    this.timeCardService
      .weeks()
      .subscribe(
      (res) => {
        for (var week in res.data) {
          this.weeks.push({ id: week, name: res.data[week] });
        }

        this.prevWeek = this.weeks[this.weeks.length - 1].name;
        this.getTimeCardsByWeek(this.prevWeek);
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public gotoTimecardItems(id : string) : void {
    if(id) {
      this.router.navigate(['/employee-timecard-items', id]);
    }
  }

  public listTimeCards(weekRange) {
    this.timeCardService
    .listTimeCards(weekRange)
    .subscribe(
      (res) => {
          this.timecards = res.data;
          this.temp = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getTimeCardsByWeek(week) {
     let queryString = this.dateService.getQueryString(week);
     this.listTimeCards(queryString);
  } 

  public timeCardStatus(timecard) {
    let className = 'active';

    switch(timecard.status) {
      case 'Not Submitted':
        className = 'danger'
        break;

      case 'Fully Paid':
        className = 'success';
        break;
    }

    return className;
  }

  /**
   * Format number
   *
   * @param number 
   */
  public formatNumber(n) {
    return this.numService.checkNumber(n);
  }

  /**
   * Check if user can create
   *
   * @param number 
   */
  public canCreate() {
    return (this.authenticationService.isCrew() || this.authenticationService.isSuper());
  }

  public filterTimecards(event) {
    const val = event.target.value.toLowerCase();
    this.typeOption = val;

    let temp: any[];
    temp = this.temp;

    temp = temp.filter(function(d) {
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });

     this.timecards = temp;
  }

  public searcTimecard(queryString) {
    const val = queryString.toLowerCase();
    const type = this.typeOption;
    let temp: any[];

    if (this.typeOption) {
      temp = this.temp.filter(function(d) {
        return (<number>d.type_id) == type;
      });
    } else {
      temp = this.temp;
    }

    temp = temp.filter(function(d) {
      return d.contact.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

     this.timecards = temp;
  }
}
