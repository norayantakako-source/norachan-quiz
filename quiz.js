const normalNora = "Aのらノーマル.png";
    const happyNora = "Bのら万歳.png";
    const worryNora = "Eのら焦り.png";

    let beginnerClear = false;


     let selectedQuizzes = [];

    function shuffleArray(array) {

      return [...array].sort(
        () => Math.random() - 0.5
      );
    }

    let currentQuiz = 0;
    let score = 0;
  let bestScore = 0;
let bestBadge = "";

    function jumpNora() {

      const nora =
        document.getElementById("norachan");

      nora.classList.remove("jump");

      void nora.offsetWidth;

      nora.classList.add("jump");
    }

    function changeNora(imageName) {

      document.getElementById("norachan").src =
        imageName;
    }

    function tapNora() {

      jumpNora();

      changeNora(normalNora);

      document.getElementById("message").innerHTML =
        "のらやへようこそ！<br>" +
        "まずは、はじめて編から始めるにゃ🐾";
    }

    function startBeginner(){

  currentQuiz = 0;
  score = 0;

  selectedQuizzes =
    [...quizzes].sort(() => Math.random() - 0.5).slice(0, 10);

  document.getElementById("topButtons").style.display = "none";
  document.getElementById("collectionArea").style.display = "none";

  showQuiz();
}

function showQuiz() {

  changeNora(normalNora);

  const quiz =
    selectedQuizzes[currentQuiz];

  const shuffledChoices =
    shuffleArray(
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

  document.getElementById("quizArea").innerHTML =
    html;
}

    function answerQuiz(isCorrect) {

      const quiz =
        selectedQuizzes[currentQuiz];

      let resultHTML = "";

      if(isCorrect){

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

      if(currentQuiz < selectedQuizzes.length){

        showQuiz();

      } else {

        finishQuiz();
      }
    }

    function finishQuiz() {

      let result = "";
      let badgeText = "";

      const finalScore =
        Math.floor(score / selectedQuizzes.length);

      if(finalScore === 100){

        result = "🥇 金バッジ";
        badgeText = "🥇 はじめて編 金バッジ";

        changeNora(happyNora);

      } else if(finalScore >= 90){

        result = "🥈 銀バッジ";
        badgeText = "🥈 はじめて編 銀バッジ";

        changeNora(happyNora);

      } else if(finalScore >= 80){

        result = "🥉 銅バッジ";
        badgeText = "🥉 はじめて編 銅バッジ";

        changeNora(happyNora);

      } else {

        result = "🌱 また挑戦にゃ";
        badgeText = "🌱 はじめて編";

        changeNora(worryNora);
      }

      document.getElementById("message").innerHTML =
        "はじめて編クリア！<br>" +
        finalScore + "点！<br>" +
        result + " 獲得にゃ✨";

      document.getElementById("beginnerBadge")
        .textContent = badgeText;

      document.getElementById("beginnerBadge")
        .classList.remove("locked");
if(finalScore > bestScore){

  bestScore = finalScore;

  bestBadge = result.replace("金バッジ", "")
                  .replace("銀バッジ", "")
                  .replace("銅バッジ", "");

  document.getElementById("beginnerButton")
    .innerHTML =
    "🌱 はじめて編<br>" +
    "最高：" +
    bestScore +
    "点 " +
    bestBadge;
}

    document.getElementById("quizArea").innerHTML = `

  <button onclick="goTop()">
    🏠 トップへ戻る
  </button>

  <button onclick="startBeginner()">
    🔄 もう一度解く
  </button>

`;

      beginnerClear = true;

document.getElementById("nextButton").textContent =
  "✨ 次のステージへ";

}

function goTop() {

  document.getElementById("message").innerHTML =
    "のらやへようこそ！<br>" +
    "一緒にのらやを勉強しようね🐈‍⬛";

  document.getElementById("quizArea").innerHTML = "";

  document.getElementById("topButtons").style.display =
    "block";

  document.getElementById("collectionArea").style.display =
    "none";

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
