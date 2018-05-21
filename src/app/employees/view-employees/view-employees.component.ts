import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { EmployeeRoles } from '../../shared/data/employeeRoles';
import { EmployeeModel as Employee } from '../../models/employees.model';

@Component({
    selector: 'app-view-employees',
    templateUrl: './view-employees.component.html',
    providers: [
        EmployeeService
    ]
})
export class ViewEmployeesComponent implements OnInit {
    public breadcrumbs = [
        {
            text: 'Dashboard',
            path: 'dashboard'
        },
        {
            text: 'Employees',
            path: ''
        }
    ];

    public employees: Employee[] = [];
    public page;
    public limit = 25;
    public totalEmployees = 0;
    public cols = [];
    public temp: Employee[] = [];
    public employeeRoles = EmployeeRoles;
    public typeOption = 0;

    constructor(
        private employeeService: EmployeeService,
        private router: Router
    ) { }

    ngOnInit() {
        this.listEmployees({ page: 0 });

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'access_level', header: 'Access Level', width: '150px' },
            { field: 'office', header: 'Office', width: '150px' },
            { field: 'phone', header: 'Phone', width: '150px' },
            { field: '', header: 'Action', width: '90px' },
        ];
    }

    public listEmployees(pageInfo) {
        this.page = pageInfo.page + 1;
        this.employees = [];

        this.employeeService
            .list('?limit=' + this.limit + '&page=' + this.page)
            .subscribe(
                (res) => {
                    res.data.forEach(element => {
                        const emp = new Employee();
                        emp.parseIn(element);
                        this.employees.push(emp);
                    });

                    this.temp = this.employees;
                    this.totalEmployees = res.meta.pagination.total;
                    this.onTypeChanged();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public onAddEmployee() {
        this.router.navigate(['/employees/create']);
    }

    public onEditEmployee(employee: Employee) {
        this.router.navigate(['/employees/edit', employee.id]);
    }

    public onTypeChanged() {
        const type: number = this.typeOption;

        let temp = this.temp;

        if (this.typeOption > 0) {
            temp = this.temp.filter(function (d) {
                return (<number>d.role) == type;
            });
        }

        this.employees = temp;
    }

    public searchEmployees(event) {
        const val = event.target.value.toLowerCase();
        const type = this.typeOption;
        let temp;

        if (this.typeOption > 0) {
            temp = this.temp.filter(function (d) {
                return (<number>d.role) == type;
            });
        } else {
            temp = this.temp;
        }

        temp = temp.filter(function (d) {
            let itemValue = d.company + ' ' + d.first_name + ' ' + d.last_name + ' ' + d.display_name + ' ' + d.title;
            itemValue = itemValue.toLowerCase();

            return itemValue.indexOf(val) !== -1 || !val;
        });

        this.employees = temp;
    }
}
