import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../job.service';
import { ContactService } from '../../contacts/contact.service';
import { FileUpload } from 'primeng/primeng';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-documents',
  templateUrl: './job-documents.component.html',
  styleUrls: ['./job-documents.component.scss'],
  providers: [
    JobService,
    ContactService
  ]
})

export class JobDocumentsComponent implements OnInit {

  public id = null;
  public job = null;
  public jobDocuments = false;
  public selectedDocument;

  public selectedCategoryId;

  public estimateCategorySelected = false;
  public estimateCategoryId = 3;
  public selectedEstimateId;

  public uploadSuccess = false;
  public uploadError = false;
  
  public deleteSuccess = false;
  public deleteError = false;

  public uploadModal;
  public deleteModal;
  
  public documentCategories = [];
  public filterCategoryId;
  public filterEstimateId;


  @ViewChild('uploadDocumentModal') uploadDocumentModal: NgbModal;
  @ViewChild('deleteDocumentModal') deleteDocumentModal: NgbModal;

  constructor(
    private jobService: JobService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activateRoute: ActivatedRoute,
  ) {  
  }

  public ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = +params['id']; 
    });

    this.jobService.getJob(this.id).subscribe((response) => {
      this.job = response.data;
    });

    this.listJobDocuments(this.id);

    this.jobService.documentCategories().subscribe((response) => {
        this.documentCategories = response.data;
    });
  }

  public listJobDocuments(jobId, categoryId?: number, estimateId?: number) {
    var filter = '';

    if (categoryId !== undefined && categoryId != 0) {
      filter = '?filter=category&document_category_id='+categoryId;

      if (estimateId !== undefined && estimateId != 0) {
        filter = filter + '&estimate_id=' + estimateId;
      }
    }

    this.jobService.listJobDocuments(jobId, filter).subscribe((response) => {
      this.jobDocuments = response.data;
      this.setSelectedDocument(response.data[0]);
    });
  }

  public listJobDocumentsByCategory(event) {
    if (0 == this.filterCategoryId) {
      this.listJobDocuments(this.job.id);
    } else {
      this.listJobDocuments(this.job.id, this.filterCategoryId);
    }
  }

  public listJobDocumentsByEstimate(event) {
    if (0 == this.filterEstimateId) {
      this.listJobDocumentsByCategory(event);
    } else {
      this.listJobDocuments(this.job.id, this.filterCategoryId, this.filterEstimateId);
    }
  }

  public setSelectedDocument(doc) {
    this.selectedDocument = doc;
  }

  public onSelect(event) {
    this.estimateCategorySelected = (this.estimateCategoryId == this.selectedCategoryId);
  }

  public openUploadModal() {
    this.uploadModal = this.modalService.open(this.uploadDocumentModal, {windowClass: 'document-modal', size: 'lg'});
  }

  public openDeleteModal() {
    this.deleteModal = this.modalService.open(this.deleteDocumentModal, {windowClass: 'delete-document-modal'});
  }

  public documentUploadHandler(event) {
    this.uploadSuccess = false;
    this.uploadError = false;
    
    this.jobService.uploadDocuments(event.files, this.job.id, this.selectedCategoryId, this.selectedEstimateId).subscribe((response) => {
        this.uploadSuccess = true;
        this.listJobDocuments(this.job.id, this.filterCategoryId, this.filterEstimateId);

        setTimeout(() => {
              this.closeUploadModal();
        }, 2000);
      });
  }

  public confirmDocumentDelete(doc, $event) {
    this.deleteSuccess = false;
    this.deleteError = false;
    this.openDeleteModal();
    this.selectedDocument = doc;
  }

  public deleteDocument(doc, $event) {
    this.jobService.deleteJobDocument(doc.id).subscribe((response) => {
      this.deleteSuccess = true;
        setTimeout(() => {
              this.closeDeleteModal();
        }, 2000);
        
        this.listJobDocuments(this.job.id, this.filterCategoryId, this.filterEstimateId);
    });
  }

  public downloadDocument(doc, $event) {
    this.jobService.downloadFile(doc.id, localStorage.getItem('auth_token'));
  }
  
  public closeUploadModal() {
    this.uploadModal.close();
    this.uploadSuccess = false;
    this.uploadError = false; 
    this.selectedCategoryId = null;
    this.selectedEstimateId = null;
    this.estimateCategorySelected = false;
  }

  public closeDeleteModal() {
    this.deleteModal.close();
    this.deleteSuccess = false;
    this.deleteError = false;
  }

  public isPDF(doc) {
    return doc.mime_type === 'application/pdf';
  }

  public isDocument(doc) {
    return doc.mime_type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
           doc.mime_type == 'application/vnd.google-apps.document'
  }

  public isSpreadsheet(doc) {
    return doc.mime_type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
           doc.mime_type == 'application/vnd.ms-excel' ||
           doc.mime_type == 'application/vnd.google-apps.spreadsheet'
  }

  public isText(doc) {
    return doc.mime_type === 'text/plain';
  }

  public isImage(doc) {
    return doc.mime_type === 'image/png' || doc.mime_type === 'image/jpg' || doc.mime_type === 'image/jpeg' || doc.mime_type === 'image/gif';
  }
}
