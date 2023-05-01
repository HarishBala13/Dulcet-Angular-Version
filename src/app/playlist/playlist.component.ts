import { Component } from '@angular/core';
import { UserregisterService } from '../userregister.service';
import { AlertifyServiceService } from '../alertify-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {

  isMenuOpened:boolean=false;
  openMyProfile:boolean=false;
  editProfile:boolean=false;

  profileName:string | null | undefined ='';

  constructor(private userRegService:UserregisterService,private AL:AlertifyServiceService,private router:Router){
    this.profileName=localStorage.getItem('currentUserName');
  }

  clickedOutside(){
    this.isMenuOpened=false;
    console.log("clicked clickedOutside");
  }

  toggle(){
    this.isMenuOpened =! this.isMenuOpened;
    console.log("clicked toggle");
  }

  openProfile(){
    this.openMyProfile=true;
  }

  openEditprofile(){
    this.editProfile=true;
  }

  logout(){
    this.userRegService.logoutUser();
    this.AL.AlertUser("Are You Sure want to Logout?");
    setTimeout(()=>this.router.navigate(['login']),5000);
    localStorage.removeItem("currentUserName");
  }
}
