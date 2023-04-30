import { Component, OnInit } from '@angular/core';
import { Admin, AdminResponse } from 'src/app/model/adminResponse';
import { AttachedResponse } from 'src/app/model/applicationRequest';
import { Application } from 'src/app/model/applicationResponse';
import { LoginService } from 'src/app/services/login.service';
import { StudentApplicationService } from 'src/app/services/student-application.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  studentApplication: Application[] = [];
  student: Admin[];
  subscriber: Admin[]
  constructor(
    private service: StudentApplicationService,
    private loginService:LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.getAll().subscribe((response: AdminResponse) => {
      console.log('response:',response);
      if (response) {
        this.student = response.student;
        this.subscriber = response.subscriber;
      }

    });
    this.service.getAllStudentDetails().subscribe((response: Application[]) => {
      console.log('Student details:',response);
      if (response) {
        this.studentApplication = response;
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
}


