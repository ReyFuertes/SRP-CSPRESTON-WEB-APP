import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ibox-panel',
  templateUrl: './ibox.component.html'
})
export class IboxComponent implements OnInit {
  @Input() breadcrumbs: any = [];

  constructor() { }

  ngOnInit() {
  }

}
