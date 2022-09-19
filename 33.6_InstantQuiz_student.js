$(document).ready(function () {
    $("#startQuiz").click(function () {
        startQuiz();
    });
});

//Start Quiz
$(document).on('click', '#submit', function () {
    submit(length, prdNo);
});

function startQuiz() {
    if (document.getElementById("Student_name").value == "") {
        document.getElementById("error3").innerHTML="Please enter your Name";
    } else {
        document.getElementById("error3").innerHTML="";
        var prdNo = document.getElementById("prdNo.").value;
        Q_id = prdNo % 10;
        document.getElementById("container3").setAttribute("class", "container3");
        document.getElementById("Q_N").innerHTML = "";
        document.getElementById("Q_list").innerHTML = "";

        var url = "http://localhost:3001/quiz/" + Q_id;
        fetch(url).then((response) => response.json())
            .then((data) => destructure(data, prdNo));
    }
}

function destructure(data, prdNo) {

    let { Quiz_Name, que } = data;

    document.getElementById("Q_N").innerHTML = Quiz_Name;

    que.forEach(function (element, index) {
        Show_Question(element, index);
        //console.log(JSON.stringify(element));
    });

    let btn = document.createElement("button");
    btn.innerHTML = "Submit";
    //btn.id="submit";
    btn.setAttribute("onclick", "submit(" + que.length + "," + prdNo + ")");
    document.getElementById("submit").innerHTML = "";
    document.getElementById("submit").appendChild(btn);

}

function Show_Question(q, n) {

    let { Question, Optons, Answer } = q;
    Quiz_answer.push(Answer);
    let ans = "ans" + n;

    let qst = document.createElement("li");
    qst.setAttribute("class", "question")
    qst.innerHTML = Question;

    let div = document.createElement("ol");
    Optons.forEach(function (element, index) {

        let o = document.createElement("li");
        o.innerHTML = element;

        let a = document.createElement("input");
        a.type = "radio";
        a.name = ans;
        a.value = "Option" + (index + 1);
        o.appendChild(a);

        div.appendChild(o);
    });

    qst.appendChild(div);

    document.getElementById("Q_list").appendChild(qst);

}

// Storing student response

// let Student_response = {
//     answer0: 1,
// };
// function submit(x) {

//     for (var i = 0; i < x; i++) {
//         var key = "answer" + i;
//         var opt = 'ans' + i;
//         var answer = $("input[type='radio'][name=" + opt + "]:checked").val();;
//         Student_response.key = value;
//         console.log(key + ":" + value);
//     }
//     console.log(JSON.stringify(Student_response));

// }
var Quiz_answer = new Array();
let Student_response = new Array();

function submit(x, prdNo) {

    for (var i = 0; i < x; i++) {
        var answer = $("input[type='radio'][name=ans" + i + "]:checked").val();;
        Student_response.push(answer);
    }

    var Stud_name = document.getElementById("Student_name").value;
    var Stud_marks = calculate(Student_response, Quiz_answer);

    //Store Student response
    Store_Student_info(prdNo, Stud_name, Stud_marks);

    //Display Result to Student
    document.getElementById("container3").innerHTML = "";

    let name = document.createElement("h2");
    name.style.color = "blue";
    name.innerHTML = "Hello " + Stud_name;
    document.getElementById("container3").appendChild(name);
    let txt = document.createElement("p");
    txt.innerHTML = "Your Score Card is :";
    document.getElementById("container3").appendChild(txt);


    // <table>
    let tbl = document.createElement("table");
    //<thead>
    let tbl_head = document.createElement("thead");
    //<tr>
    let tbl_head_tr = document.createElement("tr");
    let tbl_head_tr_th1 = document.createElement("th");
    //<th>
    tbl_head_tr_th1.innerHTML = "Question No.";
    tbl_head_tr.appendChild(tbl_head_tr_th1);
    let tbl_head_tr_th2 = document.createElement("th");
    tbl_head_tr_th2.innerHTML = "Your Answer";
    tbl_head_tr.appendChild(tbl_head_tr_th2);
    let tbl_head_tr_th3 = document.createElement("th");
    tbl_head_tr_th3.innerHTML = "Quiz Answer";
    tbl_head_tr.appendChild(tbl_head_tr_th3);
    tbl_head.appendChild(tbl_head_tr);
    tbl.appendChild(tbl_head);
    //</th></tr></thead>

    //<tbody>
    let tbl_body = document.createElement("tbody");

    for (var i = 0; i < x; i++) {
        //<tr>
        let tbl_body_tr = document.createElement("tr");

        //<td>  
        let tbl_body_tr_td1 = document.createElement("td");
        tbl_body_tr_td1.innerHTML = i + 1;
        tbl_body_tr.appendChild(tbl_body_tr_td1);

        let tbl_body_tr_td2 = document.createElement("td");
        tbl_body_tr_td2.innerHTML = Student_response[i];
        tbl_body_tr.appendChild(tbl_body_tr_td2);

        let tbl_body_tr_td3 = document.createElement("td");
        tbl_body_tr_td3.innerHTML = Quiz_answer[i];
        tbl_body_tr.appendChild(tbl_body_tr_td3);
        tbl_body.appendChild(tbl_body_tr);

    }

    tbl.appendChild(tbl_body);

    let tbl_tfoot = document.createElement("tfoot");
    let tbl_tfoot_tr = document.createElement("tr");
    let tbl_tfoot_tr_td1 = document.createElement("td");
    tbl_tfoot_tr_td1.colSpan = 2;
    tbl_tfoot_tr_td1.innerHTML = "Total Marks";
    tbl_tfoot_tr.appendChild(tbl_tfoot_tr_td1);
    let tbl_tfoot_tr_td2 = document.createElement("td");
    tbl_tfoot_tr_td2.innerHTML = Stud_marks;
    tbl_tfoot_tr.appendChild(tbl_tfoot_tr_td2);
    tbl_tfoot.appendChild(tbl_tfoot_tr);
    tbl.appendChild(tbl_tfoot);
    document.getElementById("container3").appendChild(tbl);

}

//Store Student marks
function Store_Student_info(Q_id, Stud_name, Stud_marks) {
    var t_d = new Date();
    let stud = {
        Q_id: Q_id,
        sname: Stud_name,
        Stud_marks: Stud_marks,
        time: (t_d.getDate() + "-" + (Number(t_d.getMonth()) + 1) + "-" + t_d.getFullYear() + "/" + t_d.getHours() + ":" + t_d.getMinutes() + ":" + t_d.getSeconds())
    }

    fetch('http://localhost:3001/Student_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(stud),
    })
        .then((response) => response.json())
        .then((data) => {
            alert('Response Submitted Successfully:', data);
        })
        .catch((error) => {
            alert('Error:', error);
        });
}

function calculate(arr1, arr2) {
    var marks = 0;
    for (var i = 0; i < arr2.length; i++) {
        if (arr1[i] == arr2[i]) {
            marks = marks + 4;
        }
    }
    return marks;
}

