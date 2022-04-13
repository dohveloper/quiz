
const questions = [
    { firstNumber: 1, operator: "+", secondNumber: 1, choices: [2, 4, 5, 7], answer: null },
    { firstNumber: 2, operator: "+", secondNumber: 3, choices: [1, 5, 10, 11], answer: null },
    { firstNumber: 3, operator: "+", secondNumber: 7, choices: [20, 30, 10, 14], answer: null },
    { firstNumber: 9, operator: "+", secondNumber: 9, choices: [12, 20, 27, 18], answer: null },
];

let count = 0; 
let score = 0;
const delayTime = 1500;
     

const updatePage = () => {
    //if question's left, show a next question
    if (count < questions.length) {
        //clear choices
        let choicesEl = document.querySelector(".choices");
        clearElement(choicesEl);

        //calculate answers if undefined
        let currentQuestion = questions[count];
        if (currentQuestion.name==null) {
            calculateAnswers(questions);    
        }
        //update Question
        updateQuestion(currentQuestion);
    } 
    //if there's no more question, show a result page 
    else {
        const bodyEl = document.body;
        
        //hide quiz elements
        const firstContainer = document.querySelector('.first-container');
        firstContainer.style.display = "none";
        const secondContainer = document.querySelector('.second-container');
        secondContainer.style.display = "none";
        
        //add total score text
        let h1Text = "Total score: " + score;
        addElement(bodyEl, "h1", ["result-score"], h1Text);
        
        //add a button
        addElement(bodyEl, "button", ["result-button"],"Play Again")
        
        //add a click listener 
        let button = document.querySelector('.result-button');
        button.onclick = () => { onPlayAgainClicked(); }
    }
    count++;
}
const addElement = (parentEl, type, classes, text) => {
    const el = document.createElement(type);
    const elText = document.createTextNode(text);
    el.appendChild(elText);
     classes.forEach((className) => {
        el.classList.add(className);    
    })
    parentEl.appendChild(el);
    return el;
}

const clearElement = (el) => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

const updateQuestion = (question) => {
    //Edit Question Title
    let questionTitleEl = document.querySelector(".question-p");
    questionTitleEl.innerHTML = "Question "+ (count+1) + "/" + questions.length;
    
    //Edit Score
    let questionScoreEl = document.querySelector(".score");
    questionScoreEl.innerHTML = score;
    //Edit Progressbar
    let progressbarEl = document.querySelector(".meter");
    let currentPercentage = (100 / (questions.length)) * (count + 1);
    progressbarEl.setAttribute("value",currentPercentage );
    //Edit Question 
    let questionEl = document.querySelector(".question");
    questionEl.innerHTML = "What is " + question.firstNumber + question.operator + question.secondNumber + "?";
    
    //Edit Question Choices
    let choicesEl = document.querySelector(".choices");
    fillChoicesElement(choicesEl, question);
}
const onPlayAgainClicked = () => {
    score = 0;
    count = 0; 
    window.location.href = "quiz.html";
}
const onChoiceClicked = (choiceEl, choiceContent, answer) => {
    //Check answer
    if (choiceContent === answer) {
        //-- if true, show greenbox & add score 
        choiceEl.classList.add("background--green")
        score++;
    }
    else {
        //-- if false, show redbox
        choiceEl.classList.add("background--red")
    }
    //Update page to next question
    setTimeout(updatePage, delayTime);
    
}
const calculateAnswers = (questions) => {
    questions.forEach((question) => {
        if (question.operator === "+") {
            question["answer"] = question.firstNumber + question.secondNumber;
        }
        else if (question.operator === "-") {
               question["answer"] = question.firstNumber - question.secondNumber;
        }
        else if (question.operator === "*") {
               question["answer"] = question.firstNumber * question.secondNumber;
        }
        else if (question.operator === "/") {
               question["answer"] = question.firstNumber / question.secondNumber;
        }
        else {
        
        }
    });
}
const fillChoicesElement = (choicesEl, currentQuestion) => {
    const choiceTitles = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const choices = currentQuestion.choices;
    const answer = currentQuestion.answer;
    
    choices.forEach((choiceContent, index) => {
        //Add Element 
        let choiceEl = createChoiceElement(choiceTitles[index], choiceContent);
        choicesEl.appendChild(choiceEl);

        //Add an Event Listener
        choiceEl.onclick = () => {
            onChoiceClicked(choiceEl, choiceContent, answer);
        };
    });
    return choicesEl;
}
const createChoiceElement = (choiceTitle, choiceContent) => {
    const choiceEl = document.createElement("div");
    choiceEl.classList.add("choice");

    //add a choice title element
    addElement(choiceEl, "div", ["choice-title"],choiceTitle)
    
    //add a choice content element 
    addElement(choiceEl, "div", ["choice-content"],choiceContent)

    return choiceEl;
}