function doFirst() {
  // 先跟 HTML 畫面產生關聯
  myMovie = document.getElementById("myMovie");
  playButton = document.getElementById("playButton");
  defaultBar = document.getElementById("defaultBar");
  progress = document.getElementById("progress");
  stopButton = document.getElementById("stopButton");
  upButton = document.getElementById("upButton");
  downButton = document.getElementById("downButton");
  mutedButton = document.getElementById("mutedButton");

  myMovie.volume = 0.5;
  // barsize = 635
  // JS 直接去讀取某物件的 CSS 屬性值: window.getComputedStyle(某物件).屬性
  barsize = parseInt(window.getComputedStyle(defaultBar).width);
  // alert(barsize)

  // 再建事件聆聽功能
  playButton.addEventListener("click", playOrPause);
  defaultBar.addEventListener("click", clickedBar);
  stopButton.addEventListener("click", stopVideo);
  upButton.addEventListener("click", volumeUp);
  downButton.addEventListener("click", volumeDown);
  mutedButton.addEventListener("click", muteVolume);

  // 全螢幕
  // fullButton.addEventListener('click',function(){
  //     myMovie.webkitEnterFullScreen()
  // })
}
function playOrPause() {
  if (!myMovie.paused && !myMovie.ended) {
    // 影片正在跑(影片既非暫停『且』非結束)
    myMovie.pause();
    playButton.innerText = "play";
  } else {
    // 影片暫停中『或』結束了
    myMovie.play();
    playButton.innerText = "pause";
    // setInterval(某函數, 多少毫秒)
    setInterval(update, 300);
  }
}
function update() {
  if (!myMovie.ended) {
    let size = (barsize / myMovie.duration) * myMovie.currentTime;
    progress.style.width = `${size}px`;
  } else {
    progress.style.width = `0px`;
    playButton.innerText = "play";
    myMovie.currentTime = 0;
  }
}
function clickedBar(e) {
  let mouseX = e.clientX - defaultBar.offsetLeft;
  progress.style.width = `${mouseX}px`;

  let newTime = mouseX / (barsize / myMovie.duration);
  myMovie.currentTime = newTime;
}
function stopVideo() {
  progress.style.width = `0px`;
  myMovie.currentTime = 0;
  playButton.innerText = "play";
  myMovie.pause();
}
function volumeUp() {
  if (myMovie.volume != 1.1) {
    myMovie.volume += 0.1;
  } else {
    myMovie.volume = 1.1;
  }
}
function volumeDown() {
  if (myMovie.volume != 0) {
    myMovie.volume -= 0.1;
  } else {
    myMovie.volume = 0;
  }
}
function muteVolume() {
  if (!myMovie.muted) {
    myMovie.muted=true;
    mutedButton.innerText = "unmute";
  } else {
    myMovie.muted = false
    mutedButton.innerText = "muted";
    // myMovie.volume = ${currentVolume};
  }
}
window.addEventListener("load", doFirst);

// 635px / 92sec ---> 6.9px/sec
// barsize / myMovie.duration ---> 6.9px/sec

// 假設跑到第 10 秒 ---> 6.9px/sec * 10sec ---> 69px
// 假設跑到第 10 秒 ---> 6.9px/sec * myMovie.currentTime ---> 69px
