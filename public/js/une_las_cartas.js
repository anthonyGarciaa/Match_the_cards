const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const cartas = document.querySelectorAll(".card");
const narrador = document.querySelector(".narrador");
const numOportunidades=document.querySelector('.oportunidades')


for(card of cartas){
  card.children[0].setAttribute('draggeable','false')
}

let existeParaVolteada = false;

let puntuacion = 0;
let oportunidades = 10;

let intervalodeMuestra=setInterval(()=>{
 for(card of cartas){
    (card.children[0].getAttribute('class')==='novolteada')
   ?card.children[0].setAttribute('class','volteada')
    :card.children[0].setAttribute('class','novolteada')
    
  }
},600)

setTimeout(()=>{
  clearInterval(intervalodeMuestra);
  ejecutarPrograma()
},5000)

 const ejecutarPrograma=()=>{


for (card of cartas) {
  card.addEventListener("click", (e) => {
    let nombreElemento = e.target.__proto__.constructor.name;

    const paravoltear = () => {
      if (nombreElemento === "HTMLDivElement") {
        let imagen = e.target.children[0];
        if (imagen.getAttribute("class") == "novolteada") {
          imagen.setAttribute("class", "paraVoltear");
          e.target.style.backgroundColor = "rgba(213, 212, 212, 0.55)";

        } else{
           imagen.setAttribute("class", "novolteada")
           e.target.style.backgroundColor = "rgba(128, 128, 128, 0.55)"

        };
      } else if (nombreElemento === "HTMLImageElement") {
        if(e.target.getAttribute("class") == "novolteada"){
          e.target.setAttribute("class", "paraVoltear")
          e.target.parentElement.style.backgroundColor = "rgba(213, 212, 212, 0.55)";
        }
        else{
           e.target.setAttribute("class", "novolteada");
           e.target.parentElement.style.backgroundColor = "rgba(128, 128, 128, 0.55)";
        }
      }
    };
    paravoltear();

    let paraVoltear = document.querySelectorAll(".paraVoltear");

    if (paraVoltear.length == 2) {
      for (voltear of paraVoltear) {
        voltear.parentElement.style.backgroundColor =
          "rgba(128, 128, 128, 0.55)";
        voltear.setAttribute("class", "volteada");
      }
      const volteadas = document.querySelectorAll(".volteada");

      setTimeout(() => validarSiSonIguales(volteadas[0], volteadas[1]), 500);
    }
  });
}

const validarSiSonIguales = (imagen1, imagen2) => {
  if (imagen1.getAttribute("src") === imagen2.getAttribute("src")) {
    puntuacion++;
    narrador.textContent = `Puntuacion: ${puntuacion}`;
    imagen1.parentElement.style.animation =
      "desaparecer 1s cubic-bezier(0.29, 0.33, 0.43, 1.02)";
    imagen2.parentElement.style.animation =
      "desaparecer 1s cubic-bezier(0.29, 0.33, 0.43, 1.02)";
    setTimeout(() => {
      imagen1.parentElement.remove();
      imagen2.parentElement.remove();
    }, 501);
    validarSiSeAcaba();
  } else {
    imagen1.parentElement.style.animation = "error .9s forwards";
    imagen2.parentElement.style.animation = "error .9s forwards";
    imagen1.setAttribute("class", "novolteada");
    imagen2.setAttribute("class", "novolteada");
    ////
    setTimeout(() => {
      imagen1.parentElement.style.animation = "none";
      imagen2.parentElement.style.animation = "none";
      oportunidades--
      numOportunidades.textContent=`Oportunidades: ${oportunidades}`
      if(oportunidades===0){
       cartas.forEach(el=>el.remove())
       validarSiSeAcaba()
      }
      
    }, 1000);
  }
};

const validarSiSeAcaba = () => {
  if (container.children.length === 2) {
    modal.children[1].children[0].addEventListener("click", () =>
      Location.reload()
    );
    modal.children[1].children[1].addEventListener("click", () =>
      history.back()
    );
    setTimeout(() => {
      narrador.textContent='';
      numOportunidades.textContent='';
      modal.style.animation = "aparecer 1s forwards";
    }, 1000);
  }
  if(container.children.length===0){
    setTimeout(() => {
      document.querySelector('.modal p').className='lose';
      narrador.textContent='';
      numOportunidades.textContent='';
      modal.children[0].textContent='Has perdido la partida'
      modal.style.animation = "aparecer 1s forwards";
    }, 1000);
  }
};

}