import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '',   component: LoginComponent, pathMatch:'full'},
  { path: 'home', canActivate:[AuthGuard], component:  HomeComponent},
  { path: 'employees', canActivate:[AuthGuard],  component:  EmployeeComponent //},
    //,children:[
    //{path: ':id',  component:  EmpdetailComponent
 // }
//]
}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
