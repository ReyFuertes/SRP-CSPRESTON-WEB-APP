import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormType } from '../../shared/data/FormType';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeModel as Employee } from '../../models/employees.model';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
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
            text: 'Edit',
            path: ''
        }
    ];

    public loading = false;
    public employee = new Employee();
    public formType = FormType.Edit;

    constructor(
        private employeeService: EmployeeService,
        private notificationService: NotificationsService,
        private router: Router,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.route.paramMap
            .subscribe(params => {
                const employeeId = +params.get('id');
                this.employee = new Employee();

                this.employeeService.getEmployee(employeeId)
                    .subscribe(res => {
                        this.employee.parseIn(res.data);
                    });
            });

        window.scrollTo(0, 0);
    }

    public afterSaved(event) {
        this.loading = true;

        this.employeeService
            .updateEmployee(event.data.employee)
            .subscribe(
                (res) => {
                    this.loading = false;
                    this.notificationService.success('Employee successfully updated.');

                    setTimeout(() => {
                        this.router.navigate(['/employees']);
                    }, 3000);
                }
            );
    }

    public deleteEmployee(event) {
        this.loading = true;

        this.employeeService
            .delete(event.data.employee.id)
            .subscribe(
                (res) => {
                    this.loading = false;
                    this.notificationService.success('Employee successfully deleted.');

                    setTimeout(() => {
                        this.router.navigate(['/employees']);
                    }, 3000);

                }
            );
    }
}
