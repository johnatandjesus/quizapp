const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Reiniciar";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Qual a raiz quadrada de 16 ?",
    answers: [
      { text: "4", correct: true },
      { text: "8", correct: false },
      { text: "2", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "A terra é plana ?",
    answers: [
      { text: "SIM", correct: false },
      { text: "NÃO", correct: false },
      { text: "Não é plana por que na verdade ela é OCA", correct: true },
      { text: "Nenhuma das Alternativas", correct: false },
    ],
  },
  {
    question: "Qual a massa atômica do hidrogênio?",
    answers: [
      { text: "1u", correct: true },
      { text: "12,3u", correct: false },
      { text: "27u", correct: false },
      { text: "12u", correct: false },
    ],
  },
  {
    question: "Quanto é 12 x 12?",
    answers: [
      { text: "144", correct: true },
      { text: "124", correct: false },
      { text: "111", correct: false },
      { text: "24", correct: false },
    ],
  },
];
