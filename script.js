//Importamos un array de palabras desde otro archivo .js
import { palabras } from "./palabras.js";

window.onload = function () {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("click", muestraPosicion);

    //Función utilizada para situarnos en el canvas y pintar los trazos.
    function muestraPosicion(e) {
        console.log(e.offsetX, e.offsetY);
    }

    //Función que nos selecciona aleatoriamente una palabra
    function palabraAleatoria() {
        let palabra;
        palabra = palabras[Math.round(Math.random() * ((palabras.length - 1) - 0) + 0)];
        return palabra.toLocaleLowerCase();
    }

    //Selecciona aleatoriamente una letra de esa palabra. porejemplo: En PATATA no se podria seleccionar la A ni la T.
    function seleccionaLetra() {
        let letraIndice = 0;
        do {
            letraIndice = Math.round(Math.random() * ((palabra.length - 1) - 0) + 0);
        } while (palabra.match(new RegExp(palabra[letraIndice], "g")).length >= 2);
        return letraIndice;
    }

    let palabra = palabraAleatoria();
    let verde = "green";
    let rojo = "red";
    let contadorFallos = 0;
    var contadorAciertos = 0;
    let vidas = 8;
    //Array donde guardamos las teclas ya pulsadas(teclado). Agregamos también las pistas que nos de al comienzo.
    //Con esto hacemos una cuenta correcta de aciertos y fallos.
    let teclasPulsadas = [];
    let letra1 = 0;
    let letra2 = 0;


    //Tecla de reiniciar juego
    document.querySelector(".nuevoJuego").addEventListener("click", startGame);

    function startGame() {
        window.location.reload();
    }



    pintaPistas();

    //Addeventlisterners para usar el teclado o seleccionar una letra en el teclado de la pantalla.
    document.addEventListener(("keydown"), (e) => compruebaTecla(e, palabra));
    document.addEventListener(("click"), (e) => compruebaTecla(e, palabra));

    //Función que nos pinta dinamicante pistas en la palabra según son
    function pintaPistas() {

        //Pintamos las pistas con la longitud de la paabra. Ponemos la clase l+posicion en el indice y un DATA-ATTRIBUTE con la letra que le corresponderia en la posicion.
        for (let i = 0; i < palabra.length; i++) {
            document.querySelector(".palabra").innerHTML += `<span class=l${i} data-letra=${palabra[i]}></span>`;
        }

        // Asignamos a la variable letra1 un valor que nos da la función selecionaLetra
        letra1 = seleccionaLetra();
        //Inicializamos variable letra2
        letra2;

        //Con este do / while conseguimos que la letra 1 o y la letra 2 no sean iguales.
        do {
            letra2 = seleccionaLetra(palabra);
        } while (letra1 === letra2);


        //Si la palabra es igual o menor que 5 letras. 1 PISTA
        if (palabra.length <= 5) {
            document.querySelector(`.l${letra1}`).textContent = palabra[letra1].toLocaleUpperCase();
            //Sumamos 1 acierto al contador
            contadorAciertos = 1;
            pintaTeclas(palabra[letra1], palabra[letra1], verde);

            //Agregamos la pista al array de teclas ya pulsadas.
            teclasPulsadas.push(palabra[letra1]);

            //Si la palabra es mayor que 5 letras. 2 PISTAS
        } else {
            document.querySelector(`.l${letra1}`).textContent = palabra[letra1].toLocaleUpperCase();
            document.querySelector(`.l${letra2}`).textContent = palabra[letra2].toLocaleUpperCase();
            //sumamos 2 aciertos al contador
            contadorAciertos = 2;
            pintaTeclas(palabra[letra1], palabra[letra2], verde);
            //Agregamos las 2 pistas al array de teclas ya pulsadas.
            teclasPulsadas.push(palabra[letra1]);
            teclasPulsadas.push(palabra[letra2]);

        }
    }

    //Función que pinta las letras o teclas apretadas por el usuario. Recibe 2 letras y un color. (ROJO(fallada) o VERDE(acertada))
    function pintaTeclas(letra1, letra2, color) {
        let pintaTeclasPista = document.querySelectorAll(".tecla");
        for (let pinta of pintaTeclasPista) {
            if (pinta.textContent == letra1 || pinta.textContent == letra2) {
                pinta.style.backgroundColor = color;
                pinta.setAttribute("disabled", true);
            }
        }
    }

   

    function compruebaTecla(e, palabra) {
        let datas = document.querySelectorAll("[data-letra]");
        let vida = document.querySelector(".vidas");
       
        //El juego se reincia haciendo click en la tecla repetir o presionando la tecla intro.
        if (e.keyCode == 13) {
            document.querySelector(".nuevoJuego").click();
        }
        
        //COMPROBACIONES

        //SI TENEMOS VIDAS Y (PULSAMOS SOBRE UNA TECLA DEL TECLADO o EL EVENTO DE TECLADO COINCIDE CON UNA LETRA DEL ALFABETO) Y LA TECLA QUE ESTAMOS PULSANDO NO HA SIDO YA PULSADA
        if (vidas != 0 && (e.target.className == "tecla" || ((e.keyCode >= 65 && e.keyCode <= 90)) || e.keyCode == 192) && teclasPulsadas.includes(e.key)==false) {

            //SI EL EVENTO DE TECLADO o EL CLICK COINCIDE CON UNA PALABRA QUE ESTA EN EL DICCIONARIO
            if (palabra.includes(e.key) || (palabra.includes(e.target.textContent))) {

                //RECORREMOS LOS ATRIBUTOS DATA-LETRA DE LA PALABRA
                for (let data of datas) {
                    if (data.getAttribute("data-letra") == e.key) {
                        data.textContent = e.key.toUpperCase();
                        pintaTeclas(e.key, e.key, verde);
                        contadorAciertos++;
                    }

                    //LO MISMO PERO SI HACEMOS CLICK SOBRE LA LETRA
                    if (data.getAttribute("data-letra") == e.target.textContent) {
                        data.textContent = e.target.textContent.toUpperCase();
                        e.target.style.backgroundColor = "green";
                        e.target.setAttribute("disabled", true);
                        pintaTeclas(e.key, e.key, verde);
                        contadorAciertos++;
                    }
                }

            } else {
                //Contador que usamos para pintar el monigote.
                contadorFallos++;
                //Eliminamos un corazon cada vez que el usuario falle.
                vida.removeChild(vida.children[1]);

                //Llamamos a lal función que pinta teclas usadas por el usuario. (RATON / TECLADO)
                pintaTeclas(e.target.textContent, e.target.textContent, rojo);
                pintaTeclas(e.key, e.key, rojo)

                //Función que pinta el monigote
                pintaMuñeco(contadorFallos);
            }
        }

            //AGREGAMOS LA TECLA PULSADA A UN ARRAY DE LETRAS QUE NOS SIRVE PARA COMPROBAR LAS TECLAS QUE HAN SIDO PULSADAS.
            //TRATAMOS QUE SEA DIFERENTE A undefined PORQUE LAS PULSACIONES DE TECLADO LAS INTRODUCE ASÍ Y NO NOS DEJABA REPETIR LA PULSACION DE RATON
            if(e.key != undefined){
                teclasPulsadas.push(e.key);
            }

        if (contadorAciertos >= palabra.length) {
            document.querySelector(".vidas").innerHTML = "<h1>GANASTE!!</h1>";
            document.querySelector(".nuevoJuego").classList.add("repetir");
        }

        console.log(contadorAciertos);
    }


    //Cuando pierdes. Se pinta la solución con las letras no acertadas
    function pintaSolucion() {
        let solucion = document.querySelectorAll(".palabra span");
        for (let letra of solucion) {
            if (letra.textContent == "") {
                letra.textContent = letra.getAttribute('data-letra').toUpperCase();
                letra.style.color = "red";
            }
        }
    }

    //FUNCION QUE PINTA TRAZOS DEL MONIGOTE SEGUN EL NUMERO DE FALLOS DEL USUARIO
    function pintaMuñeco(contadorFallos) {
        switch (contadorFallos) {
            case 1:
                draw1();
                break;
            case 2:
                draw2();
                break;
            case 3:
                draw3();
                break;
            case 4:
                draw4();
                break;
            case 5:
                draw5();
                break;
            case 6:
                draw6();
                break;
            case 7:
                draw7();
                break;
            case 8:
                draw8();
                pintaSolucion();
                document.querySelector(".vidas").innerHTML = "<h1>GAME OVER</h1>";
                document.querySelector(".nuevoJuego").classList.add("repetir");
                break;
            default:
                break;
        }
    }


    // TRAZOS DE CANVAS
    function draw1() {
        ctx.beginPath();
        ctx.fillStyle = "#45300c";
        ctx.fillRect(50, 350, 400, 15);
        ctx.fillRect(150, 350, 15, -300);
        ctx.fillRect(150, 50, 147, 15);
        ctx.fillRect(297, 50, 15, 50);
        ctx.strokeStyle = "#45300c";
        ctx.lineWidth = 15;
        ctx.moveTo(155, 110);
        ctx.lineTo(194, 60);
        ctx.stroke();
    }

    function draw2() {
        ctx.beginPath();
        ctx.arc(305, 120, 30, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#F1C9B1";
        ctx.fill();
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#F1C9B1";
        ctx.stroke();
    }

    function draw3() {
        ctx.beginPath();
        ctx.moveTo(305, 140);
        ctx.lineTo(305, 240);
        ctx.stroke();
    }

    function draw4() {
        ctx.beginPath();
        ctx.moveTo(305, 238);
        ctx.lineTo(260, 320);
        ctx.stroke();
    }

    function draw5() {
        ctx.beginPath();
        ctx.moveTo(305, 238);
        ctx.lineTo(340, 320);
        ctx.stroke();
    }

    function draw6() {
        ctx.beginPath();
        ctx.moveTo(305, 180);
        ctx.lineTo(350, 240);
        ctx.stroke();
    }

    function draw7() {
        ctx.beginPath();
        ctx.moveTo(305, 180);
        ctx.lineTo(250, 240);
        ctx.stroke();
    }

    function draw8() {
        var centerX = 300;
        var centerY = 145;
        var radius = 10;
        ctx.beginPath();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 1 * Math.PI, true);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.moveTo(280, 115);
        ctx.lineTo(290, 105);
        ctx.moveTo(280, 105);
        ctx.lineTo(290, 115);
        ctx.moveTo(310, 105);
        ctx.lineTo(320, 115);
        ctx.moveTo(310, 115);
        ctx.lineTo(320, 105);
        ctx.stroke();
    }

};







