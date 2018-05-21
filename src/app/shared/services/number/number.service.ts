import { Injectable } from '@angular/core';

@Injectable()
export class NumberService {

	public checkNumber(n) {
	   let result = (n - Math.floor(n)) !== 0; 
	   
	  if (result)
	    return n;
	   else
	    return parseInt(n);
   }

}