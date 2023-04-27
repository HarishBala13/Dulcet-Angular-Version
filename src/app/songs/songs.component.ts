import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {
item:any="";
  constructor(private client:HttpClient) {
    this.client.get("http://localhost:3000/songs_list").subscribe(values=>{
      this.item=values;
    })
  }

  ngOnInit() {
  }

}
