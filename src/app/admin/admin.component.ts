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
  images = [];
  audios = [];

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
    audios:['',Validators.required],
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

   selectAudios(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files;
      this.audios = file;
    }
   }

   selectImages(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files;
      this.images = file;
    }
   }

   addSongs(add:any){
    const audioFormData = new FormData();
    for(let audio of this.audios){
      audioFormData.append('audioFiles', audio);
      console.log(this.audios);
    }

    const imageFormData = new FormData();
    for(let img of this.images){
      imageFormData.append('imageFiles',img)
    }

    this.client.post<any>("http://localhost:1999/audioUpload", audioFormData).subscribe((res) => console.log(res));

    this.client.post<any>("http://localhost:1999/imageUpload", imageFormData).subscribe((res) => console.log(res));

    this.API.addSongsServ(add).subscribe((values)=>{
      console.log(values);
    })
   }

    // onSubmit(){
    //   const formData = new FormData();
    //   for(let img of this.songsAssets){
    //     formData.append('files', img);
    //   }
    //   console.log(this.songsAssets);

    //   this.client.post<any>("http://localhost:1999/multipleFileUpload", formData).subscribe(
    //     (res) => console.log(res)
    //   )
    // }

   deleteSongs(ID:number){
    this.API.deleteSongsServ(ID).subscribe(()=>{});
   }
}
