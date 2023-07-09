import { Component } from '@angular/core';
import { SongsService } from '../songs.service';
import { UserregisterService } from '../userregister.service';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent {

  premiumPlansJSON:any;
  name:any='';
  id:any='';
  constructor(userService:UserregisterService,private songService:SongsService){
    this.name = userService.currentUserProfileName;
    this.id = sessionStorage.getItem("currentUserJSONID");
    this.songService.premiumPlansService().subscribe(plans => {
      this.premiumPlansJSON = plans;
      console.log(plans);
    })
  }

  subscribeOffer(premiumPlans:any){
    this.songService.subscribePremiumPlans(premiumPlans,this.id);
  }

}
