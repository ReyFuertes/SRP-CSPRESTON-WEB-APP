import { Job } from '../../../../models/job.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'job-totals',
    templateUrl: './job-totals.component.html'
})
export class JobTotalsComponent implements OnInit {

    @Input()
    public job: Job;

    constructor() { }

    ngOnInit() {
    }

}
