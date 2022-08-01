import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { AddempComponent } from '../addemp/addemp.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EmpService } from '../emp.service';
import { Employee, EmployeeColumns } from '../model/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  displayedColumns:any= EmployeeColumns.map((col) => col.key);
  displayedColumnsForConfig = ['firstName', 'lastName', 'email', 'birthDate','actions'];
  columnsSchema: any = EmployeeColumns;
  dataSource:MatTableDataSource<Employee>;
  valid: any = {};
  displayMe!:boolean;
  selectedRow!:Employee;

  private serviceSubscribe!: Subscription;
  constructor(private empService:EmpService,public dialog: MatDialog)
  { this.dataSource=new MatTableDataSource<Employee>()}

  ngOnInit(): void {
    this.LoadData();
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddempComponent, {
      width: '400px',
      data: {}

    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.empService.addemployee(result).subscribe(res=>
          {
            this.LoadData();
            this.refreshTable();
          });
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);

  }

  LoadData(){
    this.empService.getemployees().subscribe((res: any) => {
      this.dataSource.data = res;
    });
     }

  // editRow(row: Employee) {
  //   if (row.id === 0) {
  //     this.empService.addemployee(row).subscribe((newemployee: Employee) => {
  //       row.id = newemployee.id;
  //     });
  //   } else {
  //     this.empService.updateemployee(row).subscribe(() => (row));
  //   }
  // }

  editRow(row: Employee)
  {
    const dialogRef = this.dialog.open(AddempComponent, {
      width: '400px',
      data: row
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.empService.updateemployee(result).subscribe(res=>
          {
            this.LoadData();
            this.refreshTable();
          });
      }
    });
  }

  addRow() {
    const newRow: Employee = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: number) {
    this.empService.deleteemployee(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: Employee) => u.id !== id
      );
      this.refreshTable();
    });
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {};
    }
    this.valid[id][key] = e.target.validity.valid;
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false);
    }
    return false;
  }

}





