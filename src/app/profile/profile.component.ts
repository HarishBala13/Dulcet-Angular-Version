import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentUserEmailID:any ='';
  JSONID:any='';

  constructor(){
    this.currentUserEmailID = sessionStorage.getItem('currentUserEmail');
    this.JSONID = sessionStorage.getItem('currentUserJSONID');
  }
}
