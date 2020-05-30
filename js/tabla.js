"use strict";
/*creo datos y retorno la estructura*/
function generarDatos() {
    let libros = [{
            "titulo": "Bullying y abuso infantil",
            "autor": "Tere Vale",
            "año": 2020
        },
        {
            "titulo": "Marinka una rusa niña vasca",
            "autor": "TRodolfo Luna Almeida",
            "año": 2019
        },
        {
            "titulo": "Camino a una tierra extraña",
            "autor": "David Park",
            "año": 2018
        },
        {
            "titulo": "El sueño del retorno",
            "autor": "Firulais",
            "año": 2017
        },
        {
            "titulo": "Humanos",
            "autor": "Dios",
            "año": 2020
        }
    ];
    return libros;
}

function cargarTabla() {
     for(let i = 0; i < tabla.length; i++){
        let elementoFila = document.createElement('tr');
        let elementoColumna1 = document.createElement('td');
        elementoColumna1.innerHTML = tabla[i].titulo;
        let elementoColumna2 = document.createElement('td');
        elementoColumna2.innerHTML = tabla[i].autor;
        let elementoColumna3 = document.createElement('td');
        elementoColumna3.innerHTML = tabla[i].año;
        let elementoColumna4 = document.createElement('td');
        let imagen = document.createElement('img')
        imagen.setAttribute('src', "images/download.png");
        imagen.src="images/download.png"
        elementoColumna4.appendChild(imagen);
        elementoFila.appendChild(elementoColumna1);
        elementoFila.appendChild(elementoColumna2);
        elementoFila.appendChild(elementoColumna3);
        elementoFila.appendChild(elementoColumna4);
        document.querySelector(".cuerpoTab").appendChild(elementoFila);
    };
}

let tabla = generarDatos(); /*uso la funcion para cargar mi variable tabla*/
cargarTabla();