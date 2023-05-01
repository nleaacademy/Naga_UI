import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/model/loginResponse';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  request = new Register();
  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      "id": [''],
      "userName": ['', Validators.required],
      "password": ['', Validators.required],
      "confirmPassword": ['', Validators.required],
      "emailId": ['', [Validators.required, Validators.email]],
      "mobileNo": ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      "role": ['', Validators.required]
    });
  }

  register() {
    this.submitted = true;
    if (this.registerForm.valid) {
      //this.request.id = this.registerForm.get('id').value;
      this.request.userName = this.registerForm.get('userName').value;
      this.request.password = this.registerForm.get('password').value;
      this.request.confirmPassword = this.registerForm.get('confirmPassword').value;
      this.request.role = this.registerForm.get('role').value;
      this.request.emailId = this.registerForm.get('emailId').value;
      this.request.mobileNo = Number(this.registerForm.get('mobileNo').value);
      console.log('registerForm:', this.request);
      this.service.register(this.request).subscribe((data: string) => {
        console.log('REsponse:', data);
        if (data) {
          this.router.navigateByUrl(`/login`);
        }
      }, (error) => {
        console.log('error:', error);
      });
    }
  }

  get f() { return this.registerForm.controls; }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  ok(){
   this.onReset();
    this.router.navigateByUrl('/login');
  }
}
