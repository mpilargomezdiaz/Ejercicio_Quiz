function crearGrafica() { 

let canvas_graf = document.getElementById("canvas_grafica");
let puntuacion_previa = localStorage.getItem("aciertos");
let parrafo_info = document.getElementById("informacion_extra");
let lista_de_puntuaciones = puntuacion_previa ? JSON.parse(puntuacion_previa) : [];
let labels = lista_de_puntuaciones.map(tiempo => tiempo.fecha);
let data = lista_de_puntuaciones.map(score => score.aciertos);
let grafica = canvas_graf.getContext("2d");
let gradient = grafica.createLinearGradient(0, 0, 0, canvas_graf.height);
gradient.addColorStop(0, 'rgba(255, 210, 249)');
gradient.addColorStop(1, 'rgba(126, 51, 116)');
new Chart(canvas_graf, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: "aciertos",
            data: data,
            backgroundColor: gradient,
            borderColor: 'rgba(132, 0, 129)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1,
                    title: {
                    display: true,
                    text: "Aciertos",
                    color: 'rgba(255, 200, 248)'
                    }
            },
                x: {
                    title: {
                        display: true,
                        text: "Fecha y hora",
                        color: 'rgba(255, 200, 248)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: "Puntuaciones",
                    color: 'rgba(255, 200, 248)'
                }
            }
        }
    });
}

crearGrafica();