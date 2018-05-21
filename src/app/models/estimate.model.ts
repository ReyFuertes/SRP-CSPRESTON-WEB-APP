export class Estimate {
  id: number;
  job_id: number;
  name: string;
  estimate_amount: number;
  budget_amount: number;
  cost_to_date: number;
  budget_remaining: number;
  forecasted_margin: number;
  running_margin: number;
  actual_cost_total: number;
  pending_cost_total: number;
  status: string;
  date_approved: any;
  type: string;
  approved_by: string;
  estimate_date: any;
  expiration_date: any;
  notes: string;
  items: any = [];

  public parseDataIn(estimate: any) {
  	this.id = estimate.id;
  	this.job_id = estimate.job_id;
  	this.name = estimate.name;
  	this.estimate_amount = estimate.estimate_amount;
  	this.budget_amount = estimate.budget_amount;
  	this.cost_to_date = estimate.cost_to_date;
  	this.budget_remaining = estimate.budget_remaining;
  	this.forecasted_margin = estimate.forecasted_margin;
  	this.running_margin = estimate.running_margin;
  	this.actual_cost_total = estimate.actual_cost_total;
  	this.pending_cost_total = estimate.pending_cost_total;
  	this.status = estimate.status;
  	this.date_approved = estimate.date_approved;
  	this.type = estimate.type;
  	this.approved_by = estimate.approved_by;
  	this.estimate_date = estimate.estimate_date;
  	this.expiration_date = estimate.expiration_date;
  	this.notes = estimate.notes;
  	this.items = estimate.items;
  }	
}
