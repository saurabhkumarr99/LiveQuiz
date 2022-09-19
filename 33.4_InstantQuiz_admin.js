function admin_panel() {
  var admin_name = sessionStorage.getItem("admin_name");
  document.getElementById("admin_info").innerHTML = "Welcome " + admin_name;
}

function sign_out() {
  sessionStorage.removeItem("admin_name");
  sessionStorage.removeItem("admin_userid");
  window.location = 'http://127.0.0.1:5500/33.1_InstantQuiz_home.html';
}

//fetching All Quiz from db.json
function AllQuiz() {
  var url = "http://localhost:3001/quiz";
  fetch(url).then((response) => response.json())
    .then((data) => display(data));
}

//Displaying Quizes
function display(data) {
  data.forEach(function (element, index) {
    if (element.userid == sessionStorage.getItem("admin_userid")) {
      let li = document.createElement('li');
      li.setAttribute("id", "li" + element.id);

      let Q_N = document.createElement('text');
      Q_N.textContent = element.Quiz_Name;
      Q_N.style.color = "blue";
      li.appendChild(Q_N);

      let button1 = document.createElement("button");
      button1.setAttribute("id", "launch" + element.id);
      button1.setAttribute("onclick", "generatePrandomNo(" + element.id + ")");
      button1.style.marginLeft = "20px";
      button1.innerHTML = "Launch Quiz";
      li.appendChild(button1);

      let button2 = document.createElement("button");
      button2.setAttribute("onclick", "DeleteQuiz(" + element.id + ")");
      button2.style.marginLeft = "20px";
      button2.style.backgroundColor = "#c64343";
      button2.innerHTML = "Delete";
      li.appendChild(button2);

      let PrandonmNo = document.createElement("h5");
      PrandonmNo.setAttribute("id", "Prandom" + element.id);
      PrandonmNo.style.display = "inline";
      li.appendChild(PrandonmNo);

      let div = document.createElement("div");
      div.id = "Stud_div" + element.id;
      li.appendChild(div);

      QuizList.appendChild(li);

      if (sessionStorage.getItem(element.id)) {
        var prdNo = sessionStorage.getItem(element.id);
        live_quiz(element.id, prdNo);
      }
    }
  });

}

//Posting Quiz in db.json
function AddQuiz(data) {
  fetch('http://localhost:3001/quiz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      alert('Success:', data);
    })
    .catch((error) => {
      alert('Error:', error);
    });
}

//deleting
function DeleteQuiz(id) {
  fetch('http://localhost:3001/quiz/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert('Deleted:', data);
    })
    .catch((error) => {
      alert('Error:', error);
    });
}

Quiz_id = 0;

let Quiz = {

  count: 1,
  Quiz_Questions: new Array(),

  //Create Quiz Name
  CreateQuizName() {

    if (document.getElementById("FormName").value == "") {
      document.getElementById("error1").innerHTML = "Please Add a valid Quiz Name";
    } else {
      document.getElementById("error1").innerHTML = "";
      document.getElementById("box2").className = "box1";
      document.getElementById("box2.1").innerHTML = "";
      var QuizName = document.createElement("h2");
      QuizName.setAttribute("id", "QuizName");
      QuizName.style.color = "blue";
      QuizName.innerHTML = document.getElementById("FormName").value;
      document.getElementById("box2.1").appendChild(QuizName);

      document.getElementById("box2.3").innerHTML = "";
      let button = document.createElement("button");
      // button.setAttribute("onclick", "Quiz.CreateQuiz()");
      button.id = "CreateQuiz";
      button.innerHTML = "Create Quiz";
      document.getElementById("box2.3").appendChild(button);
    }
  },

  getQuiz_Questions() {
    return this.Quiz_Questions;
  },
  //Create Question
  CreateQuestion() {
    if (document.getElementById("FormName").value == "") {
      document.getElementById("error2").innerHTML = "Please Add a valid Quiz Name";
    } else if (document.getElementById("Question").value == "") {
      document.getElementById("error2").innerHTML = "Please Add a valid Question";
    } else {
      document.getElementById("error2").innerHTML = "";
      let Question = {
        Question: document.getElementById("Question").value,
        Answer: $("#answer option:selected").val(),
        Optons: [document.getElementById("opt1").value, document.getElementById("opt2").value, document.getElementById("opt3").value, document.getElementById("opt4").value]
      }

      Quiz.getQuiz_Questions().push(Question);

      Quiz.ShowQuestion();
    }
  },

  //Delete Question
  DeleteQue(ind) {
    this.Quiz_Questions.splice(ind, 1);
    Quiz.ShowQuestion();
  },

  //Show Questions
  ShowQuestion() {

    document.getElementById("box2.2").innerHTML = "";
    this.Quiz_Questions.forEach(function (element, index) {

      div = document.createElement("div");
      div.setAttribute("class", "question");

      //Questions
      var questionNo = document.createElement("h5");
      questionNo.style.display = "inline";
      questionNo.innerHTML = "Question " + (index + 1) + ": ";
      div.appendChild(questionNo);

      var question = document.createElement("P");
      question.style.display = "inline";
      question.innerHTML = element.Question + "             ";
      div.appendChild(question);
      var br = document.createElement("br");
      div.appendChild(br);

      //Answer
      var Answer = document.createElement("h5");
      Answer.style.display = "inline";
      Answer.innerHTML = "Answer :"
      div.appendChild(Answer);

      var ans = document.createElement("P");
      ans.style.display = "inline";
      ans.innerHTML = element.Answer;
      div.appendChild(ans);
      div.appendChild(br);

      //Options
      var options = document.createElement("h5");
      options.style.display = "inline";
      options.innerHTML = "Options: ";
      div.appendChild(options);

      var opt = document.createElement("P");
      opt.style.display = "inline";
      (element.Optons).forEach(function (element) {
        let txt = document.createElement("text");
        txt.innerHTML = element + ",";
        opt.appendChild(txt);
      })
      div.appendChild(opt);

      //delete Question
      let button1 = document.createElement("button");
      button1.setAttribute("onclick", "Quiz.DeleteQue(" + index + ")");
      button1.style.marginLeft = "20px";
      button1.style.backgroundColor = "#c64343";
      button1.innerHTML = "Delete";
      div.appendChild(button1);

      document.getElementById("box2.2").appendChild(div);
    });

  },

  getQuestion() {
    return this.Quiz_Questions;
  },
  //Create Quiz
  CreateQuiz() {
    console.log('in craete quiz');
    let q = {
      id: Quiz_id,
      userid: sessionStorage.getItem("admin_userid"),
      Quiz_Name: document.getElementById("FormName").value,
      que: Quiz.getQuestion()
    }

    //store quiz data into db.json server
    alert(JSON.stringify(q));
    AddQuiz(q);

    Quiz_id++;

  },

}

