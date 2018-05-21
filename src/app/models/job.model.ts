import { Contact } from "../models/contact.model";
import { ContactsInfoModalComponent } from "../modals/job/contacts-info-modal/contacts-info-modal.component";

export class Job {
  id?: number;
  name: string;
  customer_type: string;
  customer_id: number;
  job_number: string;
  job_type_id: number;
  work_type_id: number;
  property_type_id: number;
  damage_type_id: number;
  referral_type_id: number;
  payment_term_id: number;
  status_id: number
  office: string;
  address: string;
  city: string;
  state: string;
  zip: string;

  email?: string;
  phone: string;
  fax: string;
  year_built: number;
  claim_number: string;
  approx_estimate: string;
  probability: string;

  customer_address: string;
  customer_city: string;
  customer_state: string;
  customer_zip: string;
  customer_phone: string;
  customer_email: string;
  customer_fax: string;

  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  billing_phone: string;
  billing_email: string;
  billing_fax: string;
  same_customer_info: number;
  same_bill_info: number;
  whiteboard_notes: string;
  jobContacts: any[];
  customer?: Contact;
}

export class JobContact {
  id?: number;
  contact_id: number;
  role_id: number;
  role_type: string;
  role_value: string;
  name: string;
  emails: any[];
  phones: any[];
  category: string;
  contacts?: any[];
}
