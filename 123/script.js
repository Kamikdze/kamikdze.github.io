var questions = [{
            
            {title: "Какого числа день независимости США?",
            answer: [
                "4 июня",
                "6 августа",
                "4 июля",
                "6 июня"
            ],
            correct: 0,
            price: 100
        }
        {title: "В каком году сформировался С.С.С.Р."
        answer: [
                "1922",              
                "1917",
                "1933",
                "1928",
            ],
            correct: 0,
            price: 200
        }
    }
    ]
    current = 0,
    balance = 0;
     
    Var price = [
      100,
      200,
      300,
      500,
      1000,
      2000,
      5000,
      8000,
      10000,
      20000,
      50000,
      100000,







    ],

function drawQuestion(numberOfQuestion) {
    var
        currentQuestion = questions[numberOfQuestion];
    if (typeof currentQuestion != "undefined") {

        document.getElementById("question").innerHTML = currentQuestion.title;

        for (var i = 0; i < 4; i++) {
            document.getElementById("answer-" + i).innerHTML = currentQuestion.answers[i];
        }
    }
}

function checkAnswer(numberOfQuestion, answerOfUser) {
    var result = false;
    var
        currentQuestion = questions[numberOfQuestion];
    if (typeof currentQuestion != "undefined") {
        result = currentQuestion.correct == answerOfUser;

    }
    return result;
}

drawQuestion(current);

for (var i = 0; i < 4; i++) {
    document.getElementById("answer-" + i).addEventListener("click", function(e) {
        e.preventDefault();
        var id = this.getAttribute("id"),
            number = Number(id.substr(-1));
        if (checkAnswer(current, number) == false) {
            alert("ТЫ ПРОИГРАЛ! ФУФУФУ! ВЫ ВЫИГРАЛИ " + balance );
            current = 0;
            drawQuestion(current);
        } else {
            balance = balance + getPrice(current);
            current = current + 1;
             
            
            if (current == questions.length) {
                alert('ВЫ ПОБЕДИТЕЛЬ!, ВАШ ВЫИГРЫШ '+ balance );
            } else {
                drawQuestion(current);
            }
        }

    });
}
 function getPrice(numberOfQuestion ) {
        var result = 0;
        var
            currentQuestion = questions[numberOfQuestion];
        if (typeof currentQuestion != "undefined") {
            result = currentQuestion.price;
        }
        return result;
  


 } 

























