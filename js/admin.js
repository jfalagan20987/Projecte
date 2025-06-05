document.addEventListener("DOMContentLoaded",()=>{
  const btnLogout = document.getElementById("logout");

  btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    location.href = `..${BASE_URL}/views/login.html`;
  })
});