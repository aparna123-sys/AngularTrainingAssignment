import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 authenticate!:boolean;
 loginForm!: FormGroup;
 submitted = false;

  constructor(private authservice:AuthService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      "username": ['', [Validators.required]],
      "password": ['', Validators.compose([Validators.required,Validators.maxLength(10)])]
    })
  }

  login( ){
    const unm=this.loginForm.controls["username"].value;
    const pwd=this.loginForm.controls["password"].value;
    this.authenticate=this.authservice.authenticate(unm,pwd);
    if(this.authenticate==true)
    this.router.navigate(['/home']);
  }

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

}
