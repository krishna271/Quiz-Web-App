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
        question : "Which of the following is correct about Javascript?",
        imgSrc : "../images/js.png",
        choiceA : "JavaScript is a lightweigth, interpreted programming laguage",
        choiceB : "Javascript has object-oriented capabilities that allows yout to build interactivity into otherwise static HTML pages",
        choiceC : "The general-purpose core of the laguage has been embedded in Netscape, Internet Explorer and other web browsers",
		choiceD : "All the above",
        correct : "D"
    },{
        question : "Inside which HTML element do we put the JavaScript?",
        imgSrc : "../images/js.png",
        choiceA : "&lt;js&gt;",
        choiceB : "&lt;Scripting&gt;",
        choiceC : "&lt;javascript&gt;",
		choiceD : "&lt;script&gt;",
        correct : "D"
    },{
        question : "Which built-in method returns the length of the string?",
        imgSrc : "../images/js.png",
        choiceA : "length()",
        choiceB : "size()",
        choiceC : "index()",
		choiceD : "None of the above",
        correct : "A"
    },
	{
        question : "Which built-in method sorts the elements of an array?",
        imgSrc : "../images/js.png",
        choiceA : "changeOrder(order)",
        choiceB : "order()",
        choiceC : "sort()",
		choiceD : "None of the these",
        correct : "C"
    },
	{
        question : "Which of the following of Number object returns the number's value?",
        imgSrc : "../images/js.png",
        choiceA : "toString()",
        choiceB : "valueOf()",
        choiceC : "toLocalString()",
		choiceD : "toPrecision()",
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
    let img = (scorePerCent > 80) ? "../images/5.png" :
              (scorePerCent > 60) ? "../images/4.png" :
              (scorePerCent > 40) ? "../images/3.png" :
              (scorePerCent > 20) ? "../images/2.png" :
              "../images/1.png";
    scoreDiv.innerHTML = "<img src="+ img +"></img>";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
	scoreDiv.innerHTML += "<a href='jsbase.html'><h1><-Back</h1></a>";
}