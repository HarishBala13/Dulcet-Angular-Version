import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyServiceService {

  constructor() { }
  Success(message:any){
    alertifyjs.set("notifier","position","top-center");
    alertifyjs.success(message);
  }
  Error(message:any){
    alertifyjs.set("notifier","position","top-center");
    alertifyjs.error(message);
  }
  NotifyUser(username:string | null | undefined ,message:any){
    alertifyjs.set("notifier","position","top-center");
    alertifyjs.alert('Hey '+ username +'!'+'  You have Successfully Registered your Dulcet Account', message);
  }
  AlertUser(message:any){
    alertifyjs.alert(message);
  }
  ADService(){
    alertifyjs.set("notifier","position","top-center");
    alertifyjs.alert("Hi User! This is an simple Alert with an information to you that so far promoting commercial advertisements is strictly restricted");
  }
}
