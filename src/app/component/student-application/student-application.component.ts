import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationRequest } from 'src/app/model/applicationRequest';
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
    console.log(this.id);

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
      
      this.service.register(this.studentForm.value).subscribe((data: string) => {
        console.log('Response:', data);

        if (data) {
          if(this.selectedFiles != null)  {
            this.currentFileUpload = this.selectedFiles.item(0);
            console.log('currentFileUpload:',this.currentFileUpload);  
            this.service.uploadFile( this.currentFileUpload,this.id).subscribe((response:any)=>{
              console.log('Upload Response:',response);
              if(response){

              }
            },
            (error)=>{

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
