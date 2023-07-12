import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {  interval, Subscription } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PremiumPlanServiceService {

  subscription:Subscription[]=[];

  orderConfirm:any=[];
  newDate:any=[];
  date:any=[];
  dateFormat:any=[];
  normaldateFormat:any=[];
  orderDate:any=[];


  orderCount=0;
  getOrderedDate:any=[];
  setOrderedDate:any=[];


  getOrderedDetails:any=[];
  setOrderedDetails:any=[];


  userMob:any=[];
  loggedPhonenumber:any=[];

  customerDetails:any=[];
  OrderDetails:any=[];


  intervalId:any;
  constructor(private http:HttpClient) { }


getTime(ordereddate:any){
  this.loggedPhonenumber = sessionStorage.getItem('isusername');
  this.userMob = JSON.parse(this.loggedPhonenumber);
  this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber).subscribe(x=>{
    this.customerDetails=x;
    this.setOrderedDetails=this.customerDetails.paymentOrderedDetails
    this.getOrderedDate=this.customerDetails.orderedDate
    ++this.orderCount;
  if(this.getOrderedDate==null){
    this.dateFormat=[ordereddate];
    this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{orderedDate:this.dateFormat}).subscribe(x=>{
      console.log(x);
     });;
  }
  else{
    this.getOrderedDate.push(ordereddate);
    this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{orderedDate:this.getOrderedDate}).subscribe(x=>{
      console.log(x);
     });;
  }
  this.startInterval();
});
}


startInterval(){
  setInterval(()=>{
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
  this.userMob = JSON.parse(this.loggedPhonenumber);
  this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber).subscribe(x=>{
    this.customerDetails=x;
    this.setOrderedDetails=this.customerDetails.paymentOrderedDetails
    this.getOrderedDate=this.customerDetails.orderedDate
    if(this.getOrderedDate!=null){
      this.date=new Date();
      this.normaldateFormat=formatDate(this.date.getTime(), 'dd-MMM-yyyy hh:mm:ss a','en-US','+0530');

      if(this.getOrderedDate[0]==this.normaldateFormat){
        if(this.setOrderedDetails.length>=0 && this.getOrderedDate.length>=0){
        this.getOrderedInfo(this.setOrderedDetails[0]);
        }
        this.setOrderedDetails.splice(0,1);
        this.getOrderedDate.splice(0,1);
        if(this.setOrderedDetails.length>=0 && this.getOrderedDate.length>=0){
          this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{paymentOrderedDetails:this.setOrderedDetails}).subscribe(x=>{
            console.log(x);
          });

        console.log(this.getOrderedDate);
          this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{orderedDate:this.getOrderedDate}).subscribe(x=>{
            console.log(x);
           });;
        }
      }

      // console.log(this.date.toString().slice(22,24));
    }


  });
  },1000);
}

getOrderedInfo(orderedInfo:any){
  console.log(orderedInfo);
    this.loggedPhonenumber = sessionStorage.getItem('isusername');
    this.userMob = JSON.parse(this.loggedPhonenumber);
    this.http.get("http://localhost:3000/customerDetails/"+this.userMob.phonenumber).subscribe(x=>{
      this.customerDetails=x;
      this.OrderDetails=this.customerDetails.Orders;

      if(this.OrderDetails==null || this.OrderDetails.length==0){
         this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{Orders:[orderedInfo]}).subscribe(x=>{
          console.log(x);
         });
      }
      else{
        this.OrderDetails.push(orderedInfo);
        this.http.patch("http://localhost:3000/customerDetails/"+this.userMob.phonenumber,{Orders:this.OrderDetails}).subscribe(x=>{
          console.log(x);
         });;
      }

    })
  }

}
