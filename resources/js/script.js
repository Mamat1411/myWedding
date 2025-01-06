const spreadsheetId = '1xrrAZMsRQ1Qwuk9BhZFJi1y7Dtq-ck-DOw5Gx77orhQ';
const apiKey = 'AIzaSyBqzgVml_Hcml9ve61g-OLapkB2SU3Dpsc';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`;

const rootElement = document.querySelector(':root');
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i');
const audio = document.querySelector('#bgm');
let isPlaying = false;

async function fetchSheetData() {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      displayData(data.values); // Pass rows to the display function
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

function displayData(rows) {
  const sheetDataDiv = document.getElementById("messages");

  if (rows && rows.length > 0) {
      // Assume the first row contains headers, so skip it
      const [headers, ...dataRows] = rows;

      // Loop through the rows and create elements
      dataRows.forEach(row => {
          // Create an <h4> for "Name" and "Age"
          const heading = document.createElement("h4");
          heading.textContent = `${row[1]} (${row[3]})`; // e.g., "John (25 years old)"
          sheetDataDiv.appendChild(heading);

          // Create a <p> for "City"
          const paragraph = document.createElement("p");
          paragraph.textContent = row[4]; // e.g., "New York"
          sheetDataDiv.appendChild(paragraph);
      });
  } else {
      sheetDataDiv.textContent = "No data found in the sheet.";
  }
}

fetchSheetData();

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
  audio.volume = 0.05;
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

function copyToClipboard(button) {
  let buttonContents = button.closest('.list-group-item');
  const matched = buttonContents.textContent.trim().match(/\d+/);
  const copied = matched ? matched[0] : '';
  
  if (copied) {
    navigator.clipboard.writeText(copied)
    .then(() => {
      // Add Bootstrap tooltip attributes dynamically
      button.setAttribute('data-bs-toggle', 'tooltip');
      button.setAttribute('data-bs-placement', 'top');
      button.setAttribute('title', 'Copied!');

      // Initialize and show the tooltip
      const tooltip = new bootstrap.Tooltip(button);
      tooltip.show();

      // Cleanup the tooltip after 2 seconds
      setTimeout(() => {
          tooltip.dispose(); // Remove the tooltip
          button.removeAttribute('data-bs-toggle'); // Optional: Remove the attributes
          button.removeAttribute('title');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
  });
  } else {
    console.log('error');
  }
}

window.addEventListener("load", function() {
  const form = document.getElementById('my-form');
  const submitButton = document.querySelector('#my-form button');
  const messageForm = document.getElementById('messages');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    submitButton.disabled = true;
    const originalButton = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Menyimpan...';
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButton;
      alert("Konfirmasi Kehadiran dan Ucapan Berhasil Terkirim!");
      messageForm.innerHTML = '';
      fetchSheetData();
    })
  });
});

const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('n') || '';
const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i';
const guestSpan = document.querySelector('.hero h4 span');
guestSpan.innerText = `${pronoun} ${guest},`;

document.querySelector('#name').value = guest;