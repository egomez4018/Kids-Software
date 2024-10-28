let level = 1;
let operation = 'add'; // Default to addition
let correctCount = 0;
let totalProblems = 0;
let num1, num2, correctAnswer;
let gameRunning = false;

function startGame() {
  level = document.getElementById('level-select').value;
  operation = document.getElementById('operation-select').value;  // Get the selected operation
  correctCount = 0;
  totalProblems = 0;
  document.getElementById('correct-count').innerText = correctCount;
  document.getElementById('game-area').style.display = 'block';
  gameRunning = true;
  generateProblem();

  // Focus on the input field automatically and listen for the "Enter" key
  document.getElementById('answer-input').focus();
  document.getElementById('answer-input').addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });
}

function stopGame() {
  gameRunning = false;
  document.getElementById('game-area').style.display = 'none';

  // Display a summary of the student's performance
  const summaryMessage = `Game Over! You got ${correctCount} correct out of ${totalProblems} problems.`;
  document.getElementById('feedback').innerText = summaryMessage;
  document.getElementById('feedback').style.display = 'block';  // Ensure the feedback is shown
  document.getElementById('feedback').classList.remove('correct', 'incorrect');
}

function generateProblem() {
  if (!gameRunning) return;

  totalProblems++;  // Increment the total problems counter

  // Generate numbers based on level
  if (level == 1) {
    num1 = Math.floor(Math.random() * 10);    // 1-digit number
    num2 = Math.floor(Math.random() * 10);    // 1-digit number
  } else if (level == 2) {
    num1 = Math.floor(Math.random() * 90) + 10;  // 2-digit number
    num2 = Math.floor(Math.random() * 10);       // 1-digit number
  } else {
    num1 = Math.floor(Math.random() * 90) + 10;  // 2-digit number
    num2 = Math.floor(Math.random() * 90) + 10;  // 2-digit number
  }

  // Generate problem based on the selected operation
  if (operation === 'add') {
    correctAnswer = num1 + num2;
    document.getElementById('problem-display').innerText = `${num1} + ${num2} = `;
  } else if (operation === 'subtract') {
    if (num1 < num2) { [num1, num2] = [num2, num1]; }  // Ensure no negative results
    correctAnswer = num1 - num2;
    document.getElementById('problem-display').innerText = `${num1} - ${num2} = `;
  } else if (operation === 'multiply') {
    correctAnswer = num1 * num2;
    document.getElementById('problem-display').innerText = `${num1} × ${num2} = `;
  }

  document.getElementById('answer-input').value = '';
  document.getElementById('feedback').innerText = '';

  // Focus on the answer input field after generating a new problem
  document.getElementById('answer-input').focus();
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer-input').value);

  if (userAnswer === correctAnswer) {
    // Correct answer feedback with emojis
    document.getElementById('feedback').innerText = '🎉 Correct! You rock! 🎉';
    document.getElementById('feedback').classList.add('correct');
    document.getElementById('feedback').classList.remove('incorrect');
    correctCount++;
    document.getElementById('correct-count').innerText = correctCount;
  } else {
    // Incorrect answer feedback with emoji
    document.getElementById('feedback').innerText = '❌ Incorrect, try again!';
    document.getElementById('feedback').classList.add('incorrect');
    document.getElementById('feedback').classList.remove('correct');
    return;  // Do not move to the next problem yet
  }

  // Automatically generate a new problem after a short delay
  setTimeout(() => {
    generateProblem();
  }, 1000);
}
