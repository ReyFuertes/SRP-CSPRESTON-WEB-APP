import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { FormType } from './../../shared/data/FormType';

@Component({
    selector: 'app-create-contact',
    templateUrl: './create-contact.component.html',
    styleUrls: ['./create-contact.component.scss'],
})
export class CreateContactComponent {

    public breadcrumbs = [
    {
        text: 'Dashboard',
        path: 'dashboard'
    }, {
        text: 'Contacts',
        path: 'contacts'
    }, {
        text: 'Create New',
        path: ''
    }
    ];

    public formType = FormType.New;

    public contact: Contact = new Contact();

}
