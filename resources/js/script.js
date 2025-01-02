const rootElement = document.querySelector(':root');
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i');
const audio = document.querySelector('#bgm');
let isPlaying = false;

simplyCountdown('.simply-countdown', {
  year: 2025, // required
  month: 2, // required
  day: 1, // required
  hours: 9, // Default is 0 [0-23] integer
  words: {
    //words displayed into the countdown
    days: { singular: 'hari', plural: 'hari' },
    hours: { singular: 'jam', plural: 'jam' },
    minutes: { singular: 'menit', plural: 'menit' },
    seconds: { singular: 'detik', plural: 'detik' },
  },
});

const stickyTop = document.querySelector('.sticky-top');
const offCanvas = document.querySelector('.offcanvas');

offCanvas.addEventListener('show.bs.offcanvas', function () {
  stickyTop.style.overflow = 'visible';
});

offCanvas.addEventListener('hidden.bs.offcanvas', function () {
  stickyTop.style.overflow = 'hidden';
});

function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  }
  rootElement.style.scrollBehavior = 'auto';
}

function enableScroll() {
  window.onscroll = function () {  };
  rootElement.style.scrollBehavior = 'smooth';
  playAudio();
}

disableScroll();

function playAudio() {
  audio.volume = 0.017;
  audioIconWrapper.style.display = 'flex';
  audio.play();
  isPlaying = true;
}

function playOrPause() {
  if (isPlaying) {
    audioIcon.classList.add('fa-circle-play');
    audioIcon.classList.remove('fa-circle-pause');
    audio.pause();
  } else {
    audioIcon.classList.remove('fa-circle-play');
    audioIcon.classList.add('fa-circle-pause');
    audio.play();
  }

  isPlaying = !isPlaying;
}

window.addEventListener("load", function() {
  const form = document.getElementById('my-form');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Konfirmasi Kehadiran Berhasil Terkirim!");
    })
  });
});