import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  premiumPopupBoolean:boolean=true;
  currentUserProfileName:string | null | undefined | '';
  currentUserEmailID:string | null | undefined | '';
  cuurentUserJSONID:string | null | undefined | '';

  constructor(private formBuilder:FormBuilder){
    this.currentUserProfileName=sessionStorage.getItem('currentUserName');
    this.currentUserEmailID=sessionStorage.getItem('currentUserEmail');
    this.cuurentUserJSONID = sessionStorage.getItem('currentUserJSONID');
  }
  accountInfo = this.formBuilder.group({
    dateOfBirth:['',Validators.required,Validators.pattern('^(0[1-9]|[12][0-9]|3[01])[- /.] (0[1-9]|1[012])[- /.] (19|20)\d\d$')]
  })

  submitAccountInfo(){}

  closePremiumPopup(){
    this.premiumPopupBoolean = false;
  }
}
