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

async function signupNewUser(event) {
    event.preventDefault()
    let getInfoUser = getInfoNewUser()
    const validateRegex = getInfoUser[0]
    if (validateRegex) {
        const resultFetchInsert = await insertNewuser(getInfoUser[1])
        if (resultFetchInsert) {
            contentModalSuccess('Register')
            resetInput()
        }
    } else {
        contentModalDanger('Register')
    }

}

async function loginUser(event) {
    event.preventDefault()
    const infoCurrentUser = getInfoCurrentUser()
    console.log(infoCurrentUser);
    if (infoCurrentUser) {
        const resultFetchSelectUser = await selectCurrentuser(infoCurrentUser.email)
        if (resultFetchSelectUser.length != 0) {
            contentModalSuccess('Login')
            resetInput()
        }else{
            contentModalDanger('Login')
        }
    }else{
        contentModalDanger('Login')

    }

}

// Fill The Content Modal Success
function contentModalSuccess(descriptionModal) {
    const modalsContainer = document.querySelector('.modal ')
    const modalsWrapper = document.querySelector('.modal-wrapper ')
    const titleModalH3 = document.querySelector('.modal-wrapper h3')
    const descriptionModalP = document.querySelector('.modal-wrapper p')
    const modalBtn = document.querySelector('.modal-btn')

    titleModalH3.innerHTML = 'Success'
    descriptionModalP.innerHTML = `Your ${descriptionModal} Is Sucessfuly`

    modalsContainer.classList.add('active')
    modalsWrapper.className = 'modal-wrapper active modal-success'

    modalBtn.addEventListener('click', closeModal)
}


// Fill The Content Modal Danger
function contentModalDanger(descriptionModal) {
    const modalsContainer = document.querySelector('.modal')
    const modalsWrapper = document.querySelector('.modal-wrapper')
    const titleModalH3 = document.querySelector('.modal-wrapper h3')
    const descriptionModalP = document.querySelector('.modal-wrapper p')
    const modalBtn = document.querySelector('.modal-btn')

    titleModalH3.innerHTML = 'Unsuccess'
    descriptionModalP.innerHTML = `Your ${descriptionModal} Is Failed`

    modalsContainer.classList.add('active')
    modalsWrapper.className = 'modal-wrapper active modal-danger'

    modalBtn.addEventListener('click', closeModal)

}


// Close Modal With Click
function closeModal() {
    const modalsContainer = document.querySelector('.modal')
    const modalsWrapper = document.querySelector('.modal-wrapper')
    modalsContainer.classList.remove('active')
    modalsWrapper.className = 'modal-wrapper'
}


// GET THE INFO NEW USER FROM INPUTS
function getInfoNewUser() {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const regexName = /^(\w){3,15}$/

    const inputName = document.querySelector('.signup .input-name')
    const inputEmail = document.querySelector('.signup .input-email')
    const inputPassword = document.querySelector('.signup .input-password')

    let inputNameValue = inputName.value.trim()
    let inputEmailValue = inputEmail.value.trim()
    let inputPasswordValue = inputPassword.value.trim()
    let infoNewUser = {
        name: inputNameValue,
        email: inputEmailValue,
        password: inputPasswordValue,
    }

    let resultValidate = validateInputs(inputEmailValue, regexEmail) && validateInputs(inputPasswordValue, regexPassword) && validateInputs(inputNameValue, regexName)

    return [resultValidate, infoNewUser];
}

// GET THE INFO Current USER FROM INPUTS
function getInfoCurrentUser() {

    const inputEmail = document.querySelector('.login .input-email')
    const inputPassword = document.querySelector('.login .input-password')

    let inputEmailValue = inputEmail.value.trim()
    let inputPasswordValue = inputPassword.value.trim()

    let infoUser = {
        email: inputEmailValue,
        password: inputPasswordValue,
    }

    const isValidInput = inputEmailValue && inputPasswordValue

    if (isValidInput) {
        return infoUser;
    } else {
        return false
    }

}


// Validate Inputs With Regex
function validateInputs(inputValue, regex) {
    const validateRegex = regex.test(inputValue)
    if (validateRegex) {
        return true
    } else {
        return false
    }
}


// Rest All Inputs
function resetInput() {
    const formElem = document.querySelectorAll('form')
    formElem.forEach(form => {
        form.reset();
    })
}

// Fetch Insert New User
async function insertNewuser(user) {
    const { error } = await supabaseCon
        .from('users')
        .insert([user])
    if (error) {
        return false
    } else {
        return true
    }

}

// Fetch Select Current User
async function selectCurrentuser(emailUser) {
    const { data, error } = await supabaseCon
        .from('users')
        .select()
        .eq('email', emailUser)
    if (error) {
        return false
    }
    if (data) {
        return data
    }

}

signupBtn.addEventListener('click', signupNewUser)
loginBtn.addEventListener('click', loginUser)