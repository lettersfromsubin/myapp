const drawBtn = document.getElementById("drawBtn");
const redrawBtn = document.getElementById("redrawBtn");
const mainNumbersEl = document.getElementById("mainNumbers");
const bonusNumberEl = document.getElementById("bonusNumber");
const historyListEl = document.getElementById("historyList");
const drawCountEl = document.getElementById("drawCount");
const resultMessageEl = document.getElementById("resultMessage");

const history = [];
let drawCount = 0;
let drawTimer = null;

function getBallClass(number) {
  if (number <= 10) return "range-low";
  if (number <= 20) return "range-mid";
  if (number <= 30) return "range-high";
  if (number <= 40) return "range-top";
  return "range-max";
}

function createBall(number, extraClass = "") {
  const ball = document.createElement("div");
  ball.className = `lotto-ball ${extraClass} ${getBallClass(number)}`.trim();
  ball.textContent = number;
  return ball;
}

function formatTimestamp(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

function pickUniqueNumbers() {
  const pool = Array.from({ length: 45 }, (_, index) => index + 1);

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }

  const mainNumbers = pool.slice(0, 6).sort((a, b) => a - b);
  const bonusNumber = pool[6];

  return { mainNumbers, bonusNumber };
}

function resetStageForAnimation() {
  if (drawTimer) {
    clearTimeout(drawTimer);
    drawTimer = null;
  }

  mainNumbersEl.innerHTML = "";
  bonusNumberEl.textContent = "?";
  bonusNumberEl.className = "lotto-ball bonus-ball placeholder";
}

function renderHistory() {
  if (history.length === 0) {
    historyListEl.innerHTML = '<li class="empty-history">아직 추첨 기록이 없습니다.</li>';
    return;
  }

  historyListEl.innerHTML = "";

  history.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "history-item";

    const top = document.createElement("div");
    top.className = "history-top";

    const round = document.createElement("span");
    round.className = "history-round";
    round.textContent = `${entry.round}회 추첨`;

    const time = document.createElement("span");
    time.className = "history-time";
    time.textContent = entry.time;

    top.append(round, time);

    const balls = document.createElement("div");
    balls.className = "history-balls";

    entry.mainNumbers.forEach((number) => {
      balls.append(createBall(number));
    });

    balls.append(createBall(entry.bonusNumber, "bonus-ball"));

    item.append(top, balls);
    historyListEl.append(item);
  });
}

function setButtonsDisabled(disabled) {
  drawBtn.disabled = disabled;
  redrawBtn.disabled = disabled;
}

function animateDrawResult(mainNumbers, bonusNumber) {
  resetStageForAnimation();
  setButtonsDisabled(true);
  resultMessageEl.textContent = "추첨 중입니다. 행운의 번호를 섞는 중...";

  mainNumbers.forEach((number, index) => {
    window.setTimeout(() => {
      const ball = createBall(number, "draw-pop");
      mainNumbersEl.append(ball);
    }, index * 180);
  });

  drawTimer = window.setTimeout(() => {
    bonusNumberEl.textContent = bonusNumber;
    bonusNumberEl.className = "lotto-ball bonus-ball draw-pop";
    resultMessageEl.textContent = `오름차순 번호 6개와 보너스 번호가 생성되었습니다.`;
    setButtonsDisabled(false);
    drawTimer = null;
  }, mainNumbers.length * 180 + 180);
}

function handleDraw() {
  const { mainNumbers, bonusNumber } = pickUniqueNumbers();
  drawCount += 1;
  drawCountEl.textContent = `총 ${drawCount}회 추첨`;

  animateDrawResult(mainNumbers, bonusNumber);

  history.unshift({
    round: drawCount,
    mainNumbers,
    bonusNumber,
    time: formatTimestamp(new Date())
  });

  if (history.length > 8) {
    history.pop();
  }

  renderHistory();
}

drawBtn.addEventListener("click", handleDraw);
redrawBtn.addEventListener("click", handleDraw);
