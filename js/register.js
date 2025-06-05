document.addEventListener("DOMContentLoaded",()=>{
  //Variables
  const formulari = document.getElementById("registro");
   document.getElementById("registrar").classList.add("deshabilitado");

  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const psswd = document.getElementById("psswd");
  const repPsswd = document.getElementById("repetirPsswd");
  const tipoUser = document.querySelectorAll('input[name="tipus"]');
  let tipoUsuario;

  //Array de booleanos para controlar errores
  const errores = {email: true, username: true, psswd: true, repPsswd: true, tipo: true};

  //Variables para mensajes de error y confirmación
  const errorEmail = document.getElementById("error-email");
  const errorUsername = document.getElementById("error-username");
  const errorPsswd = document.getElementById("error-psswd");
  const errorRepetir = document.getElementById("error-repetir");
  //const errorTipo = document.getElementById("error-tipo");
  const formCorrecto = document.getElementsByClassName("formCorrecto");

  //Evitar copy paste en repetir contraseña
  const repetirPsswd = document.getElementById("repetirPsswd");
  repetirPsswd.addEventListener("paste", (e)=>{
    e.preventDefault();
  })

  //Funcionalidad tecla enter
  document.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
      formulari.requestSubmit();
    }
  })

  //Requisitos contraseña
  let exp = /^[a-zA-Z0-9]{5,15}$/;

  //Funciones
  function validarEmail(){
    if (email.value.trim() === ""){
      errorEmail.textContent = "Este campo es obligatorio.";
      errores.email = true;
    }else{
      errorEmail.textContent = "";
      errores.email = false;
    }

    habilitarSubmit();
  };

  function validarUsername(){
    if (username.value.trim() === ""){
      errorUsername.textContent = "Este campo es obligatorio.";
      errores.username = true;
    }else{
      errorUsername.textContent = "";
      errores.username = false;
    }

    habilitarSubmit();
  }

  const nivelesFortaleza = document.getElementById("nivelesFortaleza");

  function validarPsswd(){
    let fortaleza = 0;
    const minus = /[a-z]/.test(psswd.value);
    const mayus = /[A-Z]/.test(psswd.value);
    const numeros = /[0-9]/.test(psswd.value);
    const length = psswd.value.length >= 5 && psswd.value.length <= 15;
    const counterFiltros = [minus, mayus, numeros].filter(Boolean).length;
 
    if(!length){
      fortaleza = 0;
    } else if(counterFiltros === 1){
      fortaleza = 1;
    }else if (counterFiltros === 2){
      fortaleza = 2;
    }else if (counterFiltros === 3 && psswd.value.length >= 8){
      fortaleza = 3;
    };

    //Reinicio para el switch
    if(fortaleza>0){
      nivelesFortaleza.classList.remove("rojo", "amarillo", "verde");
    }

    //Switch
    switch(fortaleza){
      case 1:
        nivelesFortaleza.classList.add("rojo");
        nivelesFortaleza.style.width = "33%";
        break;
      case 2:
        nivelesFortaleza.classList.add("amarillo");
        nivelesFortaleza.style.width = "66%";
        break;
      case 3:
        nivelesFortaleza.classList.add("verde");
        nivelesFortaleza.style.width = "100%";
        break;
      default:
        nivelesFortaleza.style.width = "0%";
    }

    if(!exp.test(psswd.value)){
      errorPsswd.textContent = "La contraseña debe tener entre 5 y 15 caracteres y ningún caracter especial."
      errores.psswd = true;
    }else{
      errorPsswd.textContent = "";
      errores.psswd = false;
    }

    habilitarSubmit();
  }

  function validarRepPsswd(){
    if (!(repPsswd.value === psswd.value)){
      errorRepetir.textContent = "No coincide con la contraseña."
      errores.repPsswd = true;
    }else{
      errorRepetir.textContent = "";
      errores.repPsswd = false;
    }

    habilitarSubmit();
  }

  //Funcionalidad icono ojoPsswd
  const btnOjo = document.getElementById("ojoPsswd");
  btnOjo.addEventListener("click",()=>{
    if(psswd.type === "password"){
      psswd.type = "text";
    }else{
      psswd.type = "password";
    }
  })

  // if(tipoUser){
  //   tipoUsuario=tipoUser.value;
  //   errores.tipo = false;
  //   console.log(tipoUsuario);
  // }

  //Guardar tipo de usuario (he tenido que buscar cómo se hacía porque no era capaz)
  function seleccion(valor){
    tipoUsuario = valor;
  };
  function seleccionUsuario(tipoUser, callback){
    tipoUser.forEach(tipo =>{
      tipo.addEventListener("change", event=>{
        callback(event.target.value);
        console.log(tipoUsuario);
        errores.tipo = false;

        habilitarSubmit();
      })
    })
  }

  //Ejecutamos funciones de comprobacion
  email.addEventListener("input", validarEmail);
  username.addEventListener("input", validarUsername);
  psswd.addEventListener("input", validarPsswd);
  repPsswd.addEventListener("input", validarRepPsswd);
  seleccionUsuario(tipoUser, seleccion);
  
  function habilitarSubmit(){
    if (JSON.stringify(errores).includes("true") === false){
      document.getElementById("registrar").classList.replace("deshabilitado", "habilitado");
      document.getElementById("registrar").removeAttribute("disabled");
    }
  }


  //LOCAL STORAGE
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  
  function yaExiste(email, username){
    return usuarios.some(usuario =>
      usuario.email === email || usuario.username === username
    );
  }

  //Evento submit
  formulari.addEventListener("submit", (e)=>{
    e.preventDefault();

    if (habilitarSubmit){
      const comprobarEmail = email.value;
      const comprobarUsername = username.value;
      if (yaExiste(comprobarEmail, comprobarUsername)){
        formCorrecto[0].innerHTML = `<p class="error">Usuario y/o email ya registrados</p>`;
        email.focus();
        formulari.classList.add("shake");
        formulari.addEventListener("animationend", () => {
          formulari.classList.remove("shake");
        }, { once: true });
        errores.email = errores.username = true;
        habilitarSubmit();
      }else{
        const nuevoUsuario = {email: comprobarEmail, username: comprobarUsername, psswd: psswd.value, tipo: tipoUsuario};
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log(usuarios);

        //Se inicia la sesión
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username.value);

        //Redirección
        if (tipoUsuario === "admin"){
          location.href = `../views/admin.html`;
        } else{
          location.href = `../index.html`;
        }
        
        formulari.reset();
      }
      
    }
  })

  console.log(usuarios);

});