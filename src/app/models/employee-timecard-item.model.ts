import { Contact } from './contact.model';
import { Component } from '@angular/core';
import { User } from './user.model';

export interface ITimecard {
  id: number;
}

export interface EmployeeTimecard extends ITimecard {
    contact?: Contact;
    created_at: string;
    double_time_cost: string;
    double_time_hours: string;
    end_date: string;
    id: number;
    items: any[];
    on_call_this_week: boolean;
    over_time_cost: string;
    over_time_hours: string;
    regular_hours: string;
    start_date: string;
    status: string;
    total_cost: string;
    total_hours: string;
    user?: User;
    week_range: string;
    week_range_alt: string;
}
