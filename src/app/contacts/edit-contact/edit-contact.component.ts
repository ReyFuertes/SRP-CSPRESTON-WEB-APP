import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../../models/contact.model';
import { FormType } from '../../shared/data/FormType';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

    public breadcrumbs = [
        {
            text: 'Dashboard',
            path: 'dashboard'
        }, {
            text: 'Contacts',
            path: '/contacts'
        }, {
            text: 'Edit',
            path: ''
        }
    ];

    public contact: Contact;
    public formType = FormType.Edit;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contactService: ContactService,
        private notificationService: NotificationsService
    ) { }

    ngOnInit() {
        this.route.paramMap
            .subscribe(params => {
                const contactId = +params.get('id');
                this.contact = new Contact();

                this.contactService.show(contactId)
                    .subscribe(res => {
                        this.contact.parseDataIn(res.data);
                    });
            });
    }

    public back() {
        this.router.navigate(['/contacts']);
    }

    public newMessage($event) {
        this.notificationService.success($event.message);

        setTimeout(() => {
            this.back();
        }, 3000);
    }
}
