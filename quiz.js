const normalNora = "Aのらノーマル.png";
const happyNora = "Bのら万歳.png";
const worryNora = "Eのら焦り.png";

let selectedQuizzes = [];
let currentQuiz = 0;
let score = 0;

let wrongQuizzes = [];

let currentStage = "beginner";
let currentStageLabel = "はじめて編";
let retryFunctionName = "startBeginner";

const bestRecords = JSON.parse(
  localStorage.getItem("bestRecords")
) || {
  beginner: { score: 0, badge: "" },
  hall: { score: 0, badge: "" }
};

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function jumpNora() {
  const nora = document.getElementById("norachan");
  nora.classList.remove("jump");
  void nora.offsetWidth;
  nora.classList.add("jump");
}

function changeNora(imageName) {
  document.getElementById("norachan").src = imageName;
}

function tapNora() {
  jumpNora();
  changeNora(normalNora);

  document.getElementById("message").innerHTML =
    "のらやへようこそ！<br>" +
    "まずは、はじめて編から始めるにゃ🐾";
}

function startBeginner() {
  startQuiz({
    stage: "beginner",
    label: "はじめて編",
    quizzes: beginnerQuizzes,
    count: 10,
    retry: "startBeginner"
  });
}

function startHall() {
  startQuiz({
    stage: "hall",
    label: "ホール編",
    quizzes: hallQuizzes,
    count: 20,
    retry: "startHall"
  });
}

function startQuiz(settings) {

  if (!settings.quizzes || settings.quizzes.length === 0) {
    document.getElementById("message").innerHTML =
      settings.label + "の問題はまだ登録されていないにゃ🐾";
    return;
  }

  currentStage = settings.stage;
  currentStageLabel = settings.label;
  retryFunctionName = settings.retry;

  currentQuiz = 0;
  score = 0;
  wrongQuizzes = [];

  selectedQuizzes =
    shuffleArray(settings.quizzes).slice(0, settings.count);

  document.getElementById("topButtons").style.display = "none";
  document.getElementById("collectionArea").style.display = "none";

  showQuiz();
}

function showQuiz() {

  changeNora(normalNora);

  const quiz = selectedQuizzes[currentQuiz];

  const shuffledChoices = shuffleArray(
    quiz.choices.map((choice, index) => ({
      text: choice,
      correct: index === quiz.answer
    }))
  );

  document.getElementById("message").innerHTML =
    "<strong>Q" + (currentQuiz + 1) + "</strong><br><br>" +
    quiz.question;

  let html = "";

  shuffledChoices.forEach((choice) => {
    html += `
      <button onclick="answerQuiz(${choice.correct})">
        ${choice.text}
      </button>
    `;
  });

  document.getElementById("quizArea").innerHTML = html;
}

function answerQuiz(isCorrect) {

  const quiz = selectedQuizzes[currentQuiz];

  let resultHTML = "";

  if (isCorrect) {

    score += 100;

    changeNora(happyNora);
    jumpNora();

    resultHTML = `
      <div class="message">
        ⭕ 正解にゃ！<br><br>
        ${quiz.explanation}
      </div>
    `;

  } else {

    wrongQuizzes.push(quiz);

    changeNora(worryNora);
    jumpNora();

    resultHTML = `
      <div class="message">
        ❌ おしいにゃ！<br><br>
        ${quiz.explanation}
      </div>
    `;
  }

  document.getElementById("quizArea").innerHTML =
    resultHTML +
    `<button onclick="nextQuiz()">次へ</button>`;
}

function nextQuiz() {

  currentQuiz++;

  if (currentQuiz < selectedQuizzes.length) {
    showQuiz();
  } else {
    finishQuiz();
  }
}

function getBadge(finalScore) {

  if (finalScore === 100) {
    return {
      result: "🥇 金バッジ",
      shortBadge: "🥇"
    };
  }

  if (finalScore >= 90) {
    return {
      result: "🥈 銀バッジ",
      shortBadge: "🥈"
    };
  }

  if (finalScore >= 80) {
    return {
      result: "🥉 銅バッジ",
      shortBadge: "🥉"
    };
  }

  return {
    result: "🌱 また挑戦にゃ",
    shortBadge: "🌱"
  };
}

function finishQuiz() {

  const finalScore =
    Math.floor(score / selectedQuizzes.length);

  const badge = getBadge(finalScore);

  if (finalScore >= 80) {
    changeNora(happyNora);
  } else {
    changeNora(worryNora);
  }

  document.getElementById("message").innerHTML =
    currentStageLabel + "クリア！<br>" +
    finalScore + "点！<br>" +
    badge.result + " 獲得にゃ✨";

  if (currentStage !== "review") {
    updateBadgeCollection(finalScore, badge);
    updateBestRecord(finalScore, badge);
  }

  document.getElementById("quizArea").innerHTML = `

    <button onclick="goTop()">
      🏠 トップへ戻る
    </button>

    <button onclick="${retryFunctionName}()">
      🔄 もう一度解く
    </button>

    ${wrongQuizzes.length > 0 ? `
      <button onclick="startReview()">
        📚 間違えた問題を復習
      </button>
    ` : ""}

  `;

  if (currentStage === "beginner") {
    unlockHall();
  }
}

function startReview() {

  if (wrongQuizzes.length === 0) {
    return;
  }

  selectedQuizzes = [...wrongQuizzes];

  currentQuiz = 0;
  score = 0;

  currentStage = "review";
  currentStageLabel = "復習";
  retryFunctionName = "startReview";

  wrongQuizzes = [];

  document.getElementById("topButtons").style.display = "none";
  document.getElementById("collectionArea").style.display = "none";

  showQuiz();
}

function updateBadgeCollection(finalScore, badge) {

  const badgeText =
    badge.shortBadge + " " +
    currentStageLabel + " " +
    badge.result.replace(/^🥇 |^🥈 |^🥉 /, "");

  if (currentStage === "beginner") {

    const beginnerBadge =
      document.getElementById("beginnerBadge");

    beginnerBadge.textContent = badgeText;
    beginnerBadge.classList.remove("locked");
  }

  if (currentStage === "hall") {

    const hallBadge =
      document.getElementById("hallBadge");

    if (hallBadge) {
      hallBadge.textContent = badgeText;
      hallBadge.classList.remove("locked");
    }
  }
}

function updateBestRecord(finalScore, badge) {

  if (finalScore <= bestRecords[currentStage].score) {
    return;
  }

  bestRecords[currentStage].score = finalScore;
  bestRecords[currentStage].badge = badge.shortBadge;

  if (currentStage === "beginner") {
    document.getElementById("beginnerButton").innerHTML =
      "🌱 はじめて編<br>" +
      "最高：" + finalScore + "点 " + badge.shortBadge;
  }

  if (currentStage === "hall") {
    document.getElementById("hallButton").innerHTML =
      "🍜 ホール編<br>" +
      "最高：" + finalScore + "点 " + badge.shortBadge;
  }

  localStorage.setItem(
    "bestRecords",
    JSON.stringify(bestRecords)
  );
}

function unlockHall() {

  const hallButton =
    document.getElementById("hallButton");

  if (!hallButton) {
    return;
  }

  hallButton.disabled = false;

  localStorage.setItem("hallUnlocked", "true");

  if (bestRecords.hall.score > 0) {

    hallButton.innerHTML =
      "🍜 ホール編<br>" +
      "最高：" +
      bestRecords.hall.score +
      "点 " +
      bestRecords.hall.badge;

  } else {

    hallButton.innerHTML = "🍜 ホール編";
  }
}

function goTop() {

  document.getElementById("message").innerHTML =
    "のらやへようこそ！<br>" +
    "一緒にのらやを勉強しようね🐈‍⬛";

  document.getElementById("quizArea").innerHTML = "";

  document.getElementById("topButtons").style.display = "block";

  document.getElementById("collectionArea").style.display = "none";

  changeNora(normalNora);
}

function showCollection() {

  document.getElementById("topButtons").style.display = "none";

  document.getElementById("quizArea").innerHTML = "";

  document.getElementById("message").innerHTML =
    "集めたバッジを確認するにゃ🏆";

  document.getElementById("collectionArea").style.display = "block";

  changeNora(normalNora);
}

function hideCollection() {

  document.getElementById("collectionArea").style.display = "none";

  document.getElementById("topButtons").style.display = "block";

  document.getElementById("message").innerHTML =
    "のらやへようこそ！<br>" +
    "一緒にのらやを勉強しようね🐈‍⬛";

  changeNora(normalNora);
}

window.onload = function () {

  const hallUnlocked =
    localStorage.getItem("hallUnlocked");

  if (hallUnlocked === "true") {
    unlockHall();
  }

  if (bestRecords.beginner.score > 0) {

    document.getElementById("beginnerButton").innerHTML =
      "🌱 はじめて編<br>" +
      "最高：" +
      bestRecords.beginner.score +
      "点 " +
      bestRecords.beginner.badge;
  }
};