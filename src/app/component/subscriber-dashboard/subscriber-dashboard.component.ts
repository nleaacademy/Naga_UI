import { Component, OnInit } from '@angular/core';
import { AttachedResponse } from 'src/app/model/applicationRequest';
import { Application } from 'src/app/model/applicationResponse';
import { StudentApplicationService } from 'src/app/services/student-application.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-subscriber-dashboard',
  templateUrl: './subscriber-dashboard.component.html',
  styleUrls: ['./subscriber-dashboard.component.css']
})
export class SubscriberDashboardComponent implements OnInit {
  student: Application[] = [];
  checked: any;
  idFormArray: Array<any> = [];
  sub: any;
  subId: number;
  constructor(
    private service: StudentApplicationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.subId = params['id'];
    });
    this.service.getAllStudentDetails().subscribe((response: Application[]) => {
      console.log('REEEE:', response);
      if (response) {
        this.student = response;
      }
    });
  }
  downloadFile(attached: AttachedResponse) {
    console.log('attached:', attached);
    this.service.getFile(attached.id).subscribe(blob => {
      console.log('BLOB:::::', blob);
      saveAs(blob, attached.fileName)

    });
  }
  onChange(id: string, isChecked: boolean) {
    console.log('ID:', id);
    console.log('isChecked:', isChecked)
    if (isChecked) {
      this.idFormArray.push(id);
    } else {
      let index = this.idFormArray.indexOf(id);
      this.idFormArray.splice(index, 1);
    }
    console.log(',idFormArray:',this.idFormArray);
  }
  save(){
    console.log('Save:',this.idFormArray);
    console.log(' this.subId:', this.subId);
    if(this.idFormArray){

    }
  }

}
