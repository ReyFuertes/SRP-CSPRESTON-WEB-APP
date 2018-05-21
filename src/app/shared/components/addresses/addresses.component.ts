import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

    @Input()
    public addresses: string[];

    @Input()
    public showType = false;

    constructor() { }

    ngOnInit() {
    }

}
