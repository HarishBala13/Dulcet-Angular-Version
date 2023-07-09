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

  upiDivBoolean = true;
  cardDivBoolean = false;

  constructor(userService:UserregisterService){
    this.name = sessionStorage.getItem("currentUserName");
    this.id = userService.currentUserJSONID;
    this.date = new Date();
    this.today = this.date.toDateString();
  }

  upiDivToggleOpen(){
    this.upiDivBoolean = true;
  }
  cardDivToggleOpen(){
    this.cardDivBoolean = true;
  }
}
