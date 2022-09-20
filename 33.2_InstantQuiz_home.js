function sign_up() {
    document.getElementById("sign_in").style.backgroundColor = "darkgrey";
    document.getElementById("sign_up").style.backgroundColor = "rgb(155, 213, 194)";
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
        fetch('https://saurabhkumarr99.github.io/database/Users.json', {
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
    document.getElementById("sign_in").style.backgroundColor = "rgb(155, 213, 194)";
    document.getElementById("sign_up").style.backgroundColor = "darkgrey";
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
                console.log(users);
            //validation
            var user = validation(users, admin);
console.log(user);
            if (user.id) {
                sessionStorage.setItem("admin_name", user.fname);
                sessionStorage.setItem("admin_userid", user.uname);
                window.location = 'https://saurabhkumarr99.github.io/Instant_Quiz_admin/';
            } else {
                sign_up();
            }
        });
    }

}


async function allUsers() {
    const res = await fetch('https://saurabhkumarr99.github.io/database/Users.json');

    var users = await res.json();

    return users;
}


function validation(users, admin) {
    var user = 0;
console.log(JSON.stringify(users));
    users.forEach(element => {
        if (element.uname == admin.uname) {
            if (element.password == admin.password) {
                user = element;
                console.log((user));
                //return user;
            }
        }
    });

   // return user;
}




