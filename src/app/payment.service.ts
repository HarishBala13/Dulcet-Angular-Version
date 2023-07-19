import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  jsonID:any='';
  emailID:any='';
  userName:any='';
  paymentDetails:any=[];
  paymentDetailsEmail:any='';
  paymentInfo:any='';
  paymentValues:any='';

  constructor(private _http:HttpClient,private router:Router) {
    this.emailID = sessionStorage.getItem("currentUserEmail");
    this.userName = sessionStorage.getItem("currentUserName");
    this.jsonID = sessionStorage.getItem("currentUserJSONID");
  }

  getVisaCardBINNumber(){
    return this._http.get("http://localhost:3000/Visa");
  }

  getMasterCardsBINNumber(){
    return this._http.get("http://localhost:3000/Mastercard")
  }

  userPaymentDetails(expiryDate:any,cardName:any,cardNumber:any,cardHolderName:any,cardImage:any,purchasedDate:any,planTitle:any,plansOffer:any,planPrice:any,state:any,premiumPurchasedDateWithTime:any){
    this.paymentDetails = {
      cardExpiryDate: expiryDate,
      cardType: cardName,
      cardNumber: 'XXXX XXXX '+cardNumber.slice(12),
      cardHolderName: cardHolderName,
      cardImage: cardImage,
      premiumPlanPurchasedDate: purchasedDate,
      premiumPlanPurchasedDateWithTime : premiumPurchasedDateWithTime,
      premiumPlanTitle: planTitle,
      premiumPlanOffers: plansOffer,
      premiumPlanPrice: planPrice,
      userState: state
    }
    this._http.patch("http://localhost:3000/usersregister/"+this.jsonID, {paymentCard: [this.paymentDetails]}).subscribe( () => {});

    this.paymentDetailsEmail = {
      userEmail : this.emailID,
      userName : this.userName,
      premiumPlanPurchasedDateWithTime : premiumPurchasedDateWithTime,
      premiumPlanTitle : planTitle,
      premiumPlanOffers : plansOffer,
      premiumPlanPrice : planPrice
    }

    this.sendRegisteredPremiumPlanEmail("http://localhot:1999/sendRegisteredPremiumPlanEmail",this.paymentDetailsEmail);
  }

  getUserDetails(){
    return this._http.get("http://localhost:3000/usersregister/"+this.jsonID);
  }

  getStates(){
    return this._http.get("http://localhost:3000/states");
  }

  sendRegisteredPremiumPlanEmail(url:any, userData:any){
    return this._http.post(url,userData);
  }

  deleteUserPaymentCard(){
    return this._http.patch("http://localhost:3000/usersregister/"+this.jsonID, {paymentCard: []}).subscribe( () => {
    this.router.navigateByUrl('profile/paymentcard').then( () => {
      location.reload();
    })
    });
  }
}
