import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from '../role.service';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
  selector: 'app-employee-roles',
  templateUrl: './employee-roles.component.html'
})

export class EmployeeRolesComponent implements OnInit {

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "Employee Roles",
      path: ''
    }
  ];

  public roles: any[];

  public role: any;

  public updating = false;

  public createModalRef: any;

  public updateModalRef: any;

  public deleteModalRef: any;

  @ViewChild('createModal')
  public createRoleModal: any;

  @ViewChild('editModal')
  public editRoleModal: any;

  @ViewChild('deleteModal')
  public deleteRoleModal:any;

  public createRoleForm: FormGroup;

  constructor(
    private roleService: RoleService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService
  ) {

    
  }

  ngOnInit() {
    this.initCreateRole();
     this.listRoles()
  }

  protected initCreateRole() {
    this.createRoleForm = this.formBuilder.group(
      {
        role: [ '', Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        description: [ '', Validators.compose([ Validators.maxLength(255) ]) ]
      });
  }

  protected listRoles() {
    this
    .roleService
    .listEmployeeRoles()
    .subscribe(
      (res) => {
        this.roles = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onCreateRole() {
    this.createModalRef = this.modalService.open(this.createRoleModal);

    this.createModalRef.result.then((data) => {}, (reason) => {
      this.initCreateRole();
    });
  }

  public onEditRole(role) {
    this.role = role;
    this.updateModalRef = this.modalService.open(this.editRoleModal);
  }

  public onDeleteRole(role) {
    this.role = role;
    this.deleteModalRef = this.modalService.open(this.deleteRoleModal);
  }

  public createRole() {
    const data = {
      role: this.createRoleForm.get('role').value,
      description: this.createRoleForm.get('description').value,
    };

    this.notificationService.info('Saving...');

    this
    .roleService
    .createEmployeeRole(data)
    .subscribe(
      (res) => {
        this.listRoles();
        this.closeCreate();
        this.notificationService.success('Saving successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateRole(form: NgForm) {
    
    this.notificationService.info('Saving...');

    this
    .roleService
    .updateEmployeeRole(form.value, this.role.id)
    .subscribe(
      (res) => {
        this.listRoles();
        this.updateModalRef.close();
        this.notificationService.success('Saving successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteRole(role) {
    this
    .roleService
    .deleteEmployeeRole(this.role.id)
    .subscribe(
      (res) => {
        this.listRoles();
        this.closeDelete();
        this.notificationService.success('Delete successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public closeCreate() {
    this.initCreateRole();
    this.createModalRef.close();
  }

  public closeDelete() {
    this.deleteModalRef.close();
  }
}
