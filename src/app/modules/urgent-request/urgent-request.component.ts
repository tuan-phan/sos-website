import { StorageService } from 'src/app/core/services/storage.service';
import { RequesterObjectStatusService } from '../../core/http/requester-object-status.service';
import { SupportTypesService } from '../../core/http/support-types.service';
import { RequestCardDetailsComponent } from './../../shared/components/request-card-details/request-card-details.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { VolunteerGroupService } from '../../core/http/volunteer-group.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';

@Component({
  selector: 'app-urgent-request',
  templateUrl: './urgent-request.component.html',
  styleUrls: ['./urgent-request.component.scss'],
})
export class UrgentRequestComponent implements OnInit {
  requests: ISOSRequest[] = [];
  userCreatedRequests: ISOSRequest[] = [];
  joinedRequests: ISOSRequest[] = [];
  groupSuggested: ISOSRequest[] = [];
  user: any;
  constructor(
    public dialog: MatDialog,
    private UrgentRequestService: UrgentRequestService,
    private SupportTypesService: SupportTypesService,
    private RequesterObjectStatusService: RequesterObjectStatusService,
    private StorageService: StorageService
  ) {}
  fetchInit() {
    this.UrgentRequestService.findAll().subscribe((result) => {
      this.requests = result;
      console.log(result);
    });
    if (this.user != null) {
      this.UrgentRequestService.getByRequesterId(this.user.id).subscribe((result) => {
        this.userCreatedRequests = result;
        console.log(result);
      });
      this.UrgentRequestService.getJoinedRequests(this.user.id).subscribe((result) => {
        this.joinedRequests = result;
        console.log(result);
      });
      this.user.groups.forEach((group: any) => {
        this.UrgentRequestService.getJoinedRequests(group.id).subscribe((result) => {
          this.groupSuggested = [...this.groupSuggested, ...result]
          console.log(result);
        });
      });

    }
  }
  openCreateForm(): void {
    const dialogRef = this.dialog.open(RequestFormComponent, {
      width: 'auto',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  ngOnInit(): void {
    this.user = this.StorageService.userInfo;
    this.fetchInit();
  }
}
