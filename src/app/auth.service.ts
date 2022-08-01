import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authenticate(username:string,password:string):boolean{
    if(username!="FirstTest" && password!="FirstTest")
    {
    return false;
    }
    else
    {
    localStorage["username"]=username;
    return true;
    }
  }
}
