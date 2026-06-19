const questions = [

{
type:"single",
question:"Which language is used to structure web pages?",
options:["CSS","HTML","Python","Java"],
answer:"HTML"
},

{
type:"single",
question:"Which language is used for styling web pages?",
options:["HTML","CSS","C++","SQL"],
answer:"CSS"
},

{
type:"single",
question:"Which language adds interactivity to websites?",
options:["JavaScript","HTML","CSS","Excel"],
answer:"JavaScript"
},

{
type:"single",
question:"Which company developed Java?",
options:["Microsoft","Sun Microsystems","Google","Apple"],
answer:"Sun Microsystems"
},

{
type:"multi",
question:"Which of the following are programming languages?",
options:["Python","HTML","Java","CSS"],
answer:["Python","Java"]
},

{
type:"multi",
question:"Select frontend technologies.",
options:["HTML","CSS","JavaScript","MySQL"],
answer:["HTML","CSS","JavaScript"]
},

{
type:"fill",
question:"HTML stands for ______ Markup Language.",
answer:"HyperText"
},

{
type:"fill",
question:"CSS stands for Cascading _____ Sheets.",
answer:"Style"
},

{
type:"single",
question:"Which symbol is used for comments in JavaScript?",
options:["//","<!-- -->","##","**"],
answer:"//"
},

{
type:"single",
question:"Which tag creates a hyperlink in HTML?",
options:["<link>","<a>","<href>","<url>"],
answer:"<a>"
}

];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submitBtn");
const progressEl = document.getElementById("progress");

function loadQuestion(){

    optionsEl.innerHTML="";

    let q = questions[currentQuestion];

    progressEl.innerText =
    `Question ${currentQuestion+1} of ${questions.length}`;

    questionEl.innerText = q.question;

    if(q.type==="single"){

        q.options.forEach(option=>{

            optionsEl.innerHTML += `
            <label class="option">
            <input type="radio"
            name="answer"
            value="${option}">
            ${option}
            </label>`;
        });
    }

    else if(q.type==="multi"){

        q.options.forEach(option=>{

            optionsEl.innerHTML += `
            <label class="option">
            <input type="checkbox"
            value="${option}">
            ${option}
            </label>`;
        });
    }

    else if(q.type==="fill"){

        optionsEl.innerHTML =
        `<input type="text"
        id="fillAnswer"
        placeholder="Type your answer">`;
    }
}

submitBtn.addEventListener("click",()=>{

    let q = questions[currentQuestion];
    let correct = false;

    if(q.type==="single"){

        let selected =
        document.querySelector(
        'input[name="answer"]:checked');

        if(selected &&
           selected.value===q.answer){
            correct=true;
        }
    }

    else if(q.type==="multi"){

        let selected =
        Array.from(
        document.querySelectorAll(
        'input[type="checkbox"]:checked'))
        .map(x=>x.value);

        correct =
        selected.length===q.answer.length &&
        selected.every(val=>
        q.answer.includes(val));
    }

    else if(q.type==="fill"){

        let userAnswer =
        document.getElementById("fillAnswer")
        .value.trim();

        if(
        userAnswer.toLowerCase()===
        q.answer.toLowerCase()
        ){
            correct=true;
        }
    }

    if(correct){
        score++;
    }

    currentQuestion++;

    if(currentQuestion<questions.length){
        loadQuestion();
    }
    else{
        showResult();
    }
});

function showResult(){

    questionEl.innerHTML =
    `Quiz Completed!<br><br>
     Score: ${score}/${questions.length}<br>
     Percentage:
     ${((score/questions.length)*100).toFixed(1)}%`;

    optionsEl.innerHTML="";

    submitBtn.innerText="Restart";

    submitBtn.onclick=()=>{
        location.reload();
    };
}

loadQuestion();