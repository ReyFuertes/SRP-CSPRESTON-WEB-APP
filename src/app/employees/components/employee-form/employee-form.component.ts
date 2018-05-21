import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Offices } from '../../../shared/data/offices';
import { FormType } from '../../../shared/data/FormType';
import { Timezones } from '../../../shared/data/timezones';
import { EmployeeRoles } from '../../../shared/data/employeeRoles';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationsService } from '../../../notifications/notifications.service';
import { EmployeeModel as Employee, AccessLevels } from '../../../models/employees.model';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
    selector: 'employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

    @Input()
    public formType = FormType.New;

    @Input()
    public breadcrumbs: any = [];

    @Input()
    public employee = new Employee();

    @Output()
    public onSaved = new EventEmitter();

    @Output()
    public onDelete = new EventEmitter();

    @ViewChild('deleteEmployeeModal')
    public deleteEmployeeModal;

    public formTitle = 'Employee';
    public employeeRoles = EmployeeRoles;
    public accessLevels = AccessLevels;
    public offices = Offices;
    public timezones = [];
    public basicInfoFormGroup: FormGroup;
    public ratesFormGroup: FormGroup;
    public formSubmitted = false;
    public modalRef;
    public loading = false;

    constructor(
        private notificationService: NotificationsService,
        private router: Router,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.basicInfoFormGroupInit();
        this.ratesFormGroupInit();

        this.waitForEmployeeToLoad();
    }

    protected waitForEmployeeToLoad(): void {
        if (this.employee.timezone === undefined) {
            setTimeout(() => {
                this.waitForEmployeeToLoad();
            }, 1000);

            return;
        }

        this.fillTimezones();
    }

    protected basicInfoFormGroupInit(): void {
        this.basicInfoFormGroup = new FormGroup({
            'timezone': new FormControl(this.employee.timezone, [Validators.required]),
            'firstName': new FormControl(this.employee.first_name, [Validators.required]),
            'lastName': new FormControl(this.employee.last_name, [Validators.required]),
            'loginId': new FormControl(this.employee.email, [Validators.required]),
            'office': new FormControl(this.employee.office, [Validators.required]),
            'accessLevel': new FormControl(this.employee.access_level, [Validators.required]),
            'role': new FormControl(this.employee.access_level, []),
            'notes': new FormControl(this.employee.access_level, [])
        });
    }

    protected ratesFormGroupInit(): void {
        this.ratesFormGroup = new FormGroup({
            'normalRate': new FormControl(this.employee.normal_rate, []),
            'overtimeRate': new FormControl(this.employee.overtime_rate, []),
            'billableNormalRate': new FormControl(this.employee.billable_normal_rate, []),
            'billableOvertimeRate': new FormControl(this.employee.billable_overtime_rate, []),
            'emergencyRate': new FormControl(this.employee.emergency_rate, []),
            'perDiemRate': new FormControl(this.employee.per_diem_rate, [])
        });
    }

    protected fillTimezones(): void {
        this.timezones = [];

        for (const timezone of Timezones) {
            this.timezones.push({
                id: timezone.key,
                text: timezone.value
            });
        }

        this.timezones = this.timezones.slice(0, this.timezones.length);
    }

    public numberOnly(event: any): boolean {
        const pattern = /[0-9\-\.\ ]/;

        const inputChar = String.fromCharCode(event.charCode);

        if (event.keyCode !== 8 && !pattern.test(inputChar)) {
            return false;
        }

        return true;
    }

    protected createEmployee(): void {
        this.formatRates(true);

        this.onSaved.emit({
            action: 'create',
            data: {
                employee: this.employee
            }
        });

        this.formatRates(false);
    }

    protected updateEmployee(): void {
        this.formatRates(true);

        this.onSaved.emit({
            action: 'edit',
            data: {
                employee: this.employee
            }
        });

        this.formatRates(false);
    }

    public save(): void {
        this.formSubmitted = true;

        if (this.hasValidData()) {
            this.employee.roles = [this.employee.role];

            if (this.formType === 'Create New') {
                this.createEmployee();
            } else {
                this.updateEmployee();
            }
        }
    }

    protected formatRates(toCents?: boolean): void {
        if (toCents === undefined) {
            toCents = false;
        }

        if (toCents) {
            this.employee.normal_rate = this.employee.normal_rate * 100;
            this.employee.overtime_rate = this.employee.overtime_rate * 100;
            this.employee.billable_normal_rate = this.employee.billable_normal_rate * 100;
            this.employee.billable_overtime_rate = this.employee.billable_overtime_rate * 100;
            this.employee.emergency_rate = this.employee.emergency_rate * 100;
            this.employee.per_diem_rate = this.employee.per_diem_rate * 100;
        } else {
            this.employee.normal_rate = this.employee.normal_rate / 100;
            this.employee.overtime_rate = this.employee.overtime_rate / 100;
            this.employee.billable_normal_rate = this.employee.billable_normal_rate / 100;
            this.employee.billable_overtime_rate = this.employee.billable_overtime_rate / 100;
            this.employee.emergency_rate = this.employee.emergency_rate / 100;
            this.employee.per_diem_rate = this.employee.per_diem_rate / 100;
        }
    }

    public resetForm(): void {
        this.basicInfoFormGroup.reset();
        this.ratesFormGroup.reset();
        this.employee.phones = [];
        this.employee.emails = [];
        this.employee.addresses = [];
        this.formSubmitted = false;
    }

    public back(): void {
        this.router.navigate(['/employees']);
    }

    protected hasValidData(): boolean {
        if (this.basicInfoFormGroup.invalid) {
            this.notificationService.error('Please fillup required fields.');

            return false;
        }

        return this.basicInfoFormGroup.valid;
    }

    public onDeleteEmployee(): void {
        this.modalRef = this.modalService.open(this.deleteEmployeeModal);
    }

    public deleteEmployee(): void {
        this.onDelete.emit({
            action: 'delete',
            data: {
                employee: this.employee
            }
        });

        this.modalRef.close();
    }

}
