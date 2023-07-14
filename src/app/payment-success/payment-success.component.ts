import { Component } from '@angular/core';
import { SongsService } from '../songs.service';
import { PremiumPlanServiceService } from '../premiumPlanService.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {
  userSubscribedPlan:any='';
  subscribedPlan:any=''
  subscribedOffer:any='';
  subscribedAmount:any='';
  username:any=';'
  constructor(private premiumService:PremiumPlanServiceService){
    premiumService.userSubscribedPremiumPlan().subscribe(values => {
      this.userSubscribedPlan = values;
      console.log(this.userSubscribedPlan)
      this.subscribedPlan = this.userSubscribedPlan.subscribedPlans[0].plans.title;
      this.subscribedOffer = this.userSubscribedPlan.subscribedPlans[0].plans.offer;
      this.subscribedAmount = this.subscribedOffer.slice(0,4);
      this.username = this.userSubscribedPlan.regname;
    })

  }
}
