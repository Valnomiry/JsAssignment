


var userList = [];
var pName = document.getElementById('name');
var email = document.getElementById('email');
var password = document.getElementById('password');
var signIn = document.getElementById('signIn');
var loginBtn = document.getElementById('btnLogin');
var userName = document.getElementById('userName');
var loginForm = document.getElementById('login');
var logoutBtn = document.getElementById('logoutBtn');
var homes = document.querySelectorAll('.home');
var incorrectMessage = document.querySelector('.incorrect');
var loginFlg = 1;  // 1 for login and 2 for sign up
var logedflg = 0;


loadBasicData();

function login() {
    console.log('loginFlg:' + loginFlg)
    loadData();
    if (email.value == '' || email.value.includes(' ') || password.value == '' || password.value.includes(' ')
        || (loginFlg == 2 && pName.value == '' || pName.value.includes(' '))) {
        incorrectMessage.classList.remove('d-none')
        incorrectMessage.innerHTML = 'All inputs is required'
        return;
    }
    else {
        incorrectMessage.classList.add('d-none')
    }
    console.log('email.value:' + email.value)
    if (loginFlg == 2) {
        //check if email  exist
        if (userList) {
            for (let i = 0; i < userList.length; i++) {
                if (email.value.toUpperCase() == userList[i].email.toUpperCase()) {
                    incorrectMessage.classList.remove('d-none');
                    incorrectMessage.innerHTML = 'email already exists'
                    return;

                }

            }
        }
        userList.push({
            userName: pName.value,
            email: email.value,
            password: password.value
        });

        console.log(userList)
        localStorage.setItem('userList', JSON.stringify(userList));
    }
    else if (loginFlg == 1) {
        if (userList) {
            for (let i = 0; i < userList.length; i++) {
                if (email.value.toUpperCase() == userList[i].email.toUpperCase() && password.value.toUpperCase() == userList[i].password.toUpperCase()) {
                    localStorage.setItem('logedUser', userList[i].userName);
                    localStorage.setItem('logedflg', 1);
                    // window.location.href = 'index.html';
                    userName.innerHTML = 'Welcome ' + userList[i].userName;
                    loginForm.classList.add('d-none');
                    homes.forEach(function (home) {
                        home.classList.remove('d-none');
                    });
                    incorrectMessage.classList.add('d-none');
                    logedflg = 1;
                    email.value = '';
                    password.value = '';
                    return;

                }


            }
            incorrectMessage.classList.remove('d-none');
            incorrectMessage.innerHTML = 'incorrect email or password'
            homes.forEach(function (home) {
                home.classList.add('d-none');
            });
            incorrectMessage.classList.remove('d-none');
            logedflg = 0;
            return;
        }
        else
            incorrectMessage.innerHTML = 'incorrect email or password'
    }
}


function sign() {
    console.log(pName)
    if (signIn.innerHTML.toUpperCase() == 'SIGN UP') {
        signIn.innerHTML = 'SIGN IN';
        pName.classList.remove('d-none');
        loginBtn.innerHTML = 'Sign Up';
        loginFlg = 2
    }
    else {
        signIn.innerHTML = 'Sign Up';
        pName.classList.add('d-none');
        loginBtn.innerHTML = 'Login';
        loginFlg = 1
    }
}


function loadData() {
    if (!localStorage.getItem('siteList'))
        return;

    userList = JSON.parse(localStorage.getItem('userList'));
}



function logout() {
    localStorage.removeItem('logedUser');
    userName.innerHTML = 'Welcome';
    loginForm.classList.remove('d-none');
    homes.forEach(function (home) {
        home.classList.add('d-none');
    });
    logedflg = 0;
    localStorage.setItem('logedflg', 0);
}


function loadBasicData() {
    console.log('logedUser:' + logedflg)
    if (localStorage.getItem('logedUser') && localStorage.getItem('logedflg') && localStorage.getItem('logedflg') == 1) {
        userName.innerHTML = 'Welcome ' + localStorage.getItem('logedUser');
        loginForm.classList.add('d-none');
        homes.forEach(function (home) {
            home.classList.remove('d-none');
        });
        incorrectMessage.classList.add('d-none');
    }

}








