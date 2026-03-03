// ===== Cronômetro flutuante (toggle) =====
document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('timerDisplay');
  const btnToggle = document.getElementById('timerToggle');
  const btnReset = document.getElementById('timerReset');

  // Se o HTML do timer não existir nessa página, sai fora sem drama.
  if (!display || !btnToggle || !btnReset) return;

  let intervalId = null;
  let elapsedMs = 0;
  let running = false;
  let lastTick = 0;

  const format = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  };

  const render = () => { display.textContent = format(elapsedMs); };

  const setToggleUi = () => {
    if (running) {
      btnToggle.textContent = '⏸️';
      btnToggle.setAttribute('aria-label', 'Pausar');
      btnToggle.setAttribute('title', 'Pausar');
    } else {
      btnToggle.textContent = '▶️';
      btnToggle.setAttribute('aria-label', 'Iniciar');
      btnToggle.setAttribute('title', 'Iniciar');
    }
  };

  const start = () => {
    if (running) return;
    running = true;
    lastTick = Date.now();
    intervalId = setInterval(() => {
      const now = Date.now();
      elapsedMs += (now - lastTick);
      lastTick = now;
      render();
    }, 200);
    setToggleUi();
  };

  const pause = () => {
    if (!running) return;
    running = false;
    clearInterval(intervalId);
    intervalId = null;
    render();
    setToggleUi();
  };

  const toggle = () => (running ? pause() : start());

  const reset = () => {
    running = false;
    clearInterval(intervalId);
    intervalId = null;
    elapsedMs = 0;
    render();
    setToggleUi();
  };

  btnToggle.addEventListener('click', toggle);
  btnReset.addEventListener('click', reset);

  render();
  setToggleUi();
});
