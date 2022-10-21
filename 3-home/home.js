function language(){
    var lan = $("#language option:selected").val();
    sessionStorage.setItem("admin_lang", lan);
    localStorage.setItem("admin_lang", lan);
    localization(lan);
}

function sign_up() {
    document.getElementById("sign_up_box").style.display = "block";
    document.getElementById("sign_in_box").style.display = "none";
    document.getElementById("error1").innerHTML = "";
}

function register() {
    let user = {
        fname: document.getElementById("user_fname").value,
        lname: document.getElementById("user_lname").value,
        uname: document.getElementById("user_uname").value,
        password: document.getElementById("user_password").value,
        email: document.getElementById("user_email").value,
    }

    if (user.fname == "" || user.uname == "" || user.password == "") {
        document.getElementById("error1").innerHTML = "First Name , User Name and Password is required";
    } else {
        fetch('https://saurabhkumarr99.github.io/database/db.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                alert('Success:', data);
            })
            .catch((error) => {
                alert('Error:', error);
            });
    }
}

function sign_in() {
    document.getElementById("sign_up_box").style.display = "none";
    document.getElementById("sign_in_box").style.display = "block";
    document.getElementById("error1").innerHTML = "";
}


function login() {

    let admin = {
        uname: document.getElementById("admin_fname").value,
        password: document.getElementById("admin_password").value,
    }

    if (admin.uname == "" || admin.password == "") {
        document.getElementById("error1").innerHTML = "User Name and Password is required";
    } else {

        //fetch all registered users
        allUsers().then(users => {
            
            let {Users}=users;
            //validation
            var user = validation(Users, admin);

            if (user.id) {
                sessionStorage.setItem("admin_name", user.fname);
                sessionStorage.setItem("admin_userid", user.uname);
                window.location = 'https://saurabhkumarr99.github.io/LiveQuiz/4-admin/admin.html';
                
            } else {
                sign_up();
            }
        });
    }

}


async function allUsers() {
    const res = await fetch('https://saurabhkumarr99.github.io/database/db.json');

    var users = await res.json();

    return users;
}


function validation(users, admin) {
    var user = 0;
     console.log(typeof(users));
    console.log(JSON.stringify(users));
    users.forEach(element => {
        console.log(JSON.stringify(users));
        if (element.uname == admin.uname) {
            if (element.password == admin.password) {
                user = element;
                 console.log((element));
                console.log((user));
                return user;
            }
        }
    });

   return user;
}
