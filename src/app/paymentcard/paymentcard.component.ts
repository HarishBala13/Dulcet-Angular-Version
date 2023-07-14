import { Component } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-paymentcard',
  templateUrl: './paymentcard.component.html',
  styleUrls: ['./paymentcard.component.css']
})
export class PaymentcardComponent {

  cardDetails:any='';
  expiryDate:any=' ';
  userCardNumber:any=' ';
  userCardType:any=' ';
  cardImage:any=' ';
  cardHolderName:any=' ';
  paymentCardDiv : boolean = false;
  noPaymentCardDiv : boolean = false;

  constructor(private paymentService:PaymentService){
    console.log(paymentService.paymentInfo);
    paymentService.getUserPaymentCardDetails().subscribe(values => {
      this.cardDetails = values;
      console.log(this.cardDetails.paymentCard)


    if(this.cardDetails.paymentCard.length == 0){
      this.paymentCardDiv = false;
      this.noPaymentCardDiv = true;
    }
    else{
      this.expiryDate = this.cardDetails.paymentCard[0].cardExpiryDate;
      this.userCardNumber = this.cardDetails.paymentCard[0].cardNumber;
      this.userCardType = this.cardDetails.paymentCard[0].cardType;
      this.cardImage = this.cardDetails.paymentCard[0].cardImage;
      this.cardHolderName = this.cardDetails.paymentCard[0].cardHolderName;
      console.log(this.cardDetails.paymentCard);
      this.paymentCardDiv = true;
      this.noPaymentCardDiv = false;
    }
    });
  }

  removeUserPaymentCard(){
    this.paymentService.deleteUserPaymentCard();
  }

}
