import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'estimates-overview',
    templateUrl: './estimates-overview.component.html',
    styleUrls: ['./estimates-overview.component.scss']
})
export class EstimatesOverviewComponent implements OnInit {

    @Input() public estimates = [];
    @Output() public onEditEstimate = new EventEmitter();
    @Output() public onDeleteEstimate = new EventEmitter();
    @Output() public viewTypeChange = new EventEmitter();
    @Input() public viewType = 'grid';

    constructor() { }

    ngOnInit() {
    }

    public onEdit(estimate): void {
        this.onEditEstimate.emit(estimate);
    }

    public onDelete(estimate): void {
        this.onDeleteEstimate.emit(estimate);
    }

    public onViewTypeChange(viewType: string): void {
        this.viewTypeChange.emit({
            type: viewType
        });

        this.viewType = viewType;
    }

    public isPending(estimate) {
        return estimate.status === 'Pending';
    }

    public isApproved(estimate) {
        return estimate.status === 'Approved';
    }

    public showTimeCards(job) {

    }
}
