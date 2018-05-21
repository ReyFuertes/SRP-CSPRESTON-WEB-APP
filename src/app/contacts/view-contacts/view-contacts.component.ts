import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormType } from './../../shared/data/FormType';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-view-contacts',
    templateUrl: './view-contacts.component.html',
    providers: [
        ContactService
    ]
})
export class ViewContactsComponent implements OnInit {

    public breadcrumbs = [
        {
            text: 'Dashboard',
            path: 'dashboard'
        }, {
            text: 'Contacts',
            path: ''
        }
    ];

    public formType = FormType.Edit;
    public contacts = [];
    public contact;
    public modalRef;
    public loading = false;
    public page = 1;
    public limit = 25;
    public totalContacts = 0;
    public contactRoles = [];
    public message = '';
    public cols = [];

    /**
     * The value of selected type filter
     * var number
     */
    public typeOption = 0;

    /**
     * Temporary contacts used when doing filters
     * var array
     */
    protected temp = [];

    constructor(
        private contactService: ContactService,
        private modalService: NgbModal,
        private router: Router
    ) { }

    public ngOnInit() {
        this.listContacts({ page: 0 });
        this.populateContactRoles();

        this.cols = [
            { field: 'name', header: 'Name', sort: true },
            { field: 'type', header: 'Type', width: '150px', sort: true },
            { field: 'company', header: 'Company', sort: true },
            { field: 'email', header: 'Email', width: '150px', sort: false },
            { field: 'phone', header: 'Phone', width: '150px', sort: false },
            { field: '', header: 'Action', width: '90px', sort: false }
        ];
    }

    protected populateContactRoles() {
        this.contactService
            .listContactRoles()
            .subscribe(
                (res) => {
                    this.contactRoles = [];

                    for (let key in res.data) {
                        this.contactRoles.push({
                            id: res.data[key].id,
                            name: res.data[key].role
                        });
                    }

                }
            );
    }

    public contactTypeLabel(typeId: number) {
        for (const type of this.contactRoles) {
            if (type.id == typeId) {
                return type.name;
            }
        }

        return '';
    }

    public listContacts(pageInfo) {
        this.page = pageInfo.page + 1;

        this.contactService
            .list('?limit=' + this.limit + '&page=' + this.page)
            .subscribe(
                (res) => {
                    this.contacts = res.data;
                    this.temp = this.contacts;
                    this.totalContacts = res.meta.pagination.total;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public onEditContact(contact: any) {
        this.router.navigate(['/contacts/edit/' + contact.id]);
    }

    /**
     * Update contacts table display when type filter is changed
     */
    public onTypeChanged() {
        const type: number = this.typeOption;

        let temp = this.temp;

        if (this.typeOption > 0) {
        temp = this.temp.filter(function(d) {
            return (<number>d.type_id) == type;
        });
        }

        this.contacts = temp;
    }

    /**
     * Update contacts table display based on search keywords
     *
     * @param event
     */
    public searchContacts(event) {
        const val = event.target.value.toLowerCase();
        const type = this.typeOption;
        let temp: any[];

        if (this.typeOption > 0) {
            temp = this.temp.filter(function(d) {
                return (<number>d.type_id) == type;
            });
        } else {
            temp = this.temp;
        }

        temp = temp.filter(function(d) {
            let itemValue = d.company + ' ' + d.first_name + ' ' + d.last_name + ' ' + d.display_name + ' ' + d.title;
            itemValue = itemValue.toLowerCase();

            return itemValue.indexOf(val) !== -1 || !val;
        });

        this.contacts = temp;
    }

    public onAddContact() {
        this.router.navigate(['/contacts/create']);
    }
}
