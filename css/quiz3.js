const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
let questions = [
    {
        question : "If we want to define style for an unique element, then which css selector will we use?",
        imgSrc : "../images/css.png",
        choiceA : "id",
        choiceB : "text",
        choiceC : "class",
		choiceD : "name",
        correct : "A"
    },{
        question : "If we don't want to allow a floating div to the left side of an element, which css property will we use?",
        imgSrc : "../images/css.png",
        choiceA : "margin",
        choiceB : "clear",
        choiceC : "float",
		choiceD : "padding",
        correct : "B"
    },{
        question : "If we want to show an Arrow as cursor, then which value we will use?",
        imgSrc : "../images/css.png",
        choiceA : "pointer",
        choiceB : "default",
        choiceC : "arrow",
		choiceD : "arr",
        correct : "B"
    },
	{
        question : "Which of the following properties will we use to display border around a cell without any content?",
        imgSrc : "../images/css.png",
        choiceA : "empty-cell",
        choiceB : "blank-cell",
        choiceC : "noncontent-cell",
		choiceD : "void-cell",
        correct : "A"
    },
	{
        question : "Which attribute can be added to many HTML/XHTML elements to identify them as a member of a specific group?",
        imgSrc : "../images/css.png",
        choiceA : "id",
        choiceB : "div",
        choiceC : "class",
		choiceD : "span",
        correct : "C"
    }
];
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
start.addEventListener("click",startQuiz);
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
function scoreRender(){
    scoreDiv.style.display = "block";
    const scorePerCent = Math.round(100 * score/questions.length);
    let img = (scorePerCent >= 80) ? "../images/5.png" :
              (scorePerCent >= 60) ? "../images/4.png" :
              (scorePerCent >= 40) ? "../images/3.png" :
              (scorePerCent >= 20) ? "../images/2.png" :
              "../images/1.png";
    scoreDiv.innerHTML = "<img src="+ img +"></img>";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
	scoreDiv.innerHTML += "<a href='cssbase.html'><h1><-Back</h1></a>";
}