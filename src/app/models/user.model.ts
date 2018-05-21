import { Contact } from './contact.model';
import { Component } from '@angular/core';

export interface User {
  id: number;
  email: string;
  is_employee: string;
  normal_rate: number;
  is_active: string;
  role_name: string;
  roles: any[];
  contact?: Contact,
  access_level: string,
}
