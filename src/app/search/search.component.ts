import { Component } from '@angular/core';
import { SongsService } from '../songs.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchString:any='';
  searchBoxes:any='';
  constructor(private songServices:SongsService){
    this.songServices.searchBoxes().subscribe(values =>{
      this.searchBoxes = values;
    })
  }

  public keywords = [
    {artistName:'Harris Jeyaraj'},
    {artistName:'Anirudh Ravichander'},
    {artistName:'G.V.Prakash'},
    {artistName:'Santhosh Narayanan'},
    {artistName:'Vijay Antony'},
    {artistName:'Yuvan shankar raja'},
    {artistName:'Vijay'},
    {artistName:'Rahman'}
  ];


  // search(){
  //   let inputBox = document.getElementById('input-box');
  //   let resultBox = document.getElementById('result-box');
  //   let result = [];
  //   let input:any = inputBox;
  //   if(input.length){
  //     result = this.keywords.filter((keyword) => {
  //       return keyword.toLowerCase().includes(input.toLowerCase());
  //     });
  //     console.log(result);
  //   }
  // }


  // searchMusic(){
  //   this.spotifyService.searchMusic(this.searchString).subscribe((res:any) =>{
  //     console.log(res.artists.items);
  //   })
  //   console.log(this.searchString);
  // }
}
