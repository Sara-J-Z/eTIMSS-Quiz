/*-------------- Constants -------------*/
// Constants for pages
const PAGES = {
  PAGE1: 'page1',
  PAGE2: 'page2',
  PAGE3: 'page3',
  PAGE4: 'page4'
};

// Correct answers
const ANSWERS = {
  question1: 'B',
  question2: ['1', '2', '3', '4', '6', '12']
};

/*---------- Variables  ---------*/
let currentPage = PAGES.PAGE1;
let score = 0;

/*----- Cached Element References  -----*/
const startBtn = document.getElementById('startBtn');
const pages = document.querySelectorAll('.page');

/*-------------- Functions -------------*/

// Initialize the app by setting up initial state
function initialize() {
  currentPage = PAGES.PAGE1;
  score = 0;
  render();
}

// Render the appropriate page based on the current page state
function render() {
  // Hide all pages
  pages.forEach(page => page.classList.remove('active'));

  // Activate the correct page
  const activePage = document.getElementById(currentPage);
  activePage.classList.add('active');

  // Page-specific rendering
  switch (currentPage) {
    case PAGES.PAGE1:
      renderPage1();
      break;
    case PAGES.PAGE2:
      renderPage2();
      break;
    case PAGES.PAGE3:
      renderPage3();
      break;
    case PAGES.PAGE4:
      renderPage4();
      break;
  }
}

// Render the Start Page (Page 1)
function renderPage1() {
  startBtn.addEventListener('click', () => {
    currentPage = PAGES.PAGE2;
    render();
  });
}

// Render the First Question Page (Page 2)
function renderPage2() {
  const nextBtn = document.getElementById('next-btn');
  nextBtn.addEventListener('click', nextButtonListenerPage2);
}

// Event listener for moving to Page 3 after answering Question 1
function nextButtonListenerPage2() {
  const selectedAnswer = document.querySelector('input[name="q1"]:checked');
  if (selectedAnswer) {
    if (selectedAnswer.value === ANSWERS.question1) {
      score++;
    }
  }
  currentPage = PAGES.PAGE3;
  render();
}

// Render the Second Question Page (Page 3) for Multiple Answers
function renderPage3() {
  const finishBtn = document.getElementById('finish-btn');
  finishBtn.addEventListener('click', finishButtonListenerPage3);
}

// Event listener for moving to Page 4 after answering Question 2
function finishButtonListenerPage3() {
  const selectedAnswers = Array.from(document.querySelectorAll('input[name="q2"]:checked')).map(input => input.value);
  if (selectedAnswers.length > 0) {
    const correctAnswers = ANSWERS.question2;
    const isCorrect = selectedAnswers.sort().join(',') === correctAnswers.sort().join(',');
    if (isCorrect) {
      score++;
    }
  }
  currentPage = PAGES.PAGE4;
  render();
}

// Render the Results Page (Page 4)
function renderPage4() {
  let resultMessage;
if (score === 2) {
  resultMessage = "Nice job, you passed!";
} else {
  resultMessage = "Sorry, you didn't pass.";
}


  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = `
    <h2>Your Score: ${score}/2</h2>
    <h3>${resultMessage}</h3> 
    <button id="retry-btn">Retry Quiz</button>
  `;

  // Attach retry button event listener here to ensure it's attached after rendering
  const retryBtn = document.getElementById('retry-btn');
  retryBtn.addEventListener('click', () => {
    resetQuiz(); // Reset the quiz when retry is clicked
  });
}

// Reset the quiz (clear selections and reset state)
function resetQuiz() {
  // Clear all input selections (radio and checkbox)
  document.querySelectorAll('input[type="radio"]:checked').forEach(input => input.checked = false);
  document.querySelectorAll('input[type="checkbox"]:checked').forEach(input => input.checked = false);

  // Reset result message
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '';

  // Reset the score
  score = 0;

  // Go back to Page 1
  currentPage = PAGES.PAGE1;
  render();
}

/*----------- Event Listeners ----------*/

// Initialize the app when the page is loaded
window.addEventListener('load', initialize);
