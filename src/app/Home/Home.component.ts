import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SongsService } from '../songs.service';
import { UserregisterService } from '../userregister.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  logout=false;
  login=true;
  vibes_value:any="";
  new_songs_values:any='';
  openBottomSongTrack:boolean=false;
  audiosrc:string='';
  imagepath:string='';
  maintitle:string='';
  subtitle:string='';

  // images = [
  //   { img: "/assets/images/singers/yuvancoat.jpeg" },
  //   { img: "/assets/images/singers/andrea.jpg" },
  //   { img: "/assets/images/singers/anirudh.jpg" },
  //   { img: "/assets/images/singers/ar-rahman.jpg" },
  //   { img: "/assets/images/singers/ilayaraja.jpg" },
  //   { img: "/assets/images/singers/jonita gandhi.jpg" },
  //   { img: "/assets/images/singers/k_s_chithra.jpg" },
  //   { img: "/assets/images/singers/shreya-ghoshal.jpg" },
  //   { img: "/assets/images/singers/Shweta_Mohan.jpg" },
  //   { img: "/assets/images/singers/spb.jpg" },
  //   { img: "/assets/images/singers/vaali.jpg" }
  // ];

  // slideConfig = {
  //   "slidesToShow": 3,
  //   "slidesToScroll": 1,
  //   "autoplay":true,
  //   "autoplaySpeed":1000,
  // };


  public item:any="";
  constructor(private songService:SongsService, private userService:UserregisterService,private client:HttpClient) {

    this.songService.dulcetassets().subscribe((values=>{
      this.item=values;
    }));

    songService.vibesassets().subscribe(vibesvalues=>{
      this.vibes_value=vibesvalues;
    });

    songService.newsongsassets().subscribe(newsongsvalue=>{
      this.new_songs_values=newsongsvalue;
    });

  }
  ngOnInit() {}

  playAudio(audioObject:any){
    this.openBottomSongTrack=true;
    this.audiosrc=audioObject['audios'];
    this.imagepath=audioObject['images'];
    this.maintitle=audioObject['maintitle'];
    this.subtitle=audioObject['subtitle'];
    let audio = new Audio();
    audio.src=audioObject['audios'];
    audio.play();
    console.log(audioObject['audios']);
  }

  currentSong(){}

    // addPlaylist(){
  // this.client.get<any>("http://localhost:3000/usersregister").subscribe((datas)=>{
  //   const checkuser=datas.find((results:any)=>{
  //     return results.regemail;
  //   })
  //   if(checkuser){
  //     console.log("user found");
  //   }
  //   else{
  //     console.log("user not found")
  //   }
  // })
  // }

}
