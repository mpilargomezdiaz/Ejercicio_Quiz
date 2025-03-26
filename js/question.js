let pregunta = new Array();
let numero_pregunta = 0;
let respuestas = new Array();
let respuestas_correspondientes = new Array();
let respuesta_correcta = new Array();
let contador = 0;
let puls = 0; 


function datos() {
    fetch('https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple')
    .then(contenido => contenido.json())
    .then(json_contenido => {
    let preguntas = json_contenido.results.map(pregunta => pregunta["question"]);
    pregunta.push(preguntas);
    let respuesta_correcta = json_contenido.results.map(rCorrecta => rCorrecta["correct_answer"]);
    let respuestas_incorrectas = json_contenido.results.map(rIncorrecta => rIncorrecta["incorrect_answers"]);
    respuestas.push(respuestas_incorrectas);
    respuestas.push(respuesta_correcta);
    quiz();
    })
    .catch(error => alert("Se ha producido un error, refresque la página", error.message));
}


let pre = 0;


    function quiz() {
        let question_html = document.getElementById("pregunta");
        let question_arr = pregunta[0][numero_pregunta];
        question_html.innerHTML = question_arr;
        respuestas_correspondientes.push(respuestas[0][pre][0]);
        respuestas_correspondientes.push(respuestas[0][pre][1]);
        respuestas_correspondientes.push(respuestas[0][pre][2]);
        respuestas_correspondientes.push(respuestas[1][pre]);
        respuesta_correcta.push(respuestas[1][pre]);
        let desordenar_datos = desordenar();
        pre++;
        numero_pregunta++;
    }

    function desordenar() { 
        respuestas_correspondientes.sort(() => Math.random() - 0.5);

        let r1 = document.getElementById("respuesta0");
        let r2 = document.getElementById("respuesta1");
        let r3 = document.getElementById("respuesta2");
        let r4 = document.getElementById("respuesta3");

        r1.innerHTML = respuestas_correspondientes[0];
        r2.innerHTML = respuestas_correspondientes[1];
        r3.innerHTML = respuestas_correspondientes[2];
        r4.innerHTML = respuestas_correspondientes[3];
    }
    


function oprimir(i) {
    puls++
    let div_contenedor_mensaje = document.getElementById("mensaje");
    div_contenedor_mensaje.innerHTML = " ";
    div_contenedor_mensaje.className = " ";
    if((respuestas_correspondientes[i] == respuesta_correcta) && (puls == 1)){
        contador++;
        let parrafo1 = document.createElement("p");
        let mensaje_del_parrafo1 = document.createTextNode("¡RESPUESTA CORRECTA!");
        parrafo1.appendChild(mensaje_del_parrafo1);
        div_contenedor_mensaje.appendChild(parrafo1);
        let parrafo2 = document.createElement("p");
        let mensaje_del_parrafo2 = document.createTextNode("Llevas " + contador + " preguntas acertadas. ¡SIGUE ASÍ!");
        div_contenedor_mensaje.classList.add("respuesta_correcta");
        parrafo2.appendChild(mensaje_del_parrafo2);
        div_contenedor_mensaje.appendChild(parrafo2);
    }else if(puls == 1){
        let parrafo3 = document.createElement("p");
        let mensaje_del_parrafo3 = document.createTextNode("Respuesta incorrecta");
        parrafo3.appendChild(mensaje_del_parrafo3);
        div_contenedor_mensaje.appendChild(parrafo3);
        let parrafo4 = document.createElement("p");
        let mensaje_del_parrafo4 = document.createTextNode("Llevas " + contador + " preguntas acertadas. ¡QUE NO DECAIGA EL ÁNIMO!");
        div_contenedor_mensaje.classList.add("respuesta_incorrecta");
        parrafo4.appendChild(mensaje_del_parrafo4);
        div_contenedor_mensaje.appendChild(parrafo4);
    }
        setTimeout(() => {
            div_contenedor_mensaje.classList.add("oculto");
            if(numero_pregunta <=9){
               next();  
            }else{
                resultados();
            }
        }, 3000); 
}



function resultados() {
    let puntuacion_previa = localStorage.getItem("aciertos");
    let lista_de_puntuaciones = puntuacion_previa ? JSON.parse(puntuacion_previa) : [];
    let puntuaciones_indv = {
        aciertos: contador,
        fecha: new Date().toLocaleString()
    };
    lista_de_puntuaciones.push(puntuaciones_indv);
    localStorage.setItem("aciertos", JSON.stringify(lista_de_puntuaciones));
    window.location.href = "http://127.0.0.1:5502/html/results.html";

}


function next() {
    respuestas_correspondientes = [];
    respuesta_correcta = [];
    puls = 0;
     quiz();
}

datos();
