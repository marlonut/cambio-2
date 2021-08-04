//serviceWorker

const addBtn = document.querySelector(".add-button");
let deferredPrompt;

const App = {
  SW:null,
  init:()=>{
    navigator.serviceWorker.register("./sw.js",{type:"module"}).then(swReg=>{
      App.SW=swReg.active||swReg.waiting||swReg.installing
      // console.log(App.SW);
    })
    navigator.serviceWorker.getRegistrations().then(register=>{
      // console.log(register);
    })
    navigator.serviceWorker.addEventListener("controllerchange",e=>{
      console.log("update service worker at new version");
    })
  }
};
App.init()
// Referencias de jQuery

var titulo = $("#titulo");
var nuevoBtn = $("#nuevo-btn");
var salirBtn = $("#salir-btn");
var cancelarBtn = $("#cancel-btn");
var postBtn = $("#post-btn");
var avatarSel = $("#seleccion");
var timeline = $("#timeline");

var modal = $("#modal");
var modalAvatar = $("#modal-avatar");
var avatarBtns = $(".seleccion-avatar");
var txtMensaje = $("#txtMensaje");

// El usuario, contiene el ID del héroe seleccionado
var usuario;

// ===== Codigo de la aplicación

function crearMensajeHTML(mensaje, personaje) {
  var content = `
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${personaje}.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${personaje}</h3>
                <br/>
                ${mensaje}
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

  timeline.prepend(content);
  cancelarBtn.click();
}

// Globals
function logIn(ingreso) {
  if (ingreso) {
    nuevoBtn.removeClass("oculto");
    salirBtn.removeClass("oculto");
    timeline.removeClass("oculto");
    avatarSel.addClass("oculto");
    modalAvatar.attr("src", "img/avatars/" + usuario + ".jpg");
  } else {
    nuevoBtn.addClass("oculto");
    salirBtn.addClass("oculto");
    timeline.addClass("oculto");
    avatarSel.removeClass("oculto");

    titulo.text("Seleccione Personaje");
  }
}

// Seleccion de personaje
avatarBtns.on("click", function () {
  usuario = $(this).data("user");

  titulo.text("@" + usuario);

  logIn(true);
});

// Boton de salir
salirBtn.on("click", function () {
  logIn(false);
});

// Boton de nuevo mensaje
nuevoBtn.on("click", function () {
  modal.removeClass("oculto");
  modal.animate(
    {
      marginTop: "-=1000px",
      opacity: 1,
    },
    200
  );
});

// Boton de cancelar mensaje
cancelarBtn.on("click", function () {
  modal.animate(
    {
      marginTop: "+=1000px",
      opacity: 0,
    },
    200,
    function () {
      modal.addClass("oculto");
      txtMensaje.val("");
    }
  );
});

// Boton de enviar mensaje
postBtn.on("click", function () {
  var mensaje = txtMensaje.val();
  if (mensaje.length === 0) {
    cancelarBtn.click();
    return;
  }

  crearMensajeHTML(mensaje, usuario);
});

document.addEventListener("DOMContentLoaded",()=>{
  addBtn.classList.add("add-button--show");
})
window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault();
  deferredPrompt=e;
  addBtn.classList.remove("add-button--show");

});
addBtn.addEventListener("click",()=>{
  addBtn.classList.add("add-button--show");
 deferredPrompt.prompt();
 deferredPrompt.userChoice.then((choiceResult)=>{
   if(choiceResult.outcome==="accepted"){
     alert("User accepted the A2HS prompt");
   }else{
      alert("User dismissed the A2HS prompt")
   }
   deferredPrompt=null;
  })
 });