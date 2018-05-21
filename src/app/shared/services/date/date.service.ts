import { Injectable, NgZone } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class DateService {

	public getQueryString(weekRange) {
		let dates = this.parseDates(weekRange);
		return '?start=' + dates[0].toString() + '&end=' + dates[1].toString();	
	}

	public  parseDates(weekRange) {
    	const datePipe = new DatePipe('en-US');
	    let datesArray = weekRange.split(' - ');
	    let startDate = datePipe.transform(new Date(Date.parse(datesArray[0])), 'yyyy-MM-dd');
	    let endDate = datePipe.transform(new Date(Date.parse(datesArray[1])), 'yyyy-MM-dd');

   		return [ startDate, endDate ];
  	}

  	public formatDate(date) {
  		const datePipe = new DatePipe('en-US');
  		return datePipe.transform(date, 'yyyy-MM-dd');
  	}
}