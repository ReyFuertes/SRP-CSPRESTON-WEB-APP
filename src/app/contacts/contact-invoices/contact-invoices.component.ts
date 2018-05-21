import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-invoices',
  templateUrl: './contact-invoices.component.html',
  styleUrls: ['./contact-invoices.component.scss']
})
export class ContactInvoicesComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    }, {
      text: "Contact Invoices",
      path: ''
    }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
