import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpService } from '../emp.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-editemp',
  templateUrl: './editemp.component.html',
  styleUrls: ['./editemp.component.css']
})

export class EditempComponent implements OnInit {
  editEmpForm!: FormGroup;
  emp!:Employee;
  @Input() selectedemp!:Employee;
  constructor(private empservice:EmpService, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
  this.editEmpForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    email: [''],
    birthdate: ['']
    })
  }

editEmp( ){
  const firstname=this.editEmpForm.controls["lastname"].value;
  const lastname=this.editEmpForm.controls["lastname"].value;
  const email=this.editEmpForm.controls["email"].value;
  const birthdate=this.editEmpForm.controls["birthdate"].value;
  //this.emp={firstName:firstname,lastName:lastname,email:email,birthDate:birthdate}
  this.empservice.updateemployee(this.emp).subscribe(() => (this.emp));

}

firstname = new FormControl('', [Validators.required]);
lastname = new FormControl('', [Validators.required]);
email= new FormControl('');
birthdate= new FormControl('');

}
