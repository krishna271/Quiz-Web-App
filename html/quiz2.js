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
        question : "HTML is a subset of?",
        imgSrc : "../images/html.png",
        choiceA : "SGMT",
        choiceB : "SGML",
        choiceC : "SGMD",
		choiceD : "None of above",
        correct : "B"
    },{
        question : "Which of the following is a container?",
        imgSrc : "../images/html.png",
        choiceA : "&lt;SELECT&gt;",
        choiceB : "&lt;BODY&gt;",
        choiceC : "&lt;INPUT&gt;",
		choiceD : "Both (a)and(b)",
        correct : "D"
    },{
        question : "The attribute, which define the relationship between current document and HREF'éd URL is",
        imgSrc : "../images/html.png",
        choiceA : "REL",
        choiceB : "URL",
        choiceC : "REV",
		choiceD : "All of these",
        correct : "A"
    },
	{
        question : "&lt;DT&gt; tag is designed to fit a single line of our web page but &lt;DD&gt; tag will accept a",
        imgSrc : "../images/html.png",
        choiceA : "Line of text",
        choiceB : "Full paragraph",
        choiceC : "Word",
		choiceD : "Request",
        correct : "B"
    },
	{
        question : "Character encoding is",
        imgSrc : "../images/html.png",
        choiceA : "Method used to represent numbers in a character",
        choiceB : "Method used to represent character in a number",
        choiceC : "A system that consists of a code which pairs each character with a pettern, sequence of natural numbers or electrical pulse in order to transmit the data",
		choiceD : "None of above",
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
	scoreDiv.innerHTML += "<a href='htmlbase.html'><h1><-Back</h1></a>";
}