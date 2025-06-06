document.addEventListener("DOMContentLoaded",()=>{
  const formulari = document.getElementById("loginForm");
  const formMissatge = document.getElementsByClassName("formMissatge");
  const btnUnete = document.getElementById("unete");

  //Redirección al formulario de registro
  btnUnete.addEventListener("click", ()=>{
    location.href = `../views/register.html`;
  })

  //Funcionalidad tecla enter
  document.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
      formulari.requestSubmit();
    }
  })

  //Funcionalidad icono ojoPsswd
  const btnOjo = document.getElementById("ojoPsswd");
  btnOjo.addEventListener("click",()=>{
    if(psswd.type === "password"){
      psswd.type = "text";
    }else{
      psswd.type = "password";
    }
  })

  console.log(localStorage.getItem("usuarios"));

  //Evento submit
  formulari.addEventListener("submit", (e)=>{
    e.preventDefault();

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log(usuarios);

    //Extraemos variables de los campos
    const username = document.getElementById("username").value;
    const psswd = document.getElementById("psswd").value;

    //Comprobamos que existe el usuario y que la contraseña es correcta
    const trobat = usuarios.find(usuario => usuario.username === username && usuario.psswd === psswd);
    console.log(trobat);

    if (trobat){
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("username", username);

      //Redirección
      if (usuarios.find(usuario => usuario.username === username && usuario.tipo === "admin")){
        location.href = `../views/admin.html`;
      } else {
        location.href = `../index.html`;
      }
    }else{
      formMissatge[0].innerHTML = `<p class="error">El usuario y/o la contraseña no son correctos.</p>`;
      formulari.classList.add("shake");
      formulari.addEventListener("animationend", () => {
        formulari.classList.remove("shake");
      }, { once: true });
      username.focus();
    }
  })
});
