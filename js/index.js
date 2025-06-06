//BASE_URL necesario para funcionamiento en GitHub
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

  //Enlaces artículo (solo un click sobre el titular o la imagen abrirán el artículo)
  const readArticle1 = document.querySelectorAll("#articulo1 a, #articulo1 img.imgTitular");
  const readArticle3 = document.querySelectorAll("#articulo3 a", "#articulo3 img.imgTitular");
  const readArticle4 = document.querySelectorAll("#articulo4 a", "#articulo4 img.imgTitular");
  const readArticle2 = document.querySelectorAll("#articulo2 a", "#articulo2 img.imgTitular");
  const readArticle5 = document.querySelectorAll("#articulo5 a", "#articulo5 img.imgTitular");
  const readArticle6 = document.querySelectorAll("#articulo6 a", "#articulo6 img.imgTitular");
  if(readArticle1){
    readArticle1.forEach(article =>{
      article.addEventListener("click", ()=>{
        location.href = `..${BASE_URL}/views/article_detail.html`;
      })
    })
  }
  if(readArticle2){
    readArticle2.forEach(article =>{
      article.addEventListener("click", ()=>{
        location.href = `..${BASE_URL}/views/article_detail.html`;
      })
    })
  }
  if(readArticle3){
    readArticle3.forEach(article =>{
      article.addEventListener("click", ()=>{
        location.href = `..${BASE_URL}/views/article_detail.html`;
      })
    })
  }
  if(readArticle4){
    readArticle4.forEach(article =>{
      article.addEventListener("click", ()=>{
        location.href = `..${BASE_URL}/views/article_detail.html`;
      })
    })
  }
  if(readArticle5){
    readArticle5.forEach(article =>{
      article.addEventListener("click", ()=>{
        location.href = `..${BASE_URL}/views/article_detail.html`;
      })
    })
  }
  if(readArticle6){
    readArticle6.forEach(article =>{
      article.addEventListener("click", ()=>{
        location.href = `..${BASE_URL}/views/article_detail.html`;
      })
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

    //Eventos que reinician el temporizador
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


  //Likes :((((((((((((
  const usuarioLogueado = localStorage.getItem("username");
  const likesIdData = JSON.parse(localStorage.getItem("likes")) || {};
  const likesGuardados = JSON.parse(localStorage.getItem("likesGuardados")) || {};

  document.querySelectorAll("article").forEach(articulo =>{
    const articleId = articulo.dataset.id;
    const likeBtn = articulo.querySelector(".likeBtn");
    const likeCounter = articulo.querySelector(".likeCounter");
    const noLike = articulo.querySelector(".noLike");
    const likeChecked = articulo.querySelector(".likeChecked");

    if (!likeBtn || !likeCounter || !noLike || !likeChecked) return;

    likeCounter.textContent = likesGuardados[articleId] || 0;

    if (usuarioLogueado && Array.isArray(likesIdData[usuarioLogueado]) && likesIdData[usuarioLogueado].includes(articleId)) {
      likeChecked.style.display = "inline";
      noLike.style.display = "none";
    } else {
      likeChecked.style.display = "none";
      noLike.style.display = "inline";
    }

    likeBtn.addEventListener("click", () => {
      if (!usuarioLogueado) {
        return;
      }

      if (!Array.isArray(likesIdData[usuarioLogueado])) {
        likesIdData[usuarioLogueado] = [];
      }

      const userLikes = likesIdData[usuarioLogueado];
      const yaLikeado = userLikes.includes(articleId);

      likesGuardados[articleId] =  likesGuardados[articleId] || 0;

      if(!yaLikeado){
        likesGuardados[articleId]++;
        userLikes.push(articleId);
        likeChecked.style.display = "inline";
        noLike.style.display = "none";
      }else{
        likesGuardados[articleId]--;
        const index = userLikes.indexOf(articleId);
        if (index > -1) userLikes.splice(index, 1);
        likeChecked.style.display = "none";
        noLike.style.display = "inline";
      }

      likeCounter.textContent = likesGuardados[articleId];

      likesIdData[usuarioLogueado] = userLikes;
      localStorage.setItem("likes", JSON.stringify(likesIdData));
      localStorage.setItem("likesGuardados", JSON.stringify(likesGuardados));
    });
  });

});