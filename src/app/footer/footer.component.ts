import { Component } from '@angular/core';
import { AlertifyServiceService } from '../alertify-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private AL:AlertifyServiceService){}
  advertise(){    this.AL.ADService();  }
}
