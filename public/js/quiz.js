document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the JSON data from the script tag
    const questionsDataElement = document.getElementById('questions-data');
    const questions = JSON.parse(questionsDataElement.textContent);

    // Retrieve the current question index from the data attribute
    const quizContainer = document.getElementById('quiz-container');
    let currentQuestionIndex = parseInt(quizContainer.getAttribute('data-current-index'), 10);
    let score = 0;

    function updateQuiz() {
        const questionElement = document.getElementById('question-text');
        const optionsList = document.querySelector('.options-list');

        // Update question text
        questionElement.textContent = questions[currentQuestionIndex].question;

        // Clear existing options
        optionsList.innerHTML = '';

        // Update options list
        questions[currentQuestionIndex].choices.forEach(function (choice) {
            optionsList.innerHTML += `
                <label>
                    <input type="radio" name="choice" value="${choice}"> ${choice}
                </label><br>
            `;
        });
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            updateQuiz();
        } else {
            displayResults();
        }
    }

    function displayResults() {
        alert('Quiz completed! Your score is ' + score);
    }

    // Initial call to update quiz
    updateQuiz();

    // Expose functions to the global scope if needed
    window.nextQuestion = nextQuestion;
});
