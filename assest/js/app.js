import supabaseCon from '../config/supabaseConfig.js'
const loginBtnTitle = document.getElementById('login');
const signupBtnTitle = document.getElementById('signup');
const signupBtn = document.querySelector('.signup .submit-btn')
const loginBtn = document.querySelector('.login .submit-btn')


loginBtnTitle.addEventListener('click', (e) => {
    let parent = e.target.parentNode.parentNode;
    Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            signupBtnTitle.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

signupBtnTitle.addEventListener('click', (e) => {
    let parent = e.target.parentNode;
    Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
            parent.classList.add('slide-up')
        } else {
            loginBtnTitle.parentNode.parentNode.classList.add('slide-up')
            parent.classList.remove('slide-up')
        }
    });
});

function signupNewUser() {
    
}

signupBtn.addEventListener('click', signupNewUser)