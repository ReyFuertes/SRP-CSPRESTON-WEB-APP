import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: [ './create-employee.component.scss' ],
    providers: [
        EmployeeService
    ]
})
export class CreateEmployeeComponent implements OnInit {
    public breadcrumbs = [
        {
            text: 'Dashboard',
            path: 'dashboard'
        },
        {
            text: 'Employees',
            path: 'dashboard/employees'
        },
        {
            text: 'Create New',
            path: ''
        }
    ];

    public loading = false;

    constructor(
        private employeeService: EmployeeService,
        private notificationService: NotificationsService,
        private router: Router
    ) {

    }

    ngOnInit() {

    }

    public afterSaved(event) {
        this.loading = true;

        this.employeeService
            .createEmployee(event.data.employee)
            .subscribe(
                (res) => {
                    this.loading = false;
                    this.notificationService.success('Employee successfully created.');

                    setTimeout(() => {
                        this.router.navigate(['/employees']);
                    }, 3000);
                }
            );
    }
}
