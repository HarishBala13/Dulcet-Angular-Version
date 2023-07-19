import { Component } from '@angular/core';
import { PremiumPlanServiceService } from '../premiumPlanService.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-subscribedplan',
  templateUrl: './subscribedplan.component.html',
  styleUrls: ['./subscribedplan.component.css']
})
export class SubscribedplanComponent {

  expiryDate : any = '';
  expiryYear : any = '';
  expiryMonth : number = 4;
  userSubscribedDate : any = '';
  newvalues : any = '';
  userPremiumPlan : any = '';
  planTitle : any = '';
  planOffer : any ='';
  price : any = '';
  removeYearFromUserSubscribedDate : any = '';
  removeMonthFromUserSubscribedDate : any = '';
  splitYearFromUserSubscribedDate : any = '';
  splitMonthFromUserSubscribedDate : any = '';
  expiredMonthFromUserSubscribedDate : any = '';
  date : any = '';
  today : any = '';

  public monthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  constructor(private premiumService:PremiumPlanServiceService, private paymentService:PaymentService){

    this.date = new Date();
    this.today = this.date.toDateString();

    this.paymentService.getUserDetails().subscribe(values => {
      this.newvalues = values;
      this.userPremiumPlan = this.newvalues.paymentCard;
      this.userSubscribedDate = this.userPremiumPlan[0].premiumPlanPurchasedDate.slice(4);
      this.planTitle = this.userPremiumPlan[0].premiumPlanTitle;
      this.planOffer = this.userPremiumPlan[0].premiumPlanOffers;
      this.price = this.planOffer.slice(0,4);

      if(this.planOffer.slice(5) == "year"){

        this.removeYearFromUserSubscribedDate = this.userSubscribedDate.slice(0,7);

        this.removeMonthFromUserSubscribedDate = this.userSubscribedDate.slice(3);

        this.splitYearFromUserSubscribedDate = this.userSubscribedDate.slice(7);

        this.expiryYear = parseInt(this.splitYearFromUserSubscribedDate) + 1;

        this.expiryDate = this.removeYearFromUserSubscribedDate + "" + this.expiryYear;

      }
      else if(this.planOffer.slice(5) == "month"){

        this.splitMonthFromUserSubscribedDate = this.userSubscribedDate.slice(0,3);

        for(var i = 0; i < this.monthArray.length; i++){

          if(this.monthArray[i] == this.splitMonthFromUserSubscribedDate){

            this.expiredMonthFromUserSubscribedDate = this.monthArray[i];

            this.splitYearFromUserSubscribedDate = this.userSubscribedDate.slice(7);

            this.expiryDate = this.expiredMonthFromUserSubscribedDate + "" + this.splitYearFromUserSubscribedDate;

          }
         }
      }
    })


    this.premiumService.userSubscribedPremiumPlan().subscribe(values => {
      this.newvalues = values;
      this.userPremiumPlan = this.newvalues.subscribedPlans;
      this.planTitle = this.userPremiumPlan[0].plans.title;
      this.planOffer = this.userPremiumPlan[0].plans.offer;
      this.price = this.planOffer.slice(0,4);
    });
  }
}
