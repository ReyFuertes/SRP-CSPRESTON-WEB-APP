import { EmployeeRoles } from '../shared/data/employeeRoles';


export interface IEmployeeRole {
    deleted_at: string;
    description: string;
    id: number;
    role: any;
}

export interface Employee {
    id: number;
    name: string;
    phones: string;
    emails: string;
}

export const AccessLevels = [
    {
        key: 'NO_ACCESS',
        value: 'No Access'
    },
    {
        key: 'EMPLOYEE',
        value: 'Employee'
    },
    {
        key: 'EMPLOYEE_OFFICE',
        value: 'Employee - Office'
    },
    {
        key: 'MANAGER',
        value: 'Manager'
    },
    {
        key: 'ADMIN',
        value: 'Admin'
    }
];

export class EmployeeModel {

    public id: number;
    public access_level: string;
    public addresses = [];
    public billable_normal_rate: number;
    public billable_overtime_rate: number;
    public email: string;
    public emails = [];
    public emergency_rate = 100;
    public first_name: string;
    public is_active = true;
    public last_name: string;
    public name: string;
    public normal_rate: number;
    public notes: string;
    public office: string;
    public overtime_rate: number;
    public per_diem_rate = 45;
    public phones = [];
    public role: number;
    public role_name: string;
    public timezone: string;
    public roles = [];

    get roleName() {
        if (this.role_name === null) {
            this.role_name = '';
        }

        for (const role of EmployeeRoles) {
            if (role.id === this.role) {
                return role.name;
            }
        }

        return this.ucwords(this.role_name.replace('ROLE_', ''));
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

    public parseIn(employee: any) {
        this.id = employee.id;
        this.access_level = employee.access_level;
        this.addresses = employee.addresses;
        this.billable_normal_rate = employee.billable_normal_rate;
        this.billable_overtime_rate = employee.billable_overtime_rate;
        this.email = employee.email;
        this.emails = employee.emails;
        this.emergency_rate = employee.emergency_rate;
        this.first_name = employee.first_name;
        this.is_active = (employee.is_active === 1) ? true : false;
        this.last_name = employee.last_name;
        this.name = employee.name;
        this.normal_rate = employee.normal_rate;
        this.notes = employee.notes;
        this.office = employee.office;
        this.overtime_rate = employee.overtime_rate;
        this.per_diem_rate = employee.per_diem_rate;
        this.phones = employee.phones;
        this.role = employee.role;
        this.role_name = employee.role_name;
        this.timezone = employee.timezone;
    }
}
