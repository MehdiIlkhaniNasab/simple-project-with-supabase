import supabaseCon from '../config/supabaseConfig.js'
const loginBtnTitle = document.getElementById('login');
const signupBtnTitle = document.getElementById('signup');
const signupBtn = document.querySelector('.signup .submit-btn')
const loginBtn = document.querySelector('.login .submit-btn')
const modalContainer = document.querySelector('.modal')


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


// Validate Inputs
const validateInput = (input, regex, flag = 'g') => {
    const regexValidate = new RegExp(regex, flag)
    const inputValue = input.value.trim()
    const resultValidate = regexValidate.test(inputValue)
    return resultValidate;
}



function showModalContent(container, condition, titleModal) {
    container.classList.add('active')

    container.innerHTML = ''
    if (condition) {
        container.insertAdjacentHTML('beforeend',
            `<div class="modal-wrapper active modal-success">
            <h3 class="modal-title ">Sucess</h3>
            <p class="modal-description">Your ${titleModal} Is Done Successfuly</p>
            <button class="modal-btn btn-success" >Ok</button>
        </div>`)
    } else {
        container.insertAdjacentHTML('beforeend',
            `<div class="modal-wrapper active modal-danger">
            <h3 class="modal-title ">Unsucess</h3>
            <p class="modal-description">Your ${titleModal} Is Failed</p>
            <button class="modal-btn btn-danger" >Ok</button>
        </div>`)
    }
    let modalBtn = document.querySelector('.modal-btn')
    modalBtn.addEventListener('click', closeModal)
}

function closeModal() {
    const modalContainer = document.querySelector('.modal')
    const modalWrapper = document.querySelector('.modal-wrapper')
    modalContainer.classList.remove('active')
    modalWrapper.classList.remove('active')
}

// Fetch Insert New Row
async function insertNewRow(tableName, newInfoObj) {
    const { error } = await supabaseCon
        .from(tableName)
        .insert([newInfoObj])
    if (error) {
        return false
    } else {
        return true
    }

}

// Fetch Get User filter by email
async function getInfoUser(tableName, emailUser, passwordUser) {
    const { data, error } = await supabaseCon
        .from(tableName)
        .select()
        .eq('email', emailUser, 'password', passwordUser)
    if (error) {
        return false
    }
    if (data) {
        return data
    }
}


loginBtn.addEventListener('click', async () => {


    const emailInput = document.querySelector('.login .email-input')
    const passwordInput = document.querySelector('.login .password-input')
    const modalContainer = document.querySelector('.modal')
    modalContainer.classList.add('active')

    const resultFetch = await  getInfoUser('users', emailInput.value.trim(), passwordInput.value.trim())
    if (resultFetch) {
        showModalContent(modalContainer, true, 'Login')
    } else {
        showModalContent(modalContainer, false, 'Login')
    }


})

signupBtn.addEventListener('click', () => {


    const infoNewUser = getInfoNewUser()
    const resultFetch = insertNewRow('users', infoNewUser)

    if (infoNewUser && resultFetch) {
        showModalContent(modalContainer, true, 'Register')
    } else {
        showModalContent(modalContainer, false, 'Register')
    }
})


function getInfoNewUser() {

    const regexValidateName = /^[\w]{3,12}/
    const regexValidateEmail = /^([\w]+.?\w+)+@([a-z]{3,5}).([a-z]{2,3})/
    const regexValidatePass = /[\w{3,12}]/

    const nameInput = document.querySelector('.signup .name-input')
    const emailInput = document.querySelector('.signup .email-input')
    const passwordInput = document.querySelector('.signup .password-input')

    const validateName = validateInput(nameInput, regexValidateName)
    const validateEmail = validateInput(emailInput, regexValidateEmail)
    const validatePass = validateInput(passwordInput, regexValidatePass)

    const resultValidate = validateEmail && validatePass && validateName
    if (resultValidate) {
        let newUser = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        }
        return newUser
    } else {
        return false
    }
}




