import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  @Input() request?: ISOSRequest;
  @Input() type?: String;
  mapPriority = new Map();
  mapStatus = new Map();
  constructor() {

  }
  ngOnInit(): void {
    this.mapPriority.set('high', 'Rất nguy cấp');
    this.mapPriority.set('normal', 'Nguy cấp');
    this.mapPriority.set('', 'Nguy cấp');
    this.mapStatus.set('', 'Đang chờ hỗ trợ');
    this.mapStatus.set('waiting', 'Đang chờ hỗ trợ');
    this.mapStatus.set('supporting', 'Đang được hỗ trợ');
  }
}
