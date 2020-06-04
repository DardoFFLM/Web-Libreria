"use strict";

function borrarTabla() {//Borra los elementos del arreglo y el tbody de la tabla para reemplazarlo por un nuevo tbody vacio.
    let table = document.querySelector(".CatalogoTab");
    let tbody = document.querySelector(".cuerpoTab");
    table.removeChild(tbody);
    tbody = document.createElement('tbody');
    tbody.classList.add("cuerpoTab");
    table.appendChild(tbody);
    tabla = [];
}

function generarLibros() {//Genera elementos para agregar a la tabla. En este caso solo tres elementos fijos porque es lo minimo que pide la consigna.
    let libroGenerado = {
        "titulo": "Titulo Generado Automaticamente",
        "autor": "Autor Generado Automaticamente",
        "año": 2020
    }
    tabla.push(libroGenerado);
    actualizarTabla(libroGenerado);
    tabla.push(libroGenerado);
    actualizarTabla(libroGenerado);
    tabla.push(libroGenerado);
    actualizarTabla(libroGenerado);
}

function actualizarTabla(unLibro) {//Crea una nueva fila, carga sus celdas con los datos del libro y luego la añade al HTML.
    let elementoFila = document.createElement('tr');
    let elementoColumna1 = document.createElement('td');
    let a = document.createElement('a');
    let texto = document.createTextNode(unLibro.titulo);
    a.appendChild(texto);
    a.href = "libro.html";
    elementoColumna1.appendChild(a);
    let elementoColumna2 = document.createElement('td');
    elementoColumna2.innerHTML = unLibro.autor;
    let elementoColumna3 = document.createElement('td');
    elementoColumna3.innerHTML = unLibro.año;
    let elementoColumna4 = document.createElement('td');
    let imagen = document.createElement('img')
    imagen.setAttribute('src', "images/download.png");
    imagen.setAttribute('alt', "descarga");
    elementoColumna4.appendChild(imagen);
    elementoFila.appendChild(elementoColumna1);
    elementoFila.appendChild(elementoColumna2);
    elementoFila.appendChild(elementoColumna3);
    elementoFila.appendChild(elementoColumna4);

    document.querySelector(".cuerpoTab").appendChild(elementoFila);
}

function agregarLibro() {//Crea un JSON con datos obtenidos por teclado, lo agrega al arreglo y llama a actualizarTabla.
    let title = document.querySelector("#bookTitle").value;
    let autor = document.querySelector("#bookAutor").value;
    let year = document.querySelector("#bookYear").value;
    if ((title === "")||(autor === "")||(year === "")) {//Compruebo que todos los input hayan sido cargados.
        console.log("Debe llenar todos los campos para agregar un elemento");
    }
    else{
        let unLibro = {
            "titulo": title,
            "autor": autor,
            "año": year
        }
        tabla.push(unLibro);
        actualizarTabla(unLibro);
    }
}

function cargarTabla() {
    //Genera toda la tabla a partir del arreglo.
    let tbody = document.createElement('tbody');
    tbody.classList.add("cuerpoTab");
    document.querySelector(".CatalogoTab").appendChild(tbody);
    for (let i = 0; i < tabla.length; i++) {
        let unLibro = {
            "titulo": tabla[i].titulo,
            "autor": tabla[i].titulo,
            "año": tabla[i].año
        }
        actualizarTabla(unLibro);
    };
}

//creo datos y retorno el arreglo que los almacena.
function generarDatos() {
    let libros = [{
            "titulo": "Bullying y abuso infantil",
            "autor": "Tere Vale",
            "año": 2020
        },
        {
            "titulo": "Marinka una rusa niña vasca",
            "autor": "Rodolfo Luna Almeida",
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

let tabla = generarDatos(); //uso la funcion para cargar mi variable tabla.
//agrego eventListener a los botones.
let btnAgregar = document.querySelector("#agrega");
let btnGenerar = document.querySelector("#genera");
let btnBorrar = document.querySelector("#borra");
btnAgregar.addEventListener("click", agregarLibro);
btnGenerar.addEventListener("click", generarLibros);
btnBorrar.addEventListener("click", borrarTabla);
cargarTabla();