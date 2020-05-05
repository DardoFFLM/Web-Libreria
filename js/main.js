"use strict";
let enviar = document.querySelector(".submit");
enviar.addEventListener("click", mostrar);

function mostrar() {
    let terms = document.querySelector("#terms").checked;
    let alerta = document.querySelector(".alerta-oculta");
    let nombre = document.querySelector("#nombre").value;
    let apellido = document.querySelector("#apellido").value;
    let pais = document.querySelector("#country");
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#pass").value;
    let repass = document.querySelector("#repass").value;
    let captcha = document.querySelector(".captcha").value;
    let captchaRes = document.querySelector("#captchaRes").value;
    if ((nombre === "") || (apellido === "") || (email === "")) {
        alerta.innerHTML = "Por favor, rellene los campos.";
        alerta.classList.add("alerta-visible");
    }
    else
        if (pass != repass){
            alerta.innerHTML = "Las contraseñas no son identicas.";
            alerta.classList.add("alerta-visible");
        }
    else
        if (!terms){
            alerta.innerHTML = "Por favor, acepte los terminos y condiciones.";
            alerta.classList.add("alerta-visible");
        }
       /* else
            if ((captchaRes != captcha)) {
                alerta.innerHTML = "El captcha es incorrecto.";
                alerta.classList.add("alerta-visible");
            }
        */
}