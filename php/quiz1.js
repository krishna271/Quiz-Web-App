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
        question : "Which of the functions is used to sort an array in descending order?",
        imgSrc : "../images/php.png",
        choiceA : "sort()",
        choiceB : "asort()",
        choiceC : "rsort()",
		choiceD : "dsort()",
        correct : "C"
    },{
        question : "Which function will return true if a variable ia an array or false if it not?",
        imgSrc : "../images/php.png",
        choiceA : "this_array()",
        choiceB : "is_array()",
        choiceC : "do_array()",
		choiceD : "in_array()",
        correct : "B"
    },{
        question : "What will be the output of the following PHP code?<pre>&lt;?php<br>&nbsp&nbsp;&nbsp;&nbsp;$fruits=array('apple','orange','banana');<br>&nbsp&nbsp;&nbsp;&nbsp;echo (next($fruits));<br>&nbsp&nbsp;&nbsp;&nbsp;echo (next($fruits));<br>?&gt;</pre>",
        imgSrc : "../images/php.png",
        choiceA : "orangebanana",
        choiceB : "appleorange",
        choiceC : "orangeorange",
		choiceD : "appleapple",
        correct : "A"
    },
	{
        question : "What will be the output of the following PHP code?<pre>&lt;?php<br>&nbsp&nbsp;&nbsp;&nbsp;$number=array('4','hello',2);<br>&nbsp&nbsp;&nbsp;&nbsp;echo (array_sum($number));<br>?&gt;",
        imgSrc : "../images/php.png",
        choiceA : "4hello2",
        choiceB : "4",
        choiceC : "2",
		choiceD : "6",
        correct : "D"
    },
	{
        question : "What will be the output of the following PHP code?<pre>&lt;?php<br>&nbsp&nbsp;&nbsp;&nbsp;$fruits=array('apple','mango','peach','pear','orange');<br>&nbsp&nbsp;&nbsp;&nbsp;$subset=array_slice($fruits,2);print_r($subset);<br>?&gt;",
        imgSrc : "../images/php.png",
        choiceA : "Array([0]=>peach)",
        choiceB : "Array([0]=>apple,[1]=>mango,[2]=>peach)",
        choiceC : "Array([0]=>apple,[1]=>mango)",
		choiceD : "Array([0]=>peach,[1]=>pear,[2]=>orange)",
        correct : "D"
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