import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  getVisaCardBINNumber(){
    return this.http.get("http://localhost:3000/Visa");
  }
  getMasterCardsBINNumber(){
    return this.http.get("http://localhost:3000/Mastercard")
  }
}
