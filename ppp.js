// Audio control
const audio = document.getElementById('birthdaySong');
const toggle = document.getElementById('musicToggle');
const label = toggle?.querySelector('.label');

let isPlaying = false;

async function startMusic() {
  try {
    await audio.play();
    isPlaying = true;
    if (label) label.textContent = 'Jeda lagu';
    toggle?.classList.add('active');
    launchConfetti(45);
  } catch (err) {
    console.warn('Autoplay diblokir, minta interaksi pengguna:', err);
  }
}

function pauseMusic() {
  audio.pause();
  isPlaying = false;
  if (label) label.textContent = 'Putar lagu';
  toggle?.classList.remove('active');
}

toggle?.addEventListener('click', () => {
  if (!isPlaying) {
    startMusic();
  } else {
    pauseMusic();
  }
});

// Confetti generator
const confettiRoot = document.getElementById('confetti');
const colors = ['#f7a6ff', '#7dd3fc', '#ffd166', '#9b8cff', '#8affc1'];

function createPiece() {
  const piece = document.createElement('span');
  piece.className = 'confetti-piece';
  const size = Math.random() * 6 + 6;
  const startX = Math.random() * 100;
  const moveX = (Math.random() * 60 - 30) + 'px';
  const duration = Math.random() * 1.5 + 1.8;
  piece.style.width = `${size}px`;
  piece.style.height = `${size * 1.6}px`;
  piece.style.left = `${startX}%`;
  piece.style.background = colors[Math.floor(Math.random() * colors.length)];
  piece.style.animationDuration = `${duration}s`;
  piece.style.setProperty('--x-move', moveX);

  confettiRoot.appendChild(piece);

  setTimeout(() => {
    piece.remove();
  }, duration * 1000 + 200);
}

function launchConfetti(count = 30) {
  for (let i = 0; i < count; i++) {
    setTimeout(createPiece, i * 25);
  }
}

// Auto-start confetti once as greeting
window.addEventListener('load', () => {
  launchConfetti(35);
});
