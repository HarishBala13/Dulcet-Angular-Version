import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  title:any="Dulcet";
  public values:any="";
  registeredUsers:number=0;
  vibes_data:any='';
  newsongs_data:any='';
  vibesboolean:boolean=false;
  newsongsboolean:boolean=false;
  usersboolean:boolean=false;
  currentUser:number=0;
  songsAssets = [];

  constructor(private formBuild:FormBuilder, private API:ApiService, private client:HttpClient) {  }
  ngOnInit(): void {
    this.client.get<any>("http://localhost:3000/usersregister").subscribe((userdata:any)=>{
      this.registeredUsers=userdata.length;
    });

    let userLoggedIn = sessionStorage.getItem("loggedin");
    if(userLoggedIn == "true"){
      this.currentUser = 1;
    }else{
      this.currentUser = 0;
    }
  }

  songsEntry=this.formBuild.group({
    assets:['',Validators.required],
    maintitle:['',Validators.required],
    subtitle:['',Validators.required]
   })

   vibesOpen(){
    this.vibesboolean=true;
    this.API.fetchVibes().subscribe(values=>{   this.vibes_data=values;   });
   }
   newSongsOpen(){
    this.newsongsboolean=true;
    this.API.fetchNewSongs().subscribe(values=>{  this.newsongs_data=values;  });
   }

   selectSongAssets(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files;
      this.songsAssets = file;
    }
   }

   addSongs(add:any){
    const formData = new FormData();
    for(let img of this.songsAssets){
      formData.append('files', img);
    }
    console.log(this.songsAssets);

    this.client.post<any>("http://localhost:1999/multipleFileUpload", formData).subscribe(
      (res) => console.log(res)
    )

    this.API.addSongsServ(add).subscribe((values)=>{
      console.log(values);
    })
   }

    onSubmit(){
      const formData = new FormData();
      for(let img of this.songsAssets){
        formData.append('files', img);
      }
      console.log(this.songsAssets);

      this.client.post<any>("http://localhost:1999/multipleFileUpload", formData).subscribe(
        (res) => console.log(res)
      )
    }

   deleteSongs(ID:number){
    this.API.deleteSongsServ(ID).subscribe(()=>{});
   }
}
