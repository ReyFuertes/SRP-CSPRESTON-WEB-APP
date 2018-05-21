import { State } from './states.model';

export interface Subcontractors {
  id: number;
  name: string;
  phones: string;
  emails: string;
}

export interface CustomerInfoType {
  contact_id: number;
  contact_type: string,
  office: string
}

export interface CustomerPhone {
  type: string;
  number?: string;
}

export interface EmailJobOption {
  type: string;
  email: string;
}

export interface PhoneJobOption {
  type: string;
  number: string;
}