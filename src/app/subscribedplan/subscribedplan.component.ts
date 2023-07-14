import { Component } from '@angular/core';
import { PremiumPlanServiceService } from '../premiumPlanService.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-subscribedplan',
  templateUrl: './subscribedplan.component.html',
  styleUrls: ['./subscribedplan.component.css']
})
export class SubscribedplanComponent {

  date:any='';
  today:any='';
  newvalues:any='';
  userPremiumPlan:any='';
  planTitle:any='';
  planOffer:any='';
  price:any='';
  
  constructor(private premiumService:PremiumPlanServiceService, private paymentService:PaymentService){
    this.date = new Date();
    this.today = this.date.toDateString();

    premiumService.userSubscribedPremiumPlan().subscribe(values => {
      this.newvalues = values;
      this.userPremiumPlan = this.newvalues.subscribedPlans;
      this.planTitle = this.userPremiumPlan[0].plans.title;
      this.planOffer = this.userPremiumPlan[0].plans.offer;
      this.price = this.planOffer.slice(0,4);
    });

  }

}
