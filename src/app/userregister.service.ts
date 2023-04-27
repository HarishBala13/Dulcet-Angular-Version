import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserregisterService {
  isLoggedIn:boolean=false;
  constructor(private client:HttpClient) {  }
  addUser(body:any){
    return this.client.post("http://localhost:3000/usersregister",body);
  }
  checkUser(){
    this.isLoggedIn=false;
    return this.isLoggedIn;
    // return this.client.get("http://localhost:3000/usersregister");
  }
  updateUser(password:any,length:String){
    return this.client.patch("http://localhost:3000/usersregister/"+length,{regpassword:password,regconfirmpassword:password});
  }
  sendEmail(urL:any,userData:any){
    return this.client.post(urL,userData);
  }
}
