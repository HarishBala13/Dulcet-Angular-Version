import { Component } from '@angular/core';
import { UserregisterService } from '../userregister.service';
import { AlertifyServiceService } from '../alertify-service.service';
import { SongsService } from '../songs.service';
import { PaymentService } from '../payment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  userPremiumPlan:any='';
  newvalues:any='';
  planTitle:any='';
  planOffer:any='';
  checkboxUPI:any='';
  checkboxCard:any='';
  expiryDateMessage:any='';
  expiryDateMessageColor:any='';
  cardNumberMessage:any='';
  cardMessageColor:any='';
  expiryDateString:any = '';
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
  cardNUmberTrue : boolean = false;
  cvvNumberTrue : boolean = false;

  constructor(private AL:AlertifyServiceService,private router:Router,
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

  notifyAddressInfo(){
    this.AL.AlertUser(`Why do you need my address? We need this information to comply with applicable laws in your country, like determining the tax we collect based on where you live.`);
  }

  upiDivToggleOpen(){
    this.upiDivBoolean = true;
    this.checkboxUPI = document.getElementById("checkboxUPI");
    this.checkboxUPI?.classList.add("checkedCheckbox");
  }

  cardDivToggleOpen(){
    this.cardDivBoolean = true;
    this.checkboxUPI?.classList.remove("checkedCheckbox")
    this.checkboxCard = document.getElementById("checkboxCard");
    this.checkboxCard?.classList.add("checkedCheckbox");
  }

  checkCardValid(cardNumberInput:any){
    this.cards = cardNumberInput.target.value;
    this.cards.toString(this.cards);

    if(this.cards[0] == "4"){
      this.cardNumberMessage = "Visa";
      this.cardMessageColor = 'green';
      this.cardNUmberTrue = true;
      // console.log("Visa");
      this.cardImage = 'https://paymentsdk.spotifycdn.com/svg/cards/visa.svg';

      // for(this.index2 = 0; this.index2 < 6; this.index2++){
      //   console.log(this.cards[this.index2].toString(this.cards[this.index2]));
      // }
      // console.log(typeof this.cards)

      // if(this.cards.length == 6){
      //   console.log(typeof this.visaCardsArray[0].binNumber);
      //   for(this.index1 = 0; this.index1 < this.visaCardsArray.length; this.index1++){

      //     if(JSON.parse(this.cards) == JSON.parse(this.visaCardsArray[this.index1].binNumber)){
      //       console.log(typeof JSON.parse(this.visaCardsArray[this.index1].banknumber));
      //       console.log(this.visaCardsArray[this.index1].binNumber);
      //       this.cardNumberMessage = [{message:this.visaCardsArray[this.index1].banknumber},{color:'green'}];
      //       break;
      //     }
      //     else{
      //       this.cardNumberMessage = [{message:"Provided BINNUMBER is incorrect"},{color:'red'}];
      //     }

      //   }
      // }
    }
    else if(this.cards[0] == "5"){
      this.cardNumberMessage = "Mastercard";
      this.cardMessageColor = 'green';
      this.cardNUmberTrue = true;
      this.cardImage = 'https://paymentsdk.spotifycdn.com/svg/cards/mastercard.svg';
      // console.log("Master Card");
    }
    else if(this.cards[0] == null){
      this.cardNumberMessage = "Please provide any cardnumber";
      this.cardMessageColor = 'red';
      this.cardImage = 'data:image/svg+xml,%3Csvg%20width%3D%2234%22%20height%3D%2224%22%20viewBox%3D%220%200%2034%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2233%22%20height%3D%2223%22%20rx%3D%222.5%22%20fill%3D%22white%22%20stroke%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%2218%22%20width%3D%2212%22%20height%3D%221%22%20fill%3D%22%23B3B3B3%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2218%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2225%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%228%22%20width%3D%226%22%20height%3D%224%22%20rx%3D%221%22%20fill%3D%22%23B3B3B3%22%2F%3E%0A%3C%2Fsvg%3E%0A';
    }
    // else if(this.cards.length == 6){
    //   console.log(this.cards);
    //   this.masterCardsArray.push(this.visaCardsArray);
    //   console.log(this.masterCardsArray);
    //   for(this.index1 = 0; this.index1 < this.visaCardsArray.length; this.index1++){
    //     this.visaCardsArray.toString(this.visaCardsArray[this.index1]);

    //     if(this.cards.includes(this.visaCardsArray[this.index1])){
    //       console.log(this.visaCardsArray[this.index1])
    //     }
    //   }
    //   console.log(this.cards.length);
    // }
    else{
      this.cardImage = 'data:image/svg+xml,%3Csvg%20width%3D%2234%22%20height%3D%2224%22%20viewBox%3D%220%200%2034%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2233%22%20height%3D%2223%22%20rx%3D%222.5%22%20fill%3D%22white%22%20stroke%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%2218%22%20width%3D%2212%22%20height%3D%221%22%20fill%3D%22%23B3B3B3%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2218%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%2225%22%20y%3D%2215%22%20width%3D%225%22%20height%3D%221.5%22%20fill%3D%22%237F7F7F%22%2F%3E%0A%3Crect%20x%3D%224%22%20y%3D%228%22%20width%3D%226%22%20height%3D%224%22%20rx%3D%221%22%20fill%3D%22%23B3B3B3%22%2F%3E%0A%3C%2Fsvg%3E%0A';
      this.cardNumberMessage = "Wrong Details";
      this.cardMessageColor = 'red';
    }
  }

  expiryCardCheck(expiryDateInput:any){
    // console.log(typeof y);
    // y.target.value.toString(y);
    this.expiryDateString = expiryDateInput.target.value;
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
    if(this.currentMonth <= this.userEnteredMonth || this.currentMonth >= this.userEnteredMonth){
      if(this.userEnteredYear >= this.getCurrentYear){
        if(this.currentMonth < this.userEnteredMonth){
          this.expiryDateMessage = "Success";
          this.expiryDateMessageColor = 'green';
          this.cvvNumberTrue = true;
        }
      }
      else if(this.userEnteredYear < this.getCurrentYear){
        if(this.userEnteredMonth > this.currentMonth){
          this.expiryDateMessage = "Expired";
          this.expiryDateMessageColor = 'red';
          // this.expiryDateMessage = [{message:"Expired"},{color:'red'}];//year expired
        }
      }
    }
    else{
      this.expiryDateMessage = "Expired";
      this.expiryDateMessageColor = 'red';
      // this.expiryDateMessage = [{message:"Expired"},{color:'red'}];//month expired
    }
  }

  checkPaymentValid(){
    if(this.cardNUmberTrue == true && this.cvvNumberTrue == true){
      this.router.navigate(['paymentsuccess']);
    }
    else{
      this.AL.Error("Please fill all details");
    }
  }
}
