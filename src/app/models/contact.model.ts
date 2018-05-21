import { Component } from '@angular/core';

export interface IContactRole {
  id: number;
  role: any;
}

export interface ContactCategory {
  id: number;
  name: string;
  type_id: number;
  contact_type: string;
  user_id: string;
  category: string;
}

export interface IContact {
  id: number;
  name: string;
  company: string;
  title: string;
  type: string;
  address: string;
  state: string;
  zip: string;
  notes: string;
  phone_numbers: any[];
  home: string;
  work: string;
  emails: any[];
}

export class Contact {
  id: number;
  addresses = [];
  auto_expiration: string;
  contact_type = 'PERSON';
  emails = [];
  gl_expiration: string;
  is_active = true;
  is_employee: boolean;
  ma_expiration: string;
  name = '';
  office?: object;
  phones = [];
  pivot?: any[];
  title = '';
  notes = '';
  website = '';
  type_id = 0;
  user_id: number;
  wc_expiration: string;
  payment_term_id: number;
  first_name = '';
  last_name = '';
  company = '';
  autoFillDisplayName = true;

  set companyName(value: string) {
    this.company = value;

    this.autoFillName();
  }

  get companyName() {
    return this.company;
  }

  set firstName(value: string) {
    this.first_name = value;

    this.autoFillName();
  }

  get firstName() {
    return this.first_name;
  }

  set lastName(value: string) {
    this.last_name = value;

    this.autoFillName();
  }

  get lastName() {
    return this.last_name;
  }

  protected autoFillName() {
    if (!this.autoFillDisplayName) {
      return;
    }

    this.name = '';

    if (this.first_name === null) {
      this.first_name = '';
    }

    if (this.last_name === null) {
      this.last_name = '';
    }

    if (this.company === null) {
      this.company = '';
    }

    if (this.contact_type.toLowerCase() === 'person') {

      if (this.first_name !== '' && this.last_name !== '') {
        this.name = this.first_name + ' ' + this.last_name;
      }

      if (this.first_name === '' && this.last_name !== '') {
        this.name = this.last_name;
      }

      if (this.first_name !== '' && this.last_name === '') {
        this.name = this.first_name;
      }

    }

    if (this.contact_type.toLowerCase() === 'company') {
      this.name = this.company;
    }

    if (this.name === undefined) {
      this.name = '';
    }

    if (this.name === '') {
      return;
    }

    let slug = this.name.toLowerCase().trim();
    slug = slug.replace(/[^a-z0-9\s-]/g, ' ');
    slug = slug.replace(/[\s-]+/g, ' ');

      this.name = this.ucwords(slug);
  }

  protected ucwords(words: string) {
      let formatted = '';
      const temp = words.split(' ');

      for (let word of temp) {
          word = word.toLowerCase();
          formatted += word.charAt(0).toUpperCase() + word.slice(1) + ' ';
      }

      return formatted;
  }

  public parseDataIn(contact: any) {
    this.autoFillDisplayName = false;
    this.first_name = contact.first_name;
    this.last_name = contact.last_name;
    this.name = contact.name;
    this.is_active = (contact.is_active === 1) ? true : false;
    this.company = contact.company;
    this.title = contact.title;
    this.notes = contact.notes;
    this.website = contact.website;
    this.contact_type = contact.contact_type;
    this.type_id = contact.type_id;
    this.id = contact.id;
    this.phones = contact.phones;
    this.emails = contact.emails;
    this.addresses = contact.addresses;
    this.is_employee = contact.is_employee;
  }

}
