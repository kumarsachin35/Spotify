console.log("Welcome to spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [{songName: "Legion : It's Always Blue" , filePath: "songs/1.mp3" ,coverPath: "covers/1.jpg"},
{songName: "Trap : Cartel" , filePath: "songs/2.mp3" ,coverPath: "covers/2.jpg"},
 {songName: "They Mad" , filePath: "songs/3.mp3" ,coverPath: "covers/3.jpg"},
 {songName: "Rich The Kid" , filePath: "songs/4.mp3" ,coverPath: "covers/4.jpg"},
 {songName: "Song Title" , filePath: "songs/5.mp3" ,coverPath: "covers/5.jpg"},
 {songName: "The Safety Dance" , filePath: "songs/6.mp3" ,coverPath: "covers/6.jpg"},
 {songName: "Back It Up" , filePath: "songs/7.mp3" ,coverPath: "covers/7.jpg"},
 {songName: "Shape of You" , filePath: "songs/8.mp3" ,coverPath: "covers/8.jpg"},
]

// audioElement.play();

//play pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

songItem.forEach((element,i)=>{
    console.log(element,i);
    document.getElementsByTagName("img")[0].src = songs[i].filePath;
})



//Event listener
audioElement.addEventListener('timeupdate', ()=> {
    // console.log('timeupdate');
    //update seek bar
    progress = parseInt ((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress; 
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click',(e)=>{
    console.log(e.target);
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play');
    e.target.classList.add('fa-pause');
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;
    })
    
});

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterSongName.innerText = songs[songIndex-1].songName;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.play(); 
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})