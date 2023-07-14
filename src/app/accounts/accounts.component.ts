import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  currentUserProfileName : any = '';
  currentUserEmailID : any = '';
  cuurentUserJSONID : any = '';

  constructor(){
    this.currentUserProfileName = sessionStorage.getItem('currentUserName');
    this.currentUserEmailID=sessionStorage.getItem('currentUserEmail');
    this.cuurentUserJSONID = sessionStorage.getItem('currentUserJSONID');
  }

}