function generatePrandomNo(n) {

  var PrandonmNo = Math.floor((Math.random() * 1000));
  PrandonmNo = PrandonmNo * 100 + n;

  let button1 = document.getElementById("launch" + n);
  button1.style.backgroundColor = "#c64343";
  button1.setAttribute("onclick", "destroyPrandomNo(" + n + ")");
  button1.innerHTML = "Finish Quiz";

  sessionStorage.setItem(n, PrandonmNo);

  live_quiz(n, PrandonmNo);
}

function destroyPrandomNo(n) {
  sessionStorage.removeItem(n);

  document.getElementById("li" + n).className = "";
  document.getElementById("Prandom" + n).style.display = "none";
  document.getElementById("Stud_div" + n).innerHTML = "";
  let button1 = document.getElementById("launch" + n);
  button1.style.backgroundColor = "#8b83d8";
  button1.setAttribute("onclick", "generatePrandomNo(" + n + ")");
  button1.innerHTML = "Launch Quiz";

}

function live_quiz(n, PrandonmNo) {

  document.getElementById("launch" + n).style.backgroundColor = "#c64343";
  document.getElementById("launch" + n).innerHTML = "Finish Quiz";
  document.getElementById("launch" + n).setAttribute("onclick", "destroyPrandomNo(" + n + ")");
  document.getElementById("Prandom" + n).style.display = "inline";
  document.getElementById("Prandom" + n).setAttribute("class", "prandom");
  //document.getElementById("Prandom" + n).setAttribute("onclick", "stud_respopnse(" + n + "," + PrandonmNo + ")");
  document.getElementById("Prandom" + n).innerHTML = PrandonmNo;

  document.getElementById("li" + n).className = "live_quiz";
  let div = document.getElementById("Stud_div" + n);
  div.innerHTML = "";
  let h = document.createElement("h5");
  let txt1 = document.createElement("text");
  txt1.style.marginLeft = "-100px";
  txt1.innerText = "Sr. ";
  h.appendChild(txt1);
  let txt2 = document.createElement("text");
  txt2.innerText = " Student Name ";
  txt2.style.marginLeft = "100px";
  h.appendChild(txt2);
  let txt3 = document.createElement("text");
  txt3.style.marginLeft = "100px"
  txt3.innerText = "Marks";
  h.appendChild(txt3);
  let txt4 = document.createElement("text");
  txt4.style.marginLeft = "100px"
  txt4.innerText = "Date&Time";
  h.appendChild(txt4);
  div.appendChild(h);

  let ol = document.createElement("ol");
  ol.id = "Stud_res" + n;
  div.appendChild(ol);


  stud_respopnse(n, PrandonmNo)


}

function stud_respopnse(n, PrandonmNo) {
  var url = "http://localhost:3001/Student_response";
  fetch(url).then((response) => response.json())
    .then((data) => display_Student(data, n, PrandonmNo));
}

function display_Student(data, n, PrandonmNo) {
  document.getElementById("Stud_res" + n).innerHTML = "";
  data.forEach(function (element) {
    if ((element.Q_id) == (PrandonmNo)) {

      let li = document.createElement("li");

      let name = document.createElement("text");
      name.innerHTML = element.sname;
      name.style.marginLeft = "60px";
      li.appendChild(name);

      let marks = document.createElement("text");
      marks.style.marginLeft = "150px";
      marks.innerHTML = element.Stud_marks;
      li.appendChild(marks);

      let t_d = document.createElement("text");
      t_d.style.marginLeft = "100px";
      t_d.innerHTML = element.time;
      li.appendChild(t_d);

      document.getElementById("Stud_res" + n).appendChild(li);
    }
  })
}

// [
// {
//   "id": 1,
//   "userid": "user1",
//   "Quiz_Name": "First Quiz",
//    "que": [
//              { "Question": "Question 1", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 2", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 3", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 4", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 5", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 6", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] }
//           ]
// },
//
// {
//     "id": 2,
//     "userid": "user1",
//     "Quiz_Name": "Second Quiz",
//      "que": [
//              { "Question": "Question 1", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 2", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 3", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 4", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 5", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 6", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] }
//             ]
//    },
//
// {
//   "id": 3,
//   "userid": "user1",
//   "Quiz_Name": "Third Quiz",
//    "que": [
//              { "Question": "Question 1", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 2", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 3", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 4", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 5", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] },
//              { "Question": "Question 6", "Answer": "Answer ", "Optons": ["Option1", "Option2", "Option3", null, "Option4"] }
//           ]
// },
// ] 


