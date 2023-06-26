import { Component } from '@angular/core';
import { UserregisterService } from '../userregister.service';
import { AlertifyServiceService } from '../alertify-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent {
  login:boolean=true;
  loggedinNavBar:boolean=false;
  name:string | null | undefined ='';
  constructor(private userService:UserregisterService,
    private AL:AlertifyServiceService,
    private router:Router)  {
    this.name=localStorage.getItem("loggedin");

    if(localStorage.getItem("loggedin")=="true"){
      this.loggedinNavBar=true;
      this.login=false;
    }
  }

  logout(){
    if(confirm(`Are You Sure want to logout ${localStorage.getItem("currentUserName")} ?`)==true){
      this.loggedinNavBar=false;
      this.login=true;
      setTimeout(()=>this.router.navigate(['login']),5000);
      localStorage.setItem("loggedin","false");
      localStorage.removeItem("currentUserName");
    }
    // else{
    //   this.AL.AlertUser(`Oops ${localStorage.getItem("currentUserName")}! You have clicked cancel button`);
    // }
  }

}
