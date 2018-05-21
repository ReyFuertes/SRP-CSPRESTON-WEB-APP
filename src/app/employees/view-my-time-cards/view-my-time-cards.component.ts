import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { TimeCardService } from '../timecard.service';

@Component({
  selector: 'app-view-my-time-cards',
  templateUrl: './view-my-time-cards.component.html',
  styleUrls: ['./view-my-time-cards.component.scss'],
  providers: [
  	EmployeeService,
  	TimeCardService
  ]

})

export class ViewMyTimeCardsComponent implements OnInit {

	public timecards = false;
	public weeks = [];
	public Object = Object;

  constructor(private employeeService: EmployeeService,
  						private timeCardService: TimeCardService,
  					  private fb: FormBuilder,) {
   	
   	this.listWeeks();
   	this.listTimeCards();
  }

	ngOnInit() {
	}

  public listWeeks() {
    this.timeCardService
      .weeks()
      .subscribe(
      (res) => {
        for (var week in res.data) {
          this.weeks.push({ id: week, name: res.data[week] });
        }
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public listTimeCards() {
    let user = JSON.parse(localStorage.getItem('user'));
    
		this
		.timeCardService
		.listMyTimeCardsByStatus({ user_id: user.id })
		.subscribe(
      (res) => {
       	this.timecards = res.data;
      },
      (err) => {
        console.log(err);
      }
      );
	}
}
