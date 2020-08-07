const videoPlayer = document.querySelector(".videoPlayer"),
  videoBox = document.querySelector(".video"),
  timeline = document.querySelector(".timeline"),
  timelineJuice = document.querySelector(".timeline-juice"),
  controlBtnBox = document.querySelector(".control-btn-box"),
  pauseBtn = document.querySelector(".pause-btn"),
  playBtn = document.querySelector(".play-btn"),
  currentSpan = document.querySelector("#currenttime"),
  durationSpan = document.querySelector("#durationtime"),
  fullscreenBtn = document.querySelector(".fullscreen-btn"),
  volumeIcon = document.querySelector(".volume-icon"),
  volumeLine = document.querySelector(".volume-line"),
  volumeLineJuice = document.querySelector(".volume-line-juice");

function toggler() {
  if (videoPlayer.paused) {
    pauseBtn.classList.add("active");
    pauseBtn.classList.remove("hide");
    playBtn.classList.add("hide");
    playBtn.classList.remove("active");
    videoPlayer.play();
  } else {
    pauseBtn.classList.add("hide");
    pauseBtn.classList.remove("active");
    playBtn.classList.add("active");
    playBtn.classList.remove("hide");
    videoPlayer.pause();
  }
}

let addZero = (n) => (n < 10 ? "0" + n : n);

function progressSet() {
  let timelineWidth = this.offsetWidth;
  let prog = event.offsetX;
  timelineJuice.style.width = (prog / timelineWidth) * 100 + "%";
  videoPlayer.currentTime = (prog / timelineWidth) * videoPlayer.duration;
}

currentSpan.innerHTML =
  addZero(Math.floor(videoPlayer.currentTime / 60)) +
  ":" +
  addZero(Math.floor(videoPlayer.currentTime % 60));
durationSpan.innerHTML =
  addZero(Math.floor(videoPlayer.duration / 60)) +
  ":" +
  addZero(Math.floor(videoPlayer.duration % 60));

videoPlayer.addEventListener("timeupdate", function () {
  timelineJuice.style.width =
    (videoPlayer.currentTime / videoPlayer.duration) * 100 + "%";
  currentSpan.innerHTML =
    addZero(Math.floor(videoPlayer.currentTime / 60)) +
    ":" +
    addZero(Math.floor(videoPlayer.currentTime % 60));
  durationSpan.innerHTML =
    addZero(Math.floor(videoPlayer.duration / 60)) +
    ":" +
    addZero(Math.floor(videoPlayer.duration % 60));
});

controlBtnBox.addEventListener("click", toggler);

videoPlayer.addEventListener("click", toggler);

timeline.addEventListener("click", progressSet);

volumeIcon.addEventListener("click", function () {
  if (!volumeLine.classList.contains("shown")) {
    volumeLine.style.transform = "translateX(-10%)";
    volumeLine.classList.add("shown");
  } else {
    volumeLine.style.transform = "translateX(300%)";
    volumeLine.classList.remove("shown");
  }
});

volumeLine.addEventListener("click", function () {
  let timelineWidth = this.offsetWidth;
  let prog = event.offsetX;
  volumeLineJuice.style.width = (prog / timelineWidth) * 100 + "%";
  videoPlayer.volume = prog / timelineWidth;
});
