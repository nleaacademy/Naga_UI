import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationRequest } from 'src/app/model/applicationRequest';
import { Register } from 'src/app/model/loginResponse';
import { StudentApplicationService } from 'src/app/services/student-application.service';

@Component({
  selector: 'app-student-application',
  templateUrl: './student-application.component.html',
  styleUrls: ['./student-application.component.css']
})
export class StudentApplicationComponent implements OnInit {
  studentForm: FormGroup;
  submitted = false;
  selectedFiles: FileList;
  currentFileUpload: File;
  request = new ApplicationRequest();
  sub: any;
  id: number;
  constructor(
    private formBuilder: FormBuilder,
    private service: StudentApplicationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.createForm();
  }

  createForm() {
    this.studentForm = this.formBuilder.group({
      id: [''],
      studentName: ['', Validators.required],
      registerNo: ['', Validators.required],
      education: ['', Validators.required],
      instituteName: ['', Validators.required],
      course: ['', Validators.required],
      department: ['', Validators.required],
      mobileNo: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      userId: [this.id]
    });
    console.log(this.id);
    if (this.id) {
      this.service.getStudentDetails(this.id).subscribe((response: Register) => {
        console.log('Response:', response);
        if (response) {
          this.studentForm.get('emailId').setValue(response.emailId);
          this.studentForm.get('mobileNo').setValue(response.mobileNo);
          this.studentForm.get('registerNo').setValue(response.userName);
        }
      });
    }
    // this.studentForm.get('emailId').disable();
    // this.studentForm.get('mobileNo').disable();
    // this.studentForm.get('registerNo').disable();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  saveStudentApplication() {
    this.submitted = true;
    if (this.studentForm.valid) {
      this.request = this.studentForm.value;
      console.log('the request:', this.request);
      console.log('studentForm:', this.studentForm.value);
      console.log(this.studentForm.get('emailId').value);
      console.log(this.studentForm.get('mobileNo').value);
      console.log(this.studentForm.get('registerNo').value);

      this.service.register(this.request).subscribe((data: string) => {
        console.log('Response:', data);

        if (data) {
          if (this.selectedFiles != null) {
            this.currentFileUpload = this.selectedFiles.item(0);
            console.log('currentFileUpload:', this.currentFileUpload);
            this.service.uploadFile(this.currentFileUpload, this.id).subscribe((response: any) => {
              console.log('Upload Response:', response);
              if (response) {

              }
            },
              (error) => {

              });
          }

          this.router.navigateByUrl(`/home/studentDashboard/${this.id}`);
        }
      }, (error) => {
        console.log('Error:', error);
      });
    }
  }

  get f() { return this.studentForm.controls; }

  onReset() {
    this.submitted = false;
    this.studentForm.reset();
  }

}
