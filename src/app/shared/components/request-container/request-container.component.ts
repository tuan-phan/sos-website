import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestCardDetailsComponent } from '../request-card-details/request-card-details.component';

@Component({
  selector: 'app-request-container',
  templateUrl: './request-container.component.html',
  styleUrls: ['./request-container.component.scss']
})
export class RequestContainerComponent implements OnInit {
  @Input() requests?: ISOSRequest[];
<<<<<<< HEAD
  @Input() type?: String;
=======
>>>>>>> 9726b1ac57b5086926e34d59986ce00e17681e58
  constructor(
    public dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
<<<<<<< HEAD
   
=======
    throw new Error('Method not implemented.');
>>>>>>> 9726b1ac57b5086926e34d59986ce00e17681e58
  }

  chooseRequest(request: ISOSRequest) {
    const dialogRef = this.dialog.open(RequestCardDetailsComponent, {
      width: '100vw',
      height: '100vh',
      data: request,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
