import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CategoryService } from '../category.service';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
  selector: 'app-payment-terms',
  templateUrl: './payment-terms.component.html'
})

export class JobPaymentTermsComponent implements OnInit {

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "Payment Terms",
      path: ''
    }
  ];

  public categories: any[];

  public category: any;

  public createModalRef: any;

  public updateModalRef: any;

  public deleteModalRef: any;

  @ViewChild('createModal')
  public createRoleModal: any;

  @ViewChild('editModal')
  public editRoleModal: any;

  @ViewChild('deleteModal')
  public deleteRoleModal: any;

  public createCategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private notificationService: NotificationsService
  ) {
  }

  ngOnInit() {
    this.initCreateCategory();
    this.listCategories()
  }

  protected initCreateCategory() {
    this.createCategoryForm = this.formBuilder.group(
      {
        name: [ '', Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
      });
  }

  protected listCategories() {
    this
    .categoryService
    .listPaymentTerms()
    .subscribe(
      (res) => {
        this.categories = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onCreateCategory() {
    this.createModalRef = this.modalService.open(this.createRoleModal);

    this.createModalRef.result.then((data) => {}, (reason) => {
      this.initCreateCategory();
    });
  }

  public onEditCategory(category) {
    this.category = category;
    this.updateModalRef = this.modalService.open(this.editRoleModal);
  }

  public onDeleteCategory(category) {
    this.category = category;
    this.deleteModalRef = this.modalService.open(this.deleteRoleModal);
  }

  public createCategory() {
    const data = {
      name: this.createCategoryForm.get('name').value,
    };

    this.notificationService.info('Saving...');

    this
    .categoryService
    .createPaymentTerm(data)
    .subscribe(
      (res) => {
        this.listCategories();
        this.closeCreate();
        this.notificationService.success('Save successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateCategory(form: NgForm) {

    this.notificationService.info('Saving...');

    this
    .categoryService
    .updatePaymentTerm(form.value, this.category.id)
    .subscribe(
      (res) => {
        this.listCategories();
        this.updateModalRef.close();
        this.notificationService.success('Save successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteCategory(category) {
    this
    .categoryService
    .deletePaymentTerm(this.category.id)
    .subscribe(
      (res) => {
        this.listCategories();
        this.closeDelete();
        this.notificationService.success('Delete successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public closeCreate() {
    this.initCreateCategory();
    this.createModalRef.close();
  }

  public closeDelete() {
    this.deleteModalRef.close();
  }
}
