import { Component } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  currentUserProfileName : any = '';
  currentUserEmailID : any = '';
  cuurentUserJSONID : any = '';
  profiles : any = '';

  constructor(private profileService:ProfileService){

    profileService.getUserProfileDetails().subscribe(values => {
      this.profiles = values;
      this.currentUserProfileName = this.profiles.regname;
    });

    this.currentUserEmailID=sessionStorage.getItem('currentUserEmail');
    this.cuurentUserJSONID = sessionStorage.getItem('currentUserJSONID');
  }

}
