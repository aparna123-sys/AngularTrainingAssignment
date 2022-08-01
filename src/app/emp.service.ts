import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Employee } from './model/employee';
const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EmpService {

  allEmployee!: Employee[];

  private serviceUrl = environment.apiurl;
  constructor(private http: HttpClient) {}

  getemployees(): Observable<Employee[]> {
    return this.http.get(this.serviceUrl).pipe<Employee[]>(map((data: any) => data));
  }

  updateemployee(employee: Employee): Observable<Employee> {
    return this.http.patch<Employee>(`${this.serviceUrl}/${employee.id}`, employee);
  }

  addemployee(user: Employee):Observable<Employee> {
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json' });
      //let empdata=JSON.stringify(user);
    //  let options = { headers: headers };
    return this.http.post<Employee>(`${this.serviceUrl}`, user,headerOption);
  }

  deleteemployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.serviceUrl}/${id}`);
  }

  deleteemployees(employees: Employee[]): Observable<Employee[]> {
    return forkJoin(
      employees.map((employee) =>
        this.http.delete<Employee>(`${this.serviceUrl}/${employee.id}`)
      )
    );
  }

}
