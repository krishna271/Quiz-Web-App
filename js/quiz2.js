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
        question : "Which of the following function of string object splits a string object into an array strings by separating the string into substrings?",
        imgSrc : "../images/js.png",
        choiceA : "slice()",
        choiceB : "split()",
        choiceC : "replace()",
		choiceD : "search()",
        correct : "B"
    },{
        question : "Which of the following function of string object returns the calling string value converted to lowercase?",
        imgSrc : "../images/js.png",
        choiceA : "toLocaleLowerCase()",
        choiceB : "toLowerCase()",
        choiceC : "toString()",
		choiceD : "substring()",
        correct : "B"
    },{
        question : "Which of the following function of string object causes a string to be displayed as a subscript, as if it were in a &lt;sub&gt; tag?",
        imgSrc : "../images/js.png",
        choiceA : "sup()",
        choiceB : "small()",
        choiceC : "strike()",
		choiceD : "sub()",
        correct : "D"
    },
	{
        question : "Which of the following function of array object removes the last element from an array and returnsn that element?",
        imgSrc : "../images/js.png",
        choiceA : "pop()",
        choiceB : "push()",
        choiceC : "join()",
		choiceD : "map()",
        correct : "A"
    },
	{
        question : "Which of the following function of array object sorts the elements of an array?",
        imgSrc : "../images/js.png",
        choiceA : "toSource()",
        choiceB : "sort()",
        choiceC : "toString()",
		choiceD : "unshift()",
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