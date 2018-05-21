import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeModel } from '../models/employees.model';

@Injectable()
export class EmployeeService {

    constructor(
        private http: HttpClient,
    ) {}

    public create(params) {

        const formData: FormData = new FormData();

        if (params.files.length > 0) {
            for (let i = 0; i <= params.files.length; i++) {
                const file: File = params.files[i];
                if (file !== undefined) {
                    formData.append('files[]', file);
                }
            }
        }

        if (params.emails.length > 0) {
        params.emails.forEach((email, index) => {
            if (email !== undefined) {
                formData.append('phones['+ index +'][type]', email.type);
                formData.append('phones['+ index +'][email]', email.email);
            }
        });
        }

        if (params.phones.length > 0) {
        params.phones.forEach((phone, index) => {
            if (phone !== undefined) {
                formData.append('phones['+ index +'][type]', phone.type);
                formData.append('phones['+ index +'][number]', phone.number);
            }
        });
        }

        formData.append('active', params.active);
        formData.append('address', params.address);
        formData.append('company', params.company);
        formData.append('first_name', params.first_name);
        formData.append('last_name', params.last_name);
        formData.append('is_employee', params.is_employee);
        formData.append('name', params.name);
        formData.append('office', params.office);
        formData.append('notes', params.notes);
        formData.append('role', params.role);
        formData.append('title', params.title);

        return this.http
            .post(`${environment.baseUrl}/api/contact`, formData)
            .map((res) => res)
            .catch((err) =>  {
                return Observable.throw(err.json());
            });
    }

    public createEmployee(employee: EmployeeModel) {
        return this.http
            .post(`${environment.baseUrl}/api/employees`, employee)
            .map((res) => res)
            .catch((err) => {
                return Observable.throw(err.json());
            });
    }

    public getEmployee(id: number) {
        return this.http
            .get(`${environment.baseUrl}/api/employees/` + id)
            .map((res) => res)
            .catch((err) => {
                return Observable.throw(err.json());
            });
    }

    public list(filters?: string) {

        if (filters === undefined) {
            filters = '';
        }

        return this.http
            .get(`${environment.baseUrl}/api/employees` + filters)
            .map((res) => res)
            .catch((err) =>  {
                return Observable.throw(err.json());
            });
    }

    public update(employee: any, id: number) {
        return this.http
            .put(`${environment.baseUrl}/api/contact/` + id, employee)
            .map((res) => res)
            .catch((err) =>  {
                return Observable.throw(err.json());
            });
    }

    public updateEmployee(employee: EmployeeModel) {
        return this.http
            .patch(`${environment.baseUrl}/api/employees/` + employee.id, employee)
            .map((res) => res)
            .catch((err) => {
                return Observable.throw(err.json());
            });
    }

    public delete(id: number) {
        return this.http
            .delete(`${environment.baseUrl}/api/employees/` + id)
            .map((res) => res)
            .catch((err) =>  {
                return Observable.throw(err.json());
            });
    }

    public getContactTypes() {
        return this.http
            .get(`${environment.baseUrl}/api/contacts/types`)
            .map((res) => res)
            .catch((err) =>  {
                return Observable.throw(err.json());
            });
    }

    public getRateTypes() {

        return this.http
            .get(`${environment.baseUrl}/api/time-cards/rate-types`)
            .map((res) => res)
            .catch((err) =>  {
                return Observable.throw(err.json());
            });
    }
}

