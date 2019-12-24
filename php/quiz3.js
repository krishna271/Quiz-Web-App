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
        question : "Which one of the following PHP functions can be used to build a function that accepts any number of arguments?",
        imgSrc : "../images/php.png",
        choiceA : "func_get_argv()",
        choiceB : "func_get_argc()",
        choiceC : "get_argv()",
		choiceD : "get_argc()",
        correct : "B"
    },{
        question : "Which one of the following can be used to find files?",
        imgSrc : "../images/php.png",
        choiceA : "glob()",
        choiceB : "file()",
        choiceC : "fold()",
		choiceD : "get_file()",
        correct : "A"
    },{
        question : "The filesize() function returns the file size in _______.",
        imgSrc : "../images/php.png",
        choiceA : "bits",
        choiceB : "bytes",
        choiceC : "kilobytes",
		choiceD : "gigabytes",
        correct : "B"
    },
	{
        question : "Which one of the following PHP function is used to determine a file's last access time?",
        imgSrc : "../images/php.png",
        choiceA : "fileltime()",
        choiceB : "filectime()",
        choiceC : "fileatime()",
		choiceD : "filetime()",
        correct : "C"
    },
	{
        question : "Which one of the following PHP function is capable of reading a file into an array?",
        imgSrc : "../images/php.png",
        choiceA : "file()",
        choiceB : "arrfile()",
        choiceC : "arr_file()",
		choiceD : "file_arr()",
        correct : "A"
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
	scoreDiv.innerHTML += "<a href='phpbase.html'><h1><-Back</h1></a>";
}