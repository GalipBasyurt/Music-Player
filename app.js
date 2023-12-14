let container = document.querySelector(".container");
let image = document.querySelector("#music-image");
let title = document.querySelector("#music-details #title");
let singer = document.querySelector("#music-details #singer");
let previous = document.querySelector("#controls #prev");
let play = document.querySelector("#controls #play");
let next = document.querySelector("#controls #next");
let duration = document.querySelector("#duration");
let currentTime = document.querySelector("#current-time");
let progressBar = document.querySelector("#progress-bar");
let volume = document.querySelector("#volume");
let volumeBar = document.querySelector("#volume-bar");
let ul = document.querySelector(".list-group");

let player = new MusicPlayer(musicList);

//* show

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusic(music) {
  title.textContent = music.getName();
  singer.textContent = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

//* Play
play.addEventListener("click", () => {
  let isMusicPlay = container.classList.contains("playing");
  isMusicPlay ? pauseMusic() : playMusic();
});

function pauseMusic() {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
}

function playMusic() {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
}

//* Previous

previous.addEventListener("click", () => prevMusic());

function prevMusic() {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
}

//* Next

next.addEventListener("click", () => nextMusic());

function nextMusic() {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
}

//* audio control

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

function calculateTime(totalSecond) {
  let minute = Math.floor(totalSecond / 60);
  let second = Math.floor(totalSecond % 60);
  let updatedSeconds = second < 10 ? `0${second}` : `${second}`;
  let result = `${minute}:${updatedSeconds}`;
  return result;
}

//* Duration Control

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

//* Audio Control
let muteState = "unmuted";
volume.addEventListener("click", () => {
  if (muteState === "unmuted") {
    audio.muted = true;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

volumeBar.addEventListener("input", (e) => {
  let value = e.target.value;
  audio.volume = value / 100;

  if (value == 0) {
    audio.muted = true;
    muteState = "muted";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    muteState = "unmuted";
    volume.classList = "fa-solid fa-volume-high";
  }
});

//* Display Music List

function displayMusicList(list) {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
        <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
         <span>${list[i].getName()}</span>
         <span id="music-${i}" class="badge rounded-pill text-bg-primary">3:49</span>
         <audio class="music-${i}" src = "mp3/${list[i].file}"></audio>
        </li>
      `;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudio = ul.querySelector(`.music-${i}`);

    liAudio.addEventListener("loadeddata", () => {
      liAudioDuration.textContent = calculateTime(liAudio.duration);
    });
  }
}

//* selected music

function selectedMusic(li) {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
}

const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};
