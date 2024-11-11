simplyCountdown('.simply-countdown', {
  year: 2025, // required
  month: 2, // required
  day: 1, // required
  hours: 8, // Default is 0 [0-23] integer
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

const rootElement = document.querySelector(':root');

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
  localStorage.setItem('opened', 'true');
}

if (!localStorage.getItem('opened')) {
  disableScroll();  
}