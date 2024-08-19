// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user has already answered the questions by checking localStorage
    const answered = localStorage.getItem('answered');
    
    if (answered) {
        // If answered, skip to the title screen
        showTitleScreen();
    } else {
        // Otherwise, start with the first question
        showQuestion(1);
    }
});

// Function to display a specific question based on its number
function showQuestion(number) {
    // Make the questionnaire visible
    document.getElementById('questionnaire').style.display = 'block';
    // Hide all question cards initially
    document.querySelectorAll('.card').forEach(card => card.style.display = 'none');
    
    // Display the specific question card based on the question number
    if (number == 1) {
        // Display the first question card as a block
        document.getElementById(`question${number}`).style.display = 'block';
    } else {
        // Display subsequent question cards as flex (for better alignment)
        document.getElementById(`question${number}`).style.display = 'flex';
    }
}

// Function to proceed to the next question
function nextQuestion(current) {
    if (current == 1) {
        // If currently on the first question, proceed to the next question directly
        showQuestion(current + 1);
    } else {
        // For subsequent questions, check if an option is selected
        const selectedButton = document.querySelector(`#question${current} .option.selected`);
    
        if (selectedButton) {
            // If an option is selected, proceed to the next question
            if (current == 3) {
                // If it's the last question, finish the questionnaire
                finishQuestions();
            } else {
                // Otherwise, move to the next question
                showQuestion(current + 1);
            }
        } else {
            // Alert the user to select an option before proceeding
            alert('Please answer the question before proceeding.');
        }
    }
}

// Function to handle the completion of all questions
function finishQuestions() {
    // Get the selected option for the last question
    const selectedButton = document.querySelector(`#question3 .a3-div .btn`).value;
    
    if (selectedButton) {
        // If an option is selected, mark the questions as answered in localStorage
        localStorage.setItem('answered', 'true');
        // Show the title screen
        showTitleScreen();
    } else {
        // Alert the user to select an option before finishing
        alert('Please answer the question before proceeding.');
    }
}

// Function to display the title screen
function showTitleScreen() {
    // Hide the questionnaire page
    document.getElementById('q-page').style.display = 'none';
    // Display the title screen
    document.getElementById('titleScreen').style.display = 'flex';
}

// Function to handle the selection of an option button
function selectOption(questionNumber, button) {
    // Remove 'selected' class from all options in the current question
    const parentDiv = button.parentElement;
    parentDiv.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));

    // Add 'selected' class to the clicked button
    button.classList.add('selected');
}

// Function to handle the 'X' button click, closing the card
function closeCard() {
    // Skip to the title screen when the 'X' button is clicked
    showTitleScreen();
}

// Event listener for the waitlist button to redirect the user
document.getElementById('waitlist-btn').addEventListener('click', function() {
    // Redirect the user to the waitlist page
    window.location.href = 'https://capx.live/join-waitlist?';
});

// Remove the 'answered' flag from localStorage (for testing purposes)
// localStorage.removeItem('answered');
