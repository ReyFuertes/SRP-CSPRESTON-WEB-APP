import { Component } from '@angular/core';

export class TimecardRecord {
  id: number;
  user_id: number;
  log_type: string;
  job_id: number;
  record: object;
  type: string;
  status: number;
  line_item_id: number;
  location: string;
  time_zone: string;
  lng: number;
  lat: number;
  is_emergency_pay: boolean;
  is_per_diem: boolean;
}
