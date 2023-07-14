import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  jsonID:any='';
  paymentDetails:any=[];
  paymentInfo:any='';
  paymentValues:any='';

  constructor(private http:HttpClient) {
    this.jsonID = sessionStorage.getItem("currentUserJSONID");
    console.log("paymentservie "+this.jsonID)
  }

  getVisaCardBINNumber(){
    return this.http.get("http://localhost:3000/Visa");
  }

  getMasterCardsBINNumber(){
    return this.http.get("http://localhost:3000/Mastercard")
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
    this.http.patch("http://localhost:3000/usersregister/"+this.jsonID, {paymentCard: [this.paymentDetails]}).subscribe(values => {console.log(values)});
  }

  getUserPaymentCardDetails(){
    return this.http.get("http://localhost:3000/usersregister/"+this.jsonID);
  }

  getStates(){
    return this.http.get("http://localhost:3000/states");
  }

  deleteUserPaymentCard(){
    return this.http.patch("http://localhost:3000/usersregister/"+this.jsonID, {paymentCard: []}).subscribe(values => {});
  }
}
