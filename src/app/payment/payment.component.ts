import { Component } from '@angular/core';
import { UserregisterService } from '../userregister.service';
import { AlertifyServiceService } from '../alertify-service.service';
import { SongsService } from '../songs.service';
import { PaymentService } from '../payment.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  getCurrentMonth:any='';
  currentMonth:any='';
  currentYear:any='';
  getDate:any='';
  getCurrentYear:any=[];
  userEnteredMonth:any='';
  userEnteredYear:any='';
  check:any=''
  userPremiumPlan:any='';
  newvalues:any='';
  planTitle:any='';
  planOffer:any='';
  expiryDateMessage:any='';
  cardNumberMessage:any='';
  expiryDateString:any = [];
  price:any='';
  cardImage:any='data:image/svg+xml,%3Csvg%20width%3D%2234%22%20height%3D%2224%22%20viewBox%3D%220%200%2034%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2233%22%20height%3D%2223%22%20rx%3D%222.5%22%20fill%3D%22white%22%20stroke%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%2218%22%20width%3D%2212%22%20height%3D%221%22%20fill%3D%22%23B3B3B3%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2218%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2225%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%228%22%20width%3D%226%22%20height%3D%224%22%20rx%3D%221%22%20fill%3D%22%23B3B3B3%22%2F%3E%0A%3C%2Fsvg%3E%0A';
  i:number=0;
  index1:number = 0;
  index2:number = 0;
  nonIncremented:number = 0;

  visaCardsArray:any = [];
  masterCardsArray:any = [];
  allCards:any = [];
  cards:any='';

  upiDivBoolean : boolean = false;
  cardDivBoolean : boolean = true;
  expiryDateBoolean : boolean = false;

  constructor(private AL:AlertifyServiceService,
    songSerice:SongsService,
    paymentServices:PaymentService,
    private formBuilder:FormBuilder){
    this.name = sessionStorage.getItem("currentUserName");
    this.id = sessionStorage.getItem("currentUserJSONID");
    this.date = new Date();
    this.today = this.date.toDateString();
    this.getCurrentYear = this.date.getFullYear() - 2000;
    // console.log(this.getDate);
    this.getCurrentMonth = this.date.getMonth() + 1;
    // console.log(this.getCurrentMonth);

    songSerice.userSubscribedPremiumPlan().subscribe(values => {
      this.newvalues = values;
      this.userPremiumPlan = this.newvalues.subscribedPlans;
      this.planTitle = this.userPremiumPlan[0].plans.title;
      this.planOffer = this.userPremiumPlan[0].plans.offer;
      this.price = this.planOffer.slice(0,4);
    });

    paymentServices.getMasterCardsBINNumber().subscribe(values => {
      this.masterCardsArray = values;
      // console.log(this.masterCardsArray);
    })
    paymentServices.getVisaCardBINNumber().subscribe(values => {
      this.visaCardsArray = values;
    })
  }


  cardValidationForm = this.formBuilder.group({
    cardNumber:['',Validators.required,Validators.maxLength],
    expiryDate:['',Validators.required],
    cvv:['',Validators.required]
  })

  submitCardInfo(){

  }

  notifyAddressInfo(){
    this.AL.AlertUser(`Why do you need my address? We need this information to comply with applicable laws in your country, like determining the tax we collect based on where you live.`);
  }

  upiDivToggleOpen(){
    this.upiDivBoolean = true;
  }
  cardDivToggleOpen(){
    this.cardDivBoolean = true;
    this.check?.classList.add("checkedCheckbox");
  }

  checkCardValid(x:any){

    this.cards = x.target.value;
    this.cards.toString(this.cards);

    if(this.cards[0] == "4"){
      console.log("Visa");
      this.cardImage = 'https://paymentsdk.spotifycdn.com/svg/cards/visa.svg';

      if(this.cards.length >= 2){
        for(this.index1 = 0; this.index1 < this.visaCardsArray.length; this.index1++){
          this.visaCardsArray.toString(this.visaCardsArray[this.index1]);

          if(this.cards.includes(this.visaCardsArray[this.index1])){
            console.log(this.visaCardsArray[this.index1])
          }
        }
      }
    }
    else if(this.cards[0] == "5"){
      this.cardImage = 'https://paymentsdk.spotifycdn.com/svg/cards/mastercard.svg';
      console.log("Master Card");
    }
    else{
      this.cardImage = 'data:image/svg+xml,%3Csvg%20width%3D%2234%22%20height%3D%2224%22%20viewBox%3D%220%200%2034%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2233%22%20height%3D%2223%22%20rx%3D%222.5%22%20fill%3D%22white%22%20stroke%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%2218%22%20width%3D%2212%22%20height%3D%221%22%20fill%3D%22%23B3B3B3%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2218%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2225%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%228%22%20width%3D%226%22%20height%3D%224%22%20rx%3D%221%22%20fill%3D%22%23B3B3B3%22%2F%3E%0A%3C%2Fsvg%3E%0A';
      console.log("Wrong details");
    }



    console.log(x.target.value);
    for(this.index1 = 0; this.index1 < this.visaCardsArray.length; this.index1++){
      if(x.target.value == this.visaCardsArray[this.index1].binNumber[this.nonIncremented]){
        console.log(this.visaCardsArray[this.index1].bankname);
      }
    }
  }

  expiryCardCheck(y:any){
    // console.log(typeof y);
    // y.target.value.toString(y);
    this.expiryDateString = y.target.value;
    this.userEnteredMonth = this.expiryDateString.slice(0,2);
    this.userEnteredYear = this.expiryDateString.slice(3,5);
    // this.getCurrentYear = this.getCurrentYear.slice(2,4);
    // console.log(this.expiryDateString);
    // console.log("first "+this.expiryDateString[0]);
    if(this.getCurrentMonth < 10){
      this.currentMonth = '0'+(this.getCurrentMonth);
    }
    else{
      this.currentMonth = this.getCurrentMonth;
    }
    if(this.currentMonth <= this.userEnteredMonth){
      if(this.userEnteredYear >= this.getCurrentYear){
        this.expiryDateMessage = "Success",{color:'green'};
        console.log("success");
      }
      else if(this.userEnteredYear < this.getCurrentYear){
        console.log("yaer expired");
      }
    }
    else{
      console.log("month expired")
    }
    // console.log(Object.keys(y).length);
    // if(this.userEnteredMonth <= this.currentMonth){
    //     console.log("Invalid month");
    //   }
  }
}
