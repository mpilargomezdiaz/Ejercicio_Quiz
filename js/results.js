window.onload = function () {
    let puntuacion_previa = localStorage.getItem("aciertos");
    let parrafo_info = document.getElementById("informacion_extra");
    let lista_de_puntuaciones = puntuacion_previa ? JSON.parse(puntuacion_previa) : [];
    if(lista_de_puntuaciones.length == 0) {
        parrafo_info.classList.remove("oculto");
    }else{
        parrafo_info.classList.add("oculto");
    }
    let div_contenedor = document.getElementById("resultados");
    lista_de_puntuaciones.forEach((resp_correct, elementos) => {
        let parrafo = document.createElement("p");
        let texto_del_parrafo = document.createTextNode(
            `Jugador ${elementos + 1}: ${resp_correct.aciertos} aciertos - ${resp_correct.fecha}`
        );
        parrafo.appendChild(texto_del_parrafo);
        div_contenedor.appendChild(parrafo);
    });
};