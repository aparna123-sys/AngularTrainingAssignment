import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EmpService } from '../emp.service';
import { Employee, EmployeeColumns } from '../model/employee';

@Component({
  selector: 'app-addemp',
  templateUrl: './addemp.component.html',
  styleUrls: ['./addemp.component.css']
})
export class AddempComponent implements OnInit {

  addEmpForm!: FormGroup;
  emp!:Employee;
  isEdit:boolean=false;

  constructor(private empservice:EmpService, private fb: FormBuilder,private router:Router,
    public dialogRef: MatDialogRef<AddempComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee)
    {
      if (data.id == null) {
      this.addEmpForm = new FormGroup({
        "id":new FormControl(''),
        "firstName" : new FormControl('', [Validators.required]),
        "lastName" :new FormControl('', [Validators.required]),
        "email" : new FormControl('',[Validators.email,Validators.required]),
        "birthDate": new FormControl('',[Validators.required]),
      });
    }
      if (data.id != null) {
        this.addEmpForm = new FormGroup({
          "id":new FormControl(''),
          "firstName" : new FormControl('', [Validators.required]),
          "lastName" :new FormControl('', [Validators.required]),
          "email" : new FormControl('',[Validators.email,Validators.required]),
          "birthDate": new FormControl('',[Validators.required]),
        });
        this.addEmpForm.setValue(data);
        this.isEdit=true;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  addEditEmp( ){
    this.dialogRef.close(Object.assign(new Employee(), this.addEmpForm.value));
  }






}
