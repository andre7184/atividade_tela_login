const minLength = 6;
const formLogin =  document.getElementById("formLogin");

function showError(input, message) {
    const formInput = input.parentElement;
    formInput.className = "input-group error";
    
    let small = formInput.nextSibling;
    if (!small || small.tagName !== 'SMALL') {
        small = document.createElement('small');
        formInput.parentNode.insertBefore(small, formInput.nextSibling);
    }
    small.textContent = message;
}

function showValido(input) {
    const formInput = input.parentElement;
    if (formInput.nextSibling && formInput.nextSibling.tagName === 'SMALL') {
        formInput.nextSibling.remove();
    }
    formInput.className = "input-group sucesso";
}

function validaSenha(input) {
    const senha = input.value;
    const validations = [
        { regex: new RegExp(`.{${minLength},}`), message: `A senha deve ter ${minLength} ou mais caracteres` },
        { regex: /[A-Z]/, message: 'A senha deve conter pelo menos uma letra maiúscula' },
        { regex: /[a-z]/, message: 'A senha deve conter pelo menos uma letra minúscula' },
        { regex: /\d/, message: 'A senha deve conter pelo menos um número' },
        { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'A senha deve conter pelo menos um caractere especial' }
    ];
    for (const validation of validations) {
        if (!validation.regex.test(senha)) {
            showError(input, validation.message);
            return false;
        }
    }
    showValido(input);
    return true;
}

function validaCampo(input) {
    let isValid = true;
    if (!input.value) {
        showError(input,'Este campo é obrigatório');
        isValid = false;
    } else if (input.type === 'password') {
        isValid = validaSenha(input);
    } else {
        showValido(input);
    }
    return isValid;
}

function enviarDados(formulario){
    //enviar os inputs que tiver o atributo name definido do formulário por fetch usando json
    const inputs = formulario.querySelectorAll("input[name]");
     const obj = {};
     inputs.forEach((input) => {
       obj[input.name] = input.value;
     });
     console.log(obj);
    const json = JSON.stringify(obj);
    localStorage.setItem('formLogin', json);
    window.location.href = 'login/login.html';
}

document.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    const inputs = formLogin.querySelectorAll(".required");
    inputs.forEach((input) => {
        isValid = validaCampo(input);
    });
    if (isValid) {
        enviarDados(formLogin);
    }else{
        // adiciona focus no primeiro input com erro
        document.querySelector('.input-group.error').querySelector('input').focus();
    }
});

document.querySelectorAll('input.required').forEach(function(input) {
    var asterisk = document.createElement('span');
    asterisk.className = 'asterisk';
    asterisk.textContent = '*';
    input.parentNode.insertBefore(asterisk, input.nextSibling);
  });
  
