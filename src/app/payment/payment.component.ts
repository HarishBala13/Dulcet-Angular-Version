import { Component } from '@angular/core';
import { UserregisterService } from '../userregister.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  name:any='';
  id:any='';
  date:any='';
  today:any='';
  check:any=''

  upiDivBoolean = false;
  cardDivBoolean = false;

  constructor(userService:UserregisterService){
    this.name = sessionStorage.getItem("currentUserName");
    this.id = sessionStorage.getItem("currentUserJSONID");
    this.date = new Date();
    this.today = this.date.toDateString();
    this.check = document.getElementById("check");
  }


  upiDivToggleOpen(){
    this.upiDivBoolean = true;

    this.check?.classList.add("checkedCheckbox");
  }
  cardDivToggleOpen(){
    this.cardDivBoolean = true;
    this.check?.classList.remove("checkedCheckbox");
    this.check?.classList.add("checkedCheckbox");
  }
}
