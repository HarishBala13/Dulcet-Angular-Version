import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerfileService {

  constructor(private _http:HttpClient) { }

  informationMessage(message:any, messagetype:string, messageDate:string){
    // console.log("Informationmessage");
    // console.log(message,messagetype,messageDate);
    this.activateLogger(message,messagetype,messageDate);
  }

  activateLogger(logMessage:string, logMessagetype:string, logMessageDate:string){
    // console.log("Activat Logger");
    const messageObject = {logMessage:logMessage,logMessagetype:logMessagetype,logMessageDate:logMessageDate};
    this.newFunction("http://localhost:1999/updateLogInexpress",messageObject).subscribe(()=>{});
  }

  newFunction(url:string, messageDetails:any){
    return this._http.post(url,messageDetails);
  }
}
