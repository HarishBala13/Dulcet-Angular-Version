let previous=document.getElementById("previous");
let play=document.getElementById("play");
let next=document.getElementById("next");

let slider=document.getElementById("seek");
let masterplay=document.getElementById('master');

let title=document.getElementById("title");
let subtitle=document.getElementById("subtitle");

let timer;
let autoplay = 1;
let playingsong = false;
let index=0;
let track=document.createElement('audio');

let songpath='';
let songimage="";
let moviename='';
let songname='';
let songid='';
    function asideSongs(x){
        comma=x.alt.indexOf(",");
        songimage=x.alt.slice(0,comma);
        console.log("Image Path : "+songimage);

        semicolon=x.alt.indexOf(";");
        songpath=x.alt.slice(comma+1,semicolon);
        console.log("Song Path : "+songpath);

        underscore=x.alt.indexOf("_");
        songname=x.alt.slice(semicolon+1,underscore);
        console.log("Song name : "+songname);

        moviename=x.alt.slice(underscore+1);
        console.log("Movie name : "+moviename);

        loadtrack();
        currentSong();
        }
    function loadtrack(){
        clearInterval(timer);
        resetSlider();
        track.src=songpath;
        document.getElementById("poster_master_play").src=songimage;
        document.getElementById("title").innerText=songname;
        document.getElementsByClassName("subtitle").innerText=moviename;
        timer = setInterval(slider,1000);
    }
    
    function currentSong(){
        if(playingsong == false){
            playsong();
        }
        else{
            pausesong();
        }
    }

    function resetSlider(){
        slider.value=0;
    }
    function playsong(){
        track.play();
        playingsong=true;
        play.innerHTML=`<i class="bi bi-pause-fill"></i>`;
    }
    function pausesong(){
        track.pause();
        playingsong=false;
        play.innerHTML=`<i class="bi bi-play-fill"></i>`;
    }
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

    function changeDuration(){
        slider_position = track.seek * (slider.value/100);
        track.currentTime = slider_position;
    }
