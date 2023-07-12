import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileName:string | null | undefined ='';
  JSONID:any='';
  editProfile:boolean = false;
  isMenuOpened : boolean = false;

  constructor(){
    this.profileName = sessionStorage.getItem('currentUserName');
    this.JSONID = sessionStorage.getItem('currentUserJSONID');
  }

  editUserProfile(){
    this.editProfile = true;
  }


  clickedOutside(){
    this.isMenuOpened=false;
    // console.log("clicked clickedOutside");
  }

  toggle(){
    this.isMenuOpened =! this.isMenuOpened;
    // console.log("clicked toggle");
  }
}
