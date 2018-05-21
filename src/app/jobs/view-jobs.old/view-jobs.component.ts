import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../job.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ContactService } from '../../contacts/contact.service';
import { CategoryService } from '../../categories/category.service';
import { States } from '../../shared/data/AmericanStatesList';
import { SelectOption } from '../../shared/interfaces/Forms';
import { SelectNA, SelectNone, SelectPlease } from '../../shared/data/SelectNone';
import { range, each } from 'underscore';
import * as moment from 'moment';
import { FileUpload } from 'primeng/primeng';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html'
})

export class ViewJobsComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "View Jobs",
      path: ''
    }
  ];

  public addContactError = '';

  public customerInformationSheet: FormGroup;

  public jobs: any[] = [];
  public job;
  public jobDocumentCategories = [];
  public jobName;
  public jobNumber;

  public states = [];
  public state;

  public statuses = [];

  public selectedCustomerType = 'customers';
  public selectedEmployeeRole = 1;
  public selectedContactRole = 1;
  public selectedSubcontractorRole = 1;
  public selectedCustomerId: number;

  public contactTypes = [];
  public contactRoles = [];
  public employeeRoles = [];
  public subcontractorRoles = [];
  public customersByTypeList = [];
  public contactsByTypeList = [];
  public contactsTypeList = [];

  public contactTypeEmployee = 1;
  public contactTypeSubcontractor = 2;
  public contactTypeCustomer = 3;

  public customers = [];
  public customerTypes = [];
  public customerType = 'Person';
  public customerId;
  public jobCustomers = [];

  public employees = [];
  public jobEmployees = [];
  public subcontractors = [];
  public jobSubcontractors = [];
  public message;
  public modalRef;
  public estimates;

  public listOfJobs = false;
  public showDocuments = false;
  public listOfDocuments = false;
  public listOfDetails = false;
  public listFinancials = false;
  public jobTables = false;
  public jobTabs = false;
  public showEstimateForm = false;
  public showTimeCardsList = false;
  public added = null;

  public loading = false;
  public editJobSpace = false;

  public currentStep = 1;

  public customerInfoSameAsJobInfo = false;
  public billingInfoSameAsJobInfo = false;

  public jobInformationSheet: FormGroup;
  public contactsSheet: FormGroup;
  public documentUpload: FormGroup;

  public jobTypes = [];
  public workTypes = [];
  public propertyTypes = [];
  public damageTypes = [];
  public referralTypes = [];

  public yearsBuilt = [];
  public paymentTerms = [];
  public jobProbabilities = [];
  public contactTypeLists = [];
  public employeePrimaryRoles = [];

  public name;
  public office;
  public documentCategoryId = 1;
  public documentCategories = [];
  public jobDocuments = [];
  public uploadUrl = environment.baseUrl + '/api/job-document';
  public uploadSuccess: any;

  public currentDocumentSelected: string;

  @ViewChild('editJobModal')
  public editJobModal: NgbModal;

  @ViewChild('jobDocumentsModal')
  public jobDocumentsModal: NgbModal;

  @ViewChild('jobDisplayModal')
  public jobDisplayModal: NgbModal;

  @ViewChild('addDamageTypeModal') addDamageTypeModal: NgbModal;
  @ViewChild('addJobTypeModal') addJobTypeModal: NgbModal;
  @ViewChild('addPaymentTermsModal') addPaymentTermsModal: NgbModal;
  @ViewChild('addPropertyTypeModal') addPropertyTypeModal: NgbModal;
  @ViewChild('addReferralTypeModal') addReferralTypeModal: NgbModal;
  @ViewChild('addWorkTypeModal') addWorkTypeModal: NgbModal;
  @ViewChild('addJobCustomerModal') addJobCustomerModal: NgbModal;
  @ViewChild('addCustomerModal') addCustomerModal: NgbModal;
  @ViewChild('uploadDocumentModal') uploadDocumentModal: NgbModal;

  public billingAddress;
  public billingCity;
  public billingEmail;
  public billingFax;
  public billingPhone;
  public billingState;
  public billingZip;

  public customerAddress;
  public customerCity;
  public customerEmail;
  public customerFax;
  public customerPhone;
  public customerState;
  public customerZip;

  public contactIds = [];

  constructor(
    private jobService: JobService,
    private modalService: NgbModal,
    private contactService: ContactService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {

    this.listContacts('customers');
    this.listContacts('employees');
    this.listContacts('subcontractors');
    this.listContactTypes();
  }

  public ngOnInit() {
    this.listOfDocuments = false;
    this.message = false;
    this.uploadSuccess = false;
    this.showEstimateForm = false;
    this.states = States;
    this.state = this.states[42].value;

    this.listOfJobs = true;
    this.listJobs();
    this.listStatus();

    this.jobService
      .jobTypes()
      .subscribe(
      (res) => {
        res.data.forEach((jobType) => {
          this.jobTypes.push({ name: jobType.name, value: jobType.id });
        });
      },
      (err) => {
        console.log(err);
      }
      );

    this.jobService
      .workTypes()
      .subscribe(
      (res) => {
        res.data.forEach((workType) => {
          this.workTypes.push({ name: workType.name, value: workType.id });
        });
      },
      (err) => {
        console.log(err);
      }
      );

    this.jobService
      .propertyTypes()
      .subscribe(
      (res) => {
        res.data.forEach((propertyType) => {
          this.propertyTypes.push({ name: propertyType.name, value: propertyType.id });
        });
      },
      (err) => {
        console.log(err);
      }
      );

    this.jobService
      .damageTypes()
      .subscribe(
      (res) => {
        res.data.forEach((damageType) => {
          this.damageTypes.push({ name: damageType.name, value: damageType.id });
        });
      },
      (err) => {
        console.log(err);
      }
      );

    this.jobService
      .referralTypes()
      .subscribe(
      (res) => {
        res.data.forEach((referralType) => {
          this.referralTypes.push({ name: referralType.name, value: referralType.id });
        });
      },
      (err) => {
        console.log(err);
      }
      );

    this.jobService
      .documentCategories()
      .subscribe(
      (res) => {
        this.jobDocumentCategories.push({ name: 'All', value: 0 });
        res.data.forEach((category) => {
          this.jobDocumentCategories.push({ name: category.name, value: category.id });
        });
      },
      (err) => {
        console.log(err);
      }
      );

    this.listCustomerTypes();
    this.listEmployeePrimaryRoles();

    each(<number[]>range(0, 100), (neg: number) => {
      const year = moment().subtract(neg, 'years').format('Y');
      this.yearsBuilt.push({ name: year, value: year });
    });

    each(<number[]>range(1, 11), (num: number) => {
      this.jobProbabilities.push({ name: num.toString(), value: num });
    });
  }

  public addJob(): void {
    this.router.navigate(['/add-job'])
  }

  public onEditJob(ID: number): void {
    this.router.navigate(['/edit-job', ID])
  }

  public listStatus() {
    this
      .categoryService
      .listJobStatus()
      .subscribe((res) => {
        this.statuses = res.data;
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public listContacts(type: string) {
    this.contactService
      .list(type)
      .subscribe(
      (res) => {
        switch (type) {
          case 'customers':
            res.data.forEach((customer) => {
              this.customers.push(this.formatContactData(customer));
            });
            break;
          case 'employees':
            res.data.forEach((employee) => {
              this.employees.push(this.formatContactData(employee));
            });
            break;
          case 'subcontractors':
            res.data.forEach((subcontractor) => {
              this.subcontractors.push(this.formatContactData(subcontractor));
            });
            break;
        }
      },
      (err) => {
        console.log(err);
      }
      );
  }

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
        console.log(err);
      }
      );
  }

  public formatContactData(data) {
    return {
      id: data.id,
      name: data.name,
      emails: data.emails,
      phones: data.phones
    };
  }

  public listJobs() {
    this.loading = true;
    this.jobService
      .listJobs()
      .subscribe(
      (res) => {
        this.jobs = res.data;
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public listCustomerTypes() {
    this.contactService
      .getCustomerTypes()
      .subscribe(
      (res) => {
        this.customerTypes.push({ value: res.Company });
        this.customerTypes.push({ value: res.Person });
      }
      );
  }

  public setOffice(office) {
    this.office = office;
  }

  public onSelectingCustomer(customerId: string) {
    if (+customerId !== this.customerId) {
      this.generateJobNameAndId(customerId, this.customerType, this.office);
    } else {
      this.customerInformationSheet.controls.jobName.patchValue(this.jobName);
      this.customerInformationSheet.controls.jobNumber.patchValue(this.jobNumber);
    }
  }

  public generateJobNameAndId(customerId, customerType = 'Person', office = 'Memphis') {
    this
      .jobService
      .generateJobIdName({
        contact_id: customerId,
        contact_type: customerType,
        office: office
      })
      .subscribe(
      (res) => {
        this.customerInformationSheet.controls.jobName.patchValue(res.data.name);
        this.customerInformationSheet.controls.jobNumber.patchValue(res.data.name);
      },
      (err) => {
        console.log(err)
      }
      );
  }

  public onAddingCustomer() {
    this.modalRef = this.modalService.open(this.addJobCustomerModal);
    this.listEmployeeRoles();
    this.listContactRoles();
    this.listSubcontractorRoles();

    if (this.contactsTypeList.length === 0 && this.contactTypes.length > 0) {
      this.onSelectingContactType(this.contactTypes[0].name);
    }
  }

  public listContactTypes() {

    if (this.contactTypes.length > 0) {
      return;
    }

    this.contactService.getContactTypes().subscribe((res) => {
        this.contactTypes = res.data;
      });
  }

  public listEmployeeRoles() {

    if (this.employeeRoles.length > 0) {
      return;
    }

    this.contactService.listEmployeeRoles().subscribe((res) => {
        this.employeeRoles = res.data;
      });
  }

  public listContactRoles() {

    if (this.contactRoles.length > 0) {
      return;
    }

    this.contactService.listContactRoles().subscribe((res) => {
        this.contactRoles = res.data;
      });
  }

  public listSubcontractorRoles() {

    if (this.subcontractorRoles.length > 0) {
      return;
    }

    this.contactService.list('subcontractors').subscribe((res) => {
          this.subcontractorRoles = res.data;
        });
  }

  public listContactType(type: string) {
    if (typeof this.contactsByTypeList[type] === 'undefined') {
      this.contactsByTypeList[type] = null;
    }

    if (this.contactsByTypeList[type] !== null) {
      this.contactsTypeList = this.contactsByTypeList[type];
    } else {
      this.contactService.list(type).subscribe((res) => {
          this.contactsTypeList = res.data;
          this.contactsByTypeList[type] = res.data;
        });
    }
  }

  public listCustomerByType(type: string) {
    if (typeof this.customersByTypeList[type] === 'undefined') {
      this.customersByTypeList[type] = [];
    }

    if (this.customersByTypeList[type].length > 0) {
      this.contactsTypeList = this.customersByTypeList[type];
    } else {
      this.contactService.listCustomerByType(type).subscribe((res) => {
          res.data.forEach((contact) => {
            this.customersByTypeList[type].push({
              id: contact.id,
              name: contact.name,
              phones: contact.phones,
              emails: contact.emails
            });

            this.contactsTypeList = this.customersByTypeList[type];
          });
        });
    }
  }

  public onSelectingContactType(type: string) {
    var contactType = '';

    switch (type) {
      case 'Customer':
          contactType = 'customers';
        break;
      case 'Employee':
          contactType = 'employees';
        break;
      case 'Subcontractor':
      case 'Sub-Contractor':
          contactType = 'subcontractors';
        break;
    }

    if (contactType) {
      this.selectedCustomerType = contactType;
      this.listContactType(contactType);

      if (contactType == 'subcontractors') {
        // this.listCustomerByType(this.customerType);
      }
    }
  }

  public onSelectingEmployeeRole(roleId: number) {
    this.selectedEmployeeRole = roleId;
  }

  public onSelectingContactRole(roleId: number) {
    this.selectedContactRole = roleId;
  }

  public onSelectingSubcontractorRole(roleId: number) {
    this.selectedSubcontractorRole = roleId;
  }

  public onSelectingContact(customer) {
    this.selectedCustomerId = customer;
  }

  public setCustomerType(type) {
    this.customerType = type;
    this.listCustomerByType(type);
  }

  public editJob(job) {
    this.editJobSpace = true;
    this.job = job;
    this.jobName = job.name;
    this.jobNumber = job.job_number;
    this.office = job.office;
    this.customerId = job.customer.id;

    this.billingAddress = job.billing_address;
    this.billingCity = job.billing_city;
    this.billingEmail = job.billing_email;
    this.billingFax = job.billing_fax;
    this.billingPhone = job.billing_phone;
    this.billingState = job.billing_state;
    this.billingZip = job.billing_zip;
    this.billingInfoSameAsJobInfo = job.same_bill_info;

    this.customerAddress = job.customer_address;
    this.customerCity = job.customer_city;
    this.customerEmail = job.customer_email;
    this.customerFax = job.customer_fax;
    this.customerPhone = job.customer_phone;
    this.customerState = job.customer_state;
    this.customerZip = job.customer_zip;
    this.customerInfoSameAsJobInfo = job.same_customer_info;

    this.jobCustomers = [];
    this.jobEmployees = [];
    this.jobSubcontractors = []

    this.customerInformationSheet = this.fb.group(
      {
        customerType: 'Person',
        customer: [job.customer.name, Validators.compose([Validators.required])],
        jobName: [this.jobName, Validators.compose([Validators.required])],
        jobNumber: [this.jobNumber, Validators.compose([Validators.required])],
        jobAddress: [job.address, Validators.compose([Validators.required])],
        jobCity: [job.city, Validators.compose([Validators.required])],
        jobState: [job.state, Validators.compose([Validators.required])],
        jobZipCode: [job.zip, Validators.compose([Validators.required])],
        jobPhone: [job.phone, Validators.compose([Validators.required])],
        jobFax: [job.fax, Validators.compose([Validators.required])],
        jobEmail: [job.email, Validators.compose([Validators.required])],
        office: [job.office],
        contact: [{ value: null, disabled: true }, Validators.compose([Validators.required])],
        customerAddress: [this.customerAddress, Validators.compose([])],
        customerCity: [this.customerCity, Validators.compose([])],
        customerState: [this.customerState, Validators.compose([])],
        customerZipCode: [this.customerZip, Validators.compose([])],
        customerPhone: [this.customerPhone, Validators.compose([])],
        customerFax: [this.customerFax, Validators.compose([])],
        customerEmail: [this.customerEmail, Validators.compose([])],
        billingAddress: [this.billingAddress, Validators.compose([])],
        billingCity: [this.billingCity, Validators.compose([])],
        billingState: [this.billingState, Validators.compose([])],
        billingZipCode: [this.billingZip, Validators.compose([])],
        billingPhone: [this.billingPhone, Validators.compose([])],
        billingFax: [this.billingFax, Validators.compose([])],
        billingEmail: [this.billingEmail, Validators.compose([])],
        customerInfoSameAsJobInfo: [this.customerInfoSameAsJobInfo, Validators.compose([Validators.required])],
        billingInfoSameAsJobInfo: [this.billingInfoSameAsJobInfo, Validators.compose([Validators.required])]
      });

    this.listPaymentTerms();
    this.jobInformationSheet = this.fb.group(
      {
        jobStatus: [job.status.id, Validators.compose([Validators.required])],
        jobType: [job.type.id, Validators.compose([Validators.required])],
        workType: [job.work_type.id, Validators.compose([Validators.required])],
        propertyType: [job.property_type.id, Validators.compose([Validators.required])],
        damageType: [job.damage_type.id, Validators.compose([Validators.required])],
        referralType: [job.referral_type.id, Validators.compose([Validators.required])],
        yearBuilt: [job.year_built, Validators.compose([Validators.required])],
        paymentTerm: [job.payment_term.id, Validators.compose([Validators.required])],
        claimNumber: [job.claim_number, Validators.compose([])],
        approxEstimate: [job.approx_estimate, Validators.compose([])],
        jobProbability: [job.probability, Validators.compose([Validators.required])]
      });

    this.filterContacts(job.contacts);
    const employeeArray = [];
    this.jobEmployees.forEach((employee) => {
      employeeArray.push(this.initContacts(employee));
    });

    const customerArray = [];
    this.jobCustomers.forEach((customer) => {
      customerArray.push(this.initContacts(customer));
    });

    const subconArray = [];
    this.jobSubcontractors.forEach((subcontractor) => {
      subconArray.push(this.initContacts(subcontractor));
    });

    this.contactsSheet = this.fb.group(
      {
        customers: this.fb.array(customerArray),
        employees: this.fb.array(employeeArray),
        subcontractors: this.fb.array(subconArray)
      });

      window.scrollTo(0, 0);
  }

  public filterContacts(contacts) {
    contacts.forEach((contact) => {
      if (contact.type_id === this.contactTypeCustomer) {
        this.jobCustomers.push({
          id: contact.id,
          name: contact.name,
          emails: contact.emails,
          phones: contact.phones,
          title: contact.pivot.title,
          role_id: contact.pivot.role_id,
          role_type: contact.pivot.role_type,
        });
      } else if (contact.type_id === this.contactTypeEmployee) {
        this.jobEmployees.push({
          id: contact.id,
          name: contact.name,
          emails: contact.emails,
          phones: contact.phones,
          title: contact.pivot.title,
          role_id: contact.pivot.role_id,
          role_type: contact.pivot.role_type,
        });
      } else if (contact.type_id === this.contactTypeSubcontractor) {
        this.jobSubcontractors.push({
          id: contact.id,
          name: contact.name,
          emails: contact.emails,
          phones: contact.phones,
          title: contact.pivot.title,
          role_id: contact.pivot.role_id,
          role_type: contact.pivot.role_type,
        });
      }
    });
  }

  public listEmployeePrimaryRoles() {
    this.contactService
      .listEmployeePrimaryRoles()
      .subscribe(
      (res) => {
        this.employeePrimaryRoles = res.data
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public updateJob(form: NgForm) {
    this.message = 'Updating job ...';
    this.jobService
      .update(form.value, this.job.id)
      .subscribe(
      (res) => {
        this.listJobs();
        this.message = 'Job updated!';
        setInterval(() => {
          this.message = false;
        }, 4000)
        //         console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public delete() {
    if (confirm('Delete this job?')) {
      this.message = 'Deleting job ...';
      this.jobService
        .delete(this.job.id)
        .subscribe(
        (res) => {
          this.listJobs();
          setInterval(() => { this.modalRef.close(); }, 2000);
        },
        (err) => {
        }
        );
    }
  }

  public getJobs() {
    this.listOfJobs = true;
    this.showTimeCardsList = false;
    this.listOfDocuments = false;
    this.listOfDetails = false;
    this.listFinancials = false;
    this.editJobSpace = false;

    return false;
  }
  public getDocuments(job) {
    this.job = job;
    this.listOfJobs = false;
    this.listOfDetails = false;
    this.listFinancials = false;
    this.listOfDocuments = true;
  }

  public getJobDisplay(job) {
    this.job = job;
    this.showTimeCardsList = false;
    this.listOfJobs = false;
    this.listOfDocuments = false;
    this.listOfDetails = true;
    this.listFinancials = false;
    this.showEstimateForm = false;
  }

  public getFinancials(id: string) : void {
    if(id) {
      this.router.navigate(['/financials', id]);
    }
  }

  isActiveStep(step: number): boolean {
    return step === this.currentStep;
  }

  goToStep(step: number): void {
    switch (step) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
    this.currentStep = step;
  }

  public addOrRemoveCustomerInfo(add): void {
    const CIS = this.customerInformationSheet;
    if (add) {
      CIS.get('customerAddress').setValidators(Validators.compose([]));
      CIS.get('customerCity').setValidators(Validators.compose([]));
      CIS.get('customerState').setValidators(Validators.compose([]));
      CIS.get('customerZipCode').setValidators(Validators.compose([]));
      CIS.get('customerPhone').setValidators(Validators.compose([]));
      CIS.get('customerFax').setValidators(Validators.compose([]));
      CIS.get('customerEmail').setValidators(Validators.compose([]));
    } else {
      CIS.get('customerAddress').setValidators(Validators.compose([]));
      CIS.get('customerCity').setValidators(Validators.compose([]));
      CIS.get('customerState').setValidators(Validators.compose([]));
      CIS.get('customerZipCode').setValidators(Validators.compose([]));
      CIS.get('customerPhone').setValidators(Validators.compose([]));
      CIS.get('customerFax').setValidators(Validators.compose([]));
      CIS.get('customerEmail').setValidators(Validators.compose([]));
    }
  }

  public addOrRemoveBillingInfo(add): void {
    const CIS = this.customerInformationSheet;
    if (add) {
      CIS.get('billingAddress').setValidators(Validators.compose([]));
      CIS.get('billingCity').setValidators(Validators.compose([]));
      CIS.get('billingState').setValidators(Validators.compose([]));
      CIS.get('billingZipCode').setValidators(Validators.compose([]));
      CIS.get('billingPhone').setValidators(Validators.compose([]));
      CIS.get('billingFax').setValidators(Validators.compose([]));
      CIS.get('billingEmail').setValidators(Validators.compose([]));
    } else {
      CIS.get('billingAddress').setValidators(Validators.compose([]));
      CIS.get('billingCity').setValidators(Validators.compose([]));
      CIS.get('billingState').setValidators(Validators.compose([]));
      CIS.get('billingZipCode').setValidators(Validators.compose([]));
      CIS.get('billingPhone').setValidators(Validators.compose([]));
      CIS.get('billingFax').setValidators(Validators.compose([]));
      CIS.get('billingEmail').setValidators(Validators.compose([]));
    }
  }

  public initContacts(contact) {
    return this.fb.group(
      {
        id: contact.id,
        phones: contact.phones,
        emails: contact.emails,
        title: contact.title,
        role_id: contact.role_id,
        role_type: contact.role_type
      }
    );
  }

  public addContact(): void {
    const name = this.selectedCustomerType;
    const control = this.contactsSheet.get(name) as FormArray;

    var contact;
    var role;
    var roleType;

    if (this.selectedCustomerId === undefined && this.contactsByTypeList[name].length > 0) {
      this.selectedCustomerId = this.contactsByTypeList[name][0].id;
    }

    switch (name) {
      case 'customers':
        contact = this.getCustomerDetail(this.selectedCustomerId);
        role = this.contactRoles.find(x => x.id === +this.selectedContactRole);
        roleType = 'ContactRole'
        break;
      case 'employees':
        contact = this.getEmployeeDetail(this.selectedCustomerId);
        role = this.employeeRoles.find(x => x.id === +this.selectedEmployeeRole);
        roleType = 'EmployeeRole'
        break;
      case 'subcontractors':
        contact = this.getSubcontractorDetail(this.selectedCustomerId);
        role = this.contactRoles.find(x => x.id === +this.selectedContactRole);
        roleType = 'SubcontractorRole';
        break;
    }

    if (contact && role) {
      contact.title = role.role;
      contact.role_id = role.id;
      contact.role_type = roleType;

      const control = this.contactsSheet.get(name) as FormArray;
      var hasRole = false;
      this.contactsSheet.get(name).value.forEach((con) => {
        if (con.role_id === role.id) {
          hasRole = true;
          return false;
        } else {
          
        }
      });

      if (hasRole === false) {
        this.addContactError = '';
        control.push(this.initContacts(contact));

        this.added = 'Added successfully';
        setTimeout(() => { this.added = false; this.modalRef.close(); }, 5000);
      } else {
        this.addContactError = 'Role already exists.';
      }
    }
  }

  public getCustomerDetail(contactId: number) {
    return contactId ? this.customers.find(x => x.id === +contactId) : { id: 0, name: '', phones: [], emails: [] };
  }

  public getEmployeeDetail(employeeId: number) {
    return employeeId ? this.employees.find(x => x.id === +employeeId) : { id: 0, name: '', phones: [], emails: [] };
  }

  public getSubcontractorDetail(subcontractorId: number) {
    return subcontractorId ? this.subcontractors.find(x => x.id === +subcontractorId) : { id: 0, name: '', phones: [], emails: [] };
  }

  jobTypeAdded(jobType: SelectOption): void {
    this.jobTypes.push(jobType);
    setTimeout(() => { this.jobInformationSheet.get('jobType').setValue(jobType.value) });
  }

  damageTypeAdded(damageType: SelectOption): void {
    this.damageTypes.push(damageType);
    setTimeout(() => { this.jobInformationSheet.get('damageType').setValue(damageType.value) });
  }

  paymentTermsAdded(paymentTerm): void {
    this.paymentTerms.push(paymentTerm);
    setTimeout(() => { this.jobInformationSheet.get('paymentTerm').setValue(paymentTerm.value) });
  }

  propertyTypeAdded(propertyType: SelectOption): void {
    this.propertyTypes.push(propertyType);
    setTimeout(() => { this.jobInformationSheet.get('propertyType').setValue(propertyType.value) });
  }

  referralTypeAdded(referralType: SelectOption): void {
    this.referralTypes.push(referralType);
    setTimeout(() => { this.jobInformationSheet.get('referralType').setValue(referralType.value) });
  }

  workTypeAdded(workType: SelectOption): void {
    this.workTypes.push(workType);
    setTimeout(() => {  this.jobInformationSheet.get('workType').setValue(workType.value) });
  }

  public remove(index: number, name: string): void {
    const control = this.contactsSheet.get(name) as FormArray;
    control.removeAt(index);
  }

  public onSubmit() {
    this.message = 'Updating the job. Please wait...';

    var contactIds = [];

    this.contactsSheet
      .get('customers')
      .value
      .forEach((customer) => {
        if (customer.id !== undefined) {
          contactIds.push({
            id: customer.id,
            role_id: customer.role_id,
            role_type: customer.role_type
          });
        }
      });
    this.contactsSheet
      .get('employees')
      .value
      .forEach((employee) => {
        if (employee.id !== undefined) {
          contactIds.push({
            id: employee.id,
            role_id: employee.role_id,
            role_type: employee.role_type
          });
        }
      });

    this.contactsSheet
      .get('subcontractors')
      .value
      .forEach((subcontractor) => {
        if (subcontractor.id !== undefined) {
          contactIds.push({
            id: subcontractor.id,
            role_id: subcontractor.role_id,
            role_type: subcontractor.role_type
          });
        }
      });

    const ids = [];
    contactIds.forEach((contact) => {
      if (contact.id !== '' || contact.role_id !== '') {
        ids.push(contact);
      }
    });

    const data: any = {
      name: this.customerInformationSheet.value['jobName'],
      customer_type: this.customerType,
      job_number: this.customerInformationSheet.value['jobNumber'],
      office: this.office,
      contact_person: this.job.customer.id,
      customer_id: parseInt(this.job.customer.id),
      address: this.customerInformationSheet.value['jobAddress'],
      city: this.customerInformationSheet.value['jobCity'],
      state: this.customerInformationSheet.value['jobState'],
      zip: this.customerInformationSheet.value['jobZipCode'],
      phone: this.customerInformationSheet.value['jobPhone'],
      email: this.customerInformationSheet.value['jobEmail'],
      year_built: this.jobInformationSheet.value['yearBuilt'],
      approx_estimate: this.jobInformationSheet.value['approxEstimate'],
      probability: this.jobInformationSheet.value['jobProbability'],
      job_type_id: parseInt(this.jobInformationSheet.value['jobType']),
      work_type_id: parseInt(this.jobInformationSheet.value['workType']),
      property_type_id: parseInt(this.jobInformationSheet.value['propertyType']),
      damage_type_id: parseInt(this.jobInformationSheet.value['damageType']),
      referral_type_id: parseInt(this.jobInformationSheet.value['referralType']),
      payment_term_id: parseInt(this.jobInformationSheet.value['paymentTerm']),
      fax: this.customerInformationSheet.value['jobFax'],
      contact_ids: ids,
      status: this.jobInformationSheet.value['jobStatus'],
      claim_number: this.jobInformationSheet.value['claimNumber'],

      customer_address: this.customerInformationSheet.value['customerAddress'],
      customer_city: this.customerInformationSheet.value['customerCity'],
      customer_state: this.customerInformationSheet.value['customerState'],
      customer_zip: this.customerInformationSheet.value['customerZipCode'],
      customer_phone: this.customerInformationSheet.value['customerPhone'],
      customer_email: this.customerInformationSheet.value['customerEmail'],
      customer_fax: this.customerInformationSheet.value['customerFax'],

      billing_address: this.customerInformationSheet.value['billingAddress'],
      billing_city: this.customerInformationSheet.value['billingCity'],
      billing_state: this.customerInformationSheet.value['billingState'],
      billing_zip: this.customerInformationSheet.value['billingZipCode'],
      billing_phone: this.customerInformationSheet.value['billingPhone'],
      billing_email: this.customerInformationSheet.value['billingEmail'],
      billing_fax: this.customerInformationSheet.value['billingFax'],

      same_customer_info: this.customerInformationSheet.value['customerInfoSameAsJobInfo'],
      same_bill_info: this.customerInformationSheet.value['billingInfoSameAsJobInfo'],
    };

    this.jobService.update(data, this.job.id)
      .subscribe((res) => {
        this.message = 'Job updated successfully!';

        setTimeout(() => { 
          this.message = false; 
          this.listJobs();
          this.getJobs();
        }, 5000);
      });
  }
}
