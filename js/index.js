const BASE_URL = window.location.hostname === "127.0.0.1" ? "" : "/Projecte";

document.addEventListener("DOMContentLoaded",()=>{
  const btnMenu = document.querySelector("#btn-menu");
  const navHeader = document.querySelector("#nav-header");
  const btnClose = document.querySelector("#btn-close img");
  const logoBtn = document.querySelector("#inicio a");
  const menuInicio = document.getElementById("index");
  const menuClasificaciones = document.getElementById("clasificaciones");
  const menuEstadisticas = document.getElementById("estadisticas");
  const menuCalendario = document.getElementById("calendario");
  const menuHistoria = document.getElementById("historia");
  const menuAboutUs = document.getElementById("aboutUs");
  const menuLogin = document.getElementById("login");
  const menuRegister = document.getElementById("register");
  const menuLogout = document.getElementById("logout");

  //Funcionamiento menú
  console.log(btnMenu);
  btnMenu.addEventListener("click", () => {
    navHeader.classList.add("nav-visible")
  });
  btnClose.addEventListener("click", () => {
    navHeader.classList.remove("nav-visible")
  });

  logoBtn.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/index.html`;
  })

  //Enlaces menú
  menuInicio.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/index.html`;
  })
  menuClasificaciones.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/views/clasificaciones.html`;
  })
  menuEstadisticas.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/views/estadisticas.html`;
  })
  menuCalendario.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/views/calendario.html`;
  })
  menuHistoria.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/views/historia.html`;
  })
  menuAboutUs.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/views/aboutus.html`;
  })
  menuLogin.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/views/login.html`;
  })
  menuRegister.addEventListener("click", ()=>{
    location.href = `..${BASE_URL}/views/register.html`;
  })

  //Enlaces artículo
  const readArticle1 = document.getElementById("articulo1");
  const readArticle2 = document.getElementById("articulo2");
  const readArticle3 = document.getElementById("articulo3");
  const readArticle4 = document.getElementById("articulo4");
  const readArticle5 = document.getElementById("articulo5");
  const readArticle6 = document.getElementById("articulo6");
  if(readArticle1){
    readArticle1.addEventListener("click", ()=>{
      location.href = `..${BASE_URL}/views/article_detail.html`;
    })
  }
  if(readArticle2){
    readArticle2.addEventListener("click", ()=>{
      location.href = `..${BASE_URL}/views/article_detail.html`;
    })
  }
  if(readArticle3){
    readArticle3.addEventListener("click", ()=>{
      location.href = `..${BASE_URL}/views/article_detail.html`;
    })
  }
  if(readArticle4){
    readArticle4.addEventListener("click", ()=>{
      location.href = `..${BASE_URL}/views/article_detail.html`;
    })
  }
  if(readArticle5){
    readArticle5.addEventListener("click", ()=>{
      location.href = `..${BASE_URL}/views/article_detail.html`;
    })
  }
  if(readArticle6){
    readArticle6.addEventListener("click", ()=>{
      location.href = `..${BASE_URL}/views/article_detail.html`;
    })
  }

  //Display del menú en base si la sesión está iniciada o no
  const haySesionIniciada = localStorage.getItem("loggedIn") === "true";

  if (haySesionIniciada){
    menuLogin.style.display = "none";
    menuRegister.style.display = "none";
    menuLogout.style.display = "initial";
    
    //Control usuario inactivo
    let timeout;
    function inactivo(){
      location.href = `..${BASE_URL}/views/login.html`;
      alert("Sesión cerrada por inactividad.")
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("username");
    }

    function reiniciarTemporizador(){
      clearTimeout(timeout);
      timeout = setTimeout(inactivo, 120000);
    }

    // ["click", "mousemove", "scroll", "keydown"].forEach(event =>
    //   document.addEventListener(event, reiniciarTemporizador())
    // );

    document.addEventListener("click", ()=>(reiniciarTemporizador()));
    document.addEventListener("mousemove", ()=>(reiniciarTemporizador()));
    document.addEventListener("scroll", ()=>(reiniciarTemporizador()));
    document.addEventListener("keydown", ()=>(reiniciarTemporizador()));

  }else{
    menuLogin.style.display = "initial";
    menuRegister.style.display = "initial";
    menuLogout.style.display = "none";
  }

  //Funcionalidad cerrar sesión
  menuLogout.addEventListener("click", ()=>{
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    location.href = `..${BASE_URL}/index.html`;
  })
})
