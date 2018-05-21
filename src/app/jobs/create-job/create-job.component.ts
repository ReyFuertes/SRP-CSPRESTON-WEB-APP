import { IContactRole } from './../../models/contact.model';
import { CustomerTypeEnum } from './../../models/customer-information.enum';
import { IDropdownSimpleListItem } from './../../models/dropdown-list-items.model';
import { Job } from './../../models/job.model';
import { Employee, IEmployeeRole } from './../../models/employees.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { UserRole } from '../../shared/interfaces/Types';
import { ContactService } from '../../contacts/contact.service';
import { CategoryService } from '../../categories/category.service';
import { JobService } from '../job.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { States } from '../../shared/data/AmericanStatesList';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html'
})
export class CreateJobComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "Create Job",
      path: ''
    }
  ];

  public job: Job;
  public currentStep = 1;
  public contactTypes: IDropdownSimpleListItem[] = [];
  public employeeRoles: IDropdownSimpleListItem[] = [];
  public modalRef;
  public employeeRole = 1;
  public contactRoles = [];
  public contactRole = 1;

  @ViewChild('addJobCustomerModal') addJobCustomerModal;
  @ViewChild('addCustomerModal') addCustomerModal: NgbModal;

  constructor(private contactService: ContactService,
    private jobService: JobService,
    private modalService: NgbModal
  ) {
    this.listPaymentTerms();
    this.listEmployeeRoles();
    this.listContactRoles();
  }

  ngOnInit() {
  }

  public listContactRoles(): void {
    this.contactService.listContactRoles().subscribe((res) => {
      for (let i in res.data) {
        this.contactRoles.push({ id: i, name: res.data[i] })
      }
    });
  }

  public listEmployeeRoles(): void {
    this.contactService.listEmployeeRoles().subscribe((res) => {
      res.data.forEach((i: IEmployeeRole) => {
        // this.employeeRoles.push({ id: i.id, name: i.role })
      });
    });
  }

  public paymentTerms = [{ value: '', name: 'Select' }];
  public listPaymentTerms() {
    this.jobService
      .paymentTerms()
      .subscribe(
        (res) => {
          res.data.forEach((term) => {
            this.paymentTerms.push({ name: term.name, value: term.id });
          });
        },
        (err) => {
          console.log(err); //TODO: Create an alert service
        }
      );
  }

  public onClosingModal() {
    this.modalRef.close();
  }

  isActiveStep(step: number): boolean {
    return step === this.currentStep;
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  public onSubmit() {
    // this.message = 'Creating the job. Please wait...';
    // this.contactsSheet
    //   .get('customers')
    //   .value
    //   .forEach((customer) => {
    //     if (customer.id !== undefined) {
    //       this.contactIds.push({
    //         id: customer.id,
    //         role_id: customer.role_id,
    //         role_type: customer.role_type
    //       });
    //     }
    //   });

    // this.contactsSheet.get('employees')
    //   .value
    //   .forEach((employee) => {
    //     if (employee.id !== undefined) {
    //       this.contactIds.push({
    //         id: employee.id,
    //         role_id: employee.role_id,
    //         role_type: employee.role_type
    //       });
    //     }
    //   });

    // this.contactsSheet.get('subcontractors')
    //   .value
    //   .forEach((subcontractor) => {
    //     if (subcontractor.id !== undefined) {
    //       this.contactIds.push({
    //         id: subcontractor.id,
    //         role_id: subcontractor.role_id,
    //         role_type: subcontractor.role_type
    //       });
    //     }
    //   });

    // const data = {
    // };

    // this.jobService.create(data).subscribe((res) => {
    //   setInterval(() => {  }, 3000);

    // },
    //   (err) => {
        
    //   }
    // );
  }

}
