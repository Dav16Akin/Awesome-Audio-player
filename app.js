let currentMusic = 0

const music = document.querySelector('#audio-source');


const songName = document.querySelector('.current-song-name');
const cover = document.querySelector('.cover');
const artist = document.querySelector('.artist-container');
const seekBar = document.querySelector('.music-seek-bar');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

// buttons

const backBtn = document.querySelector('i.fa-backward');
const forwardBtn = document.querySelector('i.fa-forward');
const pauseBtn = document.querySelector('i.fa-pause');
const playBtn = document.querySelector('i.fa-play');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlider = document.querySelector('.volume-slider');

// play button

playBtn.addEventListener ('click', ()=> {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

pauseBtn.addEventListener ('click', ()=> {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})


const playingSong = function(i) {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artist.innerHTML = song.artist;
    cover.src = song.cover;

    setTimeout(()=> {
        seekBar.min = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
} 

playingSong(1)

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0` + min;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0` + sec;
    }

    return `${min} : ${sec}`;
}

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    playingSong(currentMusic);
    playBtn.click();
})

backBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    playingSong(currentMusic);
    playBtn.click();
})

setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
        if(repeatBtn.classList.includes('active')){
            playingSong(currentMusic);
            playBtn.click();
        }
        else{
            forwardBtn.click();
        }
    }
}, 500);

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})




// repeat button

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})

// volume section

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})