window.onload = function () {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("click", muestraPosicion);

    function muestraPosicion(e) {
        console.log(e.offsetX, e.offsetY);
    }

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




    let palabras = ["Filosofia", "Camiones", "Cantante", "Carruaje", "Obligacion", "Silla", "Pais", "Aumento", "Ropa", "Periodico", "Ataque", "Tambor", "Mensaje", "Almeja", "Descripcion", "Economia", "Orientacion", "Realidad", "Color", "Pulimento", "Cirugia", "Partida", "Verano", "Aplastar", "Seleccion", "Bandera", "Cena", "Cuaderno", "Comunicacion", "Bota", "Rueda", "Cuello", "Pantalones", "Cebra", "Caliente", "Cuenca", "Invierno", "Amigo", "Cabra", "Gobernador", "Operacion", "Carcasa", "Confusion", "Entusiasmo", "Solucion", "Tambor", "Unidad", "Intento", "Reparto", "Tos", "Recurso", "Rango", "Contaminacion", "Seleccion", "Rebaño", "Caracoles", "Minuto", "Lienzo", "Papo", "Vacaciones", "Cuerno", "Miel", "Fiesta", "Matrimonio", "Muebles", "Habitacion", "Truco", "Pintura", "Nota", "Silbato", "Biblioteca", "Accion", "Responsabilidad", "Relacion", "Bufanda", "Voz", "Artesano", "Ranas",
    "Descripcion", "Huevos", "Boligrafo", "Patos", "Clasificacion", "Banda", "Video", "Trabajador", "Pizza", "Oreja", "Organizacion", "Sociedad", "Corcho", "Producto", "Jugo", "Creador", "Mermelada", "Trabajador", "Letras", "Carbon", "Casa", "Giro", "Articulo", "Vehiculo", "Canasta", "Gobernador", "Joya", "Membresia", "Voz", "Republica", "enfasis", "Ardilla", "Agua", "Tasa", "Miedo", "Profesion", "Pasajero"];

    
    let verde = "green";
    let rojo = "red";

    let divPalabra = document.querySelector(".palabra");

    let button = document.querySelector(".nuevoJuego");

    button.addEventListener("click", startGame);

    let palabra = palabraAleatoria();

    pistas(palabra, divPalabra, seleccionaLetra);

    document.addEventListener(("keydown"), (e) => compruebaTecla(e, palabra));
    document.addEventListener(("click"), (e) => compruebaTecla(e, palabra));

    

    let contador = 0;
    let vidas = 8;


    //REINICIAR
    function startGame() {
        window.location.reload();
    }

    //SELECCIONA UNA PLABRA AL AZAR
    function palabraAleatoria() {
        let palabra;
        palabra = palabras[Math.round(Math.random() * ((palabras.length - 1) - 0) + 0)];
        return palabra.toLocaleLowerCase();
    }



    //SELECCIONA UNA LETRA AL AZAR QUE NO ESTE REPETIDA EN LA PALABRA porejemplo: En PATATA no se podria seleccionar la A ni la T.
    function seleccionaLetra(palabra) {

        let letraIndice = 0;
        do {
            letraIndice = Math.round(Math.random() * ((palabra.length - 1) - 0) + 0);
        } while (palabra.match(new RegExp(palabra[letraIndice], "g")).length >= 2);

        return letraIndice;

    }

    //PINTA 1 o 2 PISTAS EN LA PALABRA SEGÚN SU LONGITUD
    function pistas(palabra, divPalabra, seleccionaLetra) {

        let verde = "green";

        for (let i = 0; i < palabra.length; i++) {
            divPalabra.innerHTML += `<span class=l${i} data-letra=${palabra[i]}></span>`;
        }

        let letra1 = seleccionaLetra(palabra);
        let letra2;

        do {
            letra2 = seleccionaLetra(palabra);
        } while (letra1 === letra2);

        if (palabra.length <= 5) {
            document.querySelector(`.l${letra1}`).textContent = palabra[letra1].toLocaleUpperCase();
            pintaTeclas(palabra[letra1], palabra[letra1], verde);
        } else {
            document.querySelector(`.l${letra1}`).textContent = palabra[letra1].toLocaleUpperCase();
            document.querySelector(`.l${letra2}`).textContent = palabra[letra2].toLocaleUpperCase();
            pintaTeclas(palabra[letra1], palabra[letra2], verde);

        }
    }

    function pintaTeclas(letra1, letra2, color){
        let pintaTeclasPista = document.querySelectorAll(".tecla");
        for(let pinta of pintaTeclasPista){
            if(pinta.textContent == letra1 || pinta.textContent == letra2){
                pinta.style.backgroundColor = color;
                pinta.setAttribute("disabled", true);
            }
        }

    }



    function compruebaTecla(e, palabra) {

        let datas = document.querySelectorAll("[data-letra]");
        let vida = document.querySelector(".vidas");

        //AL APRETAR INTRO SE REINICIA EL JUEGO
        if(e.keyCode == 13){
            document.querySelector(".nuevoJuego").click();
        }

        //COMPROBACIONES

        //SI TENEMOS VIDAS Y (PULSAMOS SOBRE UNA TECLA DEL TECLADO o EL EVENTO DE TECLADO COINCIDE CON UNA LETRA DEL ALFABETO)
        if (vidas != 0 &&  (e.target.className == "tecla" || ((e.keyCode >=65 && e.keyCode <=90)) || e.keyCode == 192)) {

            //SI EL EVENTO DE TECLADO o EL CLICK COINCIDE CON UNA PALABRA QUE ESTA EN EL DICCIONARIO
            if (palabra.includes(e.key) || (palabra.includes(e.target.textContent))) {

                //RECORREMOS LOS ATRIBUTOS DATA-LETRA DE LA PALABRA
                for (let data of datas) {

                    //SI LA LETRA QUE PRESIOANMOS COINCIDE CON EL DATA-ATRIBUTE DEL SPAN, PINTA ESA LETRA DENTRO DE LA ETIQUEA
                    if (data.getAttribute("data-letra") == e.key) {
                        data.textContent = e.key.toUpperCase();
                        pintaTeclas(e.key, e.key, verde);
                    }

                    //LO MISMO PERO SI HACEMOS CLICK SOBRE LA LETRA
                    if (data.getAttribute("data-letra") == e.target.textContent) {
                        data.textContent = e.target.textContent.toUpperCase();
                        e.target.style.backgroundColor = "green";
                        e.target.setAttribute("disabled", true);
                        pintaTeclas(e.key, e.key, verde);
                    }
                }
            
            //SI LA LETRA QUE PULSAMOS O CLICKAMOS NO ESTA EN LA PALABRA    
            } else {
                //CONTADOR QUE NOS VALE PARA PINTAR EL MONIGOTE
                contador++;
                //ELIMINAMOS UNA VIDA DE LA PANTALLA
                vida.removeChild(vida.children[1]);
                
                //FUNCION QUE PINTA TECLAS CASO DE EVENTO TECLADO O RATON
                pintaTeclas(e.target.textContent, e.target.textContent, rojo);
                pintaTeclas(e.key, e.key, rojo)
                
                //FUNCION QUE PINTA EL MUÑECO
                pintaMuñeco(contador);
            }

        }
    }

    function pintaMuñeco(contador) {
        switch (contador) {
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
                document.querySelector(".vidas").innerHTML = "<h1>GAME OVER</h1>"
                break;
            default:
                break;
        }
    }

    function pintaSolucion() {
        let solucion = document.querySelectorAll(".palabra span");
        for(let letra of solucion){
            if(letra.textContent == ""){
                letra.textContent = letra.getAttribute('data-letra').toUpperCase();
                letra.style.color="red";
            }
        }
    }


};







