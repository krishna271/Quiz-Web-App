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
        question : "What is the HTML tag under one can write the JavaScript code?",
        imgSrc : "../images/js.png",
        choiceA : "&lt;javascript&gt;",
        choiceB : "&lt;scripted&gt;",
        choiceC : "&lt;script&gt;",
		choiceD : "&lt;js&gt;",
        correct : "C"
    },{
        question : "Which of the following is not a reserved word in JavaScript?",
        imgSrc : "../images/js.png",
        choiceA : "interface",
        choiceB : "throws",
        choiceC : "program",
		choiceD : "short",
        correct : "C"
    },{
        question : "Predict the output of the following JavaScript code,<br><pre>&lt;script typr='text/javascript' language='javascript'&gt;<br>&nbsp;&nbsp;&nbsp;&nbsp;var x=5;<br>&nbsp;&nbsp;&nbsp;&nbsp;var y=6;<br>&nbsp;&nbsp;&nbsp;&nbsp;var res=eval('x*y');document.write(res);<br>&lt;/script&gt;",
        imgSrc : "../images/js.png",
        choiceA : "'30'",
        choiceB : "30",
        choiceC : "5*6",
		choiceD : "'5*6'",
        correct : "B"
    },
	{
        question : "How to write an 'if' statement for executing some code,<br>if 'i' is NOT equal to 8?",
        imgSrc : "../images/js.png",
        choiceA : "if(i&lt;&gt;5)",
        choiceB : "if i&lt;&gt;5",
        choiceC : "if(i!=5)",
		choiceD : "if i!=5",
        correct : "C"
    },
	{
        question : "What is the correct syntax for adding comments in JavaScript?",
        imgSrc : "../images/js.png",
        choiceA : "&lt;!-This is a comment-&gt;",
        choiceB : "//This is a comment",
        choiceC : "-This is a comment",
		choiceD : "**This is a comment**",
        correct : "B"
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
	scoreDiv.innerHTML += "<a href='jsbase.html'><h1><-Back</h1></a>";
}