const currentTimeText = document.getElementById('current-time');
const hourInput = document.getElementById('hour-input');
const minInput = document.getElementById('min-input');
const secInput = document.getElementById('sec-input');
let interval = null;
const isTimerRunning = false;
let date = new Date();
const PRIMARY_COLOR = '#0275d8';
const DANGER_COLOR = 'rgb(217, 83, 79)';

const onComplete = () => {
  clearInterval(interval);
  currentTimeText.style.color = DANGER_COLOR;
  enableAllInputs();
};

const handleRestartTimer = () => {
  if (currentTimeText.style.color !== DANGER_COLOR) return;
  currentTimeText.style.color = PRIMARY_COLOR;
  interval = setInterval(() => {
    date = new Date();
    currentTimeText.innerText = formatDate(date);
  }, 500);
};

const startTimer = () => {
  handleRestartTimer();
  disableAllInputs();
  const timer =
    Number(hourInput.value) * 3600 +
    Number(minInput.value) * 60 +
    Number(secInput.value);
  // Oncomplete
  setTimeout(() => {
    onComplete();
  }, timer * 1000);
};

// Onhour input
hourInput.addEventListener('keyup', ({ which }) => {
  if (which === 13) {
    minInput.focus();
  }
});

minInput.addEventListener('keyup', ({ which }) => {
  if (which === 13) {
    secInput.focus();
  }
});

secInput.addEventListener('keyup', ({ which }) => {
  if (which === 13 && (minInput.value || secInput.value || hourInput.value)) {
    startTimer();
  }
});

// Onload
window.addEventListener('load', () => {
  hourInput.focus();
  currentTimeText.innerText = formatDate(date);
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    date = new Date();
    currentTimeText.innerText = formatDate(date);
  }, 500);
});

// utils
function formatDate(date) {
  return `${String(date.getHours()).padStart(2, '0')}h:${String(
    date.getMinutes()
  ).padStart(2, '0')}m:${String(date.getSeconds()).padStart(2, '0')}s`;
}

function disableAllInputs() {
  [hourInput, minInput, secInput].forEach((item) => {
    item.disabled = true;
  });
}

function enableAllInputs() {
  [hourInput, minInput, secInput].forEach((item) => {
    item.disabled = false;
  });
}
