"use: strict";




function actualizarTabla(unLibro) { //Crea una nueva fila, carga sus celdas con los datos del libro y luego la añade al HTML.
    let elementoFila = document.createElement('tr');
    elementoFila.classList.toggle("fila");
    elementoFila.id = unLibro.id;
    let elementoColumna1 = document.createElement('td');
    let a = document.createElement('a');
    let texto = document.createTextNode(unLibro.thing.titulo);
    a.appendChild(texto);
    a.href = "libro.html";
    elementoColumna1.appendChild(a);
    elementoColumna1.classList.toggle("columna");
    let elementoColumna2 = document.createElement('td');
    elementoColumna2.innerHTML = unLibro.thing.autor;
    elementoColumna2.classList.toggle("columna");
    let elementoColumna3 = document.createElement('td');
    elementoColumna3.innerHTML = unLibro.thing.año;
    if (elementoColumna3.innerHTML === "2020") {
        elementoColumna3.classList.toggle("añoResaltado");
    }
    elementoColumna3.classList.toggle("columna");
    let elementoColumna4 = document.createElement('td');
    let imagen = document.createElement('img')
    imagen.setAttribute('src', "images/download.png");
    imagen.setAttribute('alt', "descarga");
    elementoColumna4.appendChild(imagen);
    elementoColumna4.classList.toggle("columna");
    let elementoColumna5 = document.createElement('td');
    elementoColumna5.classList.toggle("columna");
    let botonEdit = document.createElement('button');
    botonEdit.id = unLibro._id;
    botonEdit.addEventListener("click", editarFila);
    botonEdit.innerHTML = "Editar";
    elementoColumna5.appendChild(botonEdit);
    let elementoColumna6 = document.createElement('td');
    let botonDelete = document.createElement('button');
    botonDelete.id = unLibro._id;
    botonDelete.innerHTML = "Borrar";
    botonDelete.addEventListener("click", borrarFila);
    elementoColumna6.appendChild(botonDelete);
    elementoColumna6.classList.toggle("columna");
    //Agrega todas las columnas a la fila
    elementoFila.appendChild(elementoColumna1);
    elementoFila.appendChild(elementoColumna2);
    elementoFila.appendChild(elementoColumna3);
    elementoFila.appendChild(elementoColumna4);
    elementoFila.appendChild(elementoColumna5);
    elementoFila.appendChild(elementoColumna6);
    //Agrega la fila a la tabla
    document.querySelector(".cuerpoTab").appendChild(elementoFila);
}

function cargarTabla(jsonLibros) {
    //Genera toda la tabla a partir del arreglo traido desde la API.
    let tbody = document.createElement('tbody');
    tbody.classList.add("cuerpoTab");
    document.querySelector(".CatalogoTab").appendChild(tbody);
    for (let i = 0; i < jsonLibros.length; i++)
        actualizarTabla(jsonLibros[i]);
}




//FUNCIONES PARA TRABAJAR CON LA API Y LAS TABLAS
async function editarFila(event) { //Permite editar la informacion de una fila.
    let id = event.target.id;
    let data = {
        "thing": {
            "titulo": document.querySelector("#booktitle").value,
            "autor": document.querySelector("#bookAutor").value,
            "año": document.querySelector("#bookYear").value
        }
    };
    if ((data.thing.titulo != "") && (data.thing.autor != "") && (data.thing.año != "")) {
        try {
            await fetch(baseUrl + grupoId + "/" + coleccionId + "/" + id, {
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data)
            })
            let tbody = document.querySelector(".cuerpoTab");
            document.querySelector(".CatalogoTab").removeChild(tbody);
            obtenerDatos();
        } catch (error) {
            console.log(error);
        }
    }
}

async function borrarFila(event) { //Borra una fila especifica.
    try {
        let id = event.target.id;
        let response = await fetch(baseUrl + grupoId + "/" + coleccionId + "/" + id, {
            "method": "DELETE"
        });
        let tbody = document.querySelector(".cuerpoTab");
        document.querySelector(".CatalogoTab").removeChild(tbody);
        obtenerDatos();
    } catch (error) {
        console.log(error);
    }

}

async function generarLibros() {//Genera 3 filas automaticamente (es lo minimo que pedia la consigna)
    agregarFila();
    agregarFila();
    agregarFila();
    agregarFila();

}

async function agregarFila() { //Agrega una fila.
    let data = {
        "thing": {
            "titulo": document.querySelector("#booktitle").value,
            "autor": document.querySelector("#bookAutor").value,
            "año": document.querySelector("#bookYear").value
        }
    };
    if ((data.thing.titulo != "") && (data.thing.autor != "") && (data.thing.año != "")) {
        try {
            let response = await fetch(baseUrl + grupoId + "/" + coleccionId, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data),
            });
            let tbody = document.querySelector(".cuerpoTab");
            document.querySelector(".CatalogoTab").removeChild(tbody);
            obtenerDatos();
        } catch (error) {
            console.log(error);
        }
    }
}

//FUNCIONES BASICAS PARA INTERACTUAR CON LA API
async function borrarDatos() { //Borra todos los datos de la API
    try {
        let response = await fetch(baseUrl + grupoId + "/" + coleccionId);
        let json = await response.json();
        let recibido = json.libros;
        for (let i = 0; i < recibido.length; i++) {
            let id = recibido[i]._id;
            await fetch(baseUrl + grupoId + "/" + coleccionId + "/" + id, {
                "method": "DELETE"
            });
        }
        let tbody = document.querySelector(".cuerpoTab");
        document.querySelector(".CatalogoTab").removeChild(tbody);
        obtenerDatos();
    } catch (error) {
        console.log(error);
    }
}

async function obtenerDatos() { //Obtiene todos los datos de la API
    try {
        let response = await fetch(baseUrl + grupoId + "/" + coleccionId, {
            "method": "GET",
            "mode": "cors"
        });
        let json = await response.json();
        cargarTabla(json.libros);
    } catch (error) {
        console.log(error);
    }
}

async function enviarDatos(libros) {
    for (let i = 0; i < libros.length; i++) {
        let data = { //creamos el libro a partir del arreglo.
            "thing": {
                "titulo": libros[i].titulo,
                "autor": libros[i].autor,
                "año": libros[i].año
            }
        };
        try {
            let response = await fetch(baseUrl + grupoId + "/" + coleccionId, {
                "method": "POST",
                "headers": {
                    "Content-Type": "application/json"
                },
                "body": JSON.stringify(data),
            });
            let json = await response.json();
            console.log(json);
        } catch (error) {
            console.log(error);
        }
    }
}

//FILTRADO DE LA TABLA
function coincide(columnas, textoBuscado) {//Revisa si alguna de las columnas de la fila  coincide con el texto buscado.
    let respuesta = false;
   if (columnas[0].querySelector('a').innerHTML === textoBuscado) {//Hicimos esto porque el texto de la primer columna esta contenido dentro de un <a>.
        respuesta = true;
    }
    for(let c = 1; c < columnas.length-1; c++){
        let aux = columnas[c].innerHTML;
        if (aux === textoBuscado) {
            respuesta = true;
        }
        else
        columnas[c].classList.toggle("filaOculta");
    }
    return respuesta;
}

function filtrar(textoBuscado) {//Obtiene todas las filas de la tabla, llama a "coincide" para ver si filtrarlas o no.
let filas = document.querySelectorAll(".fila");
    for(let i = 0; i < filas.length; i++){
        let columnas = filas[i].querySelectorAll(".columna");
        if (!coincide(columnas, textoBuscado)) {
            filas[i].classList.toggle("celdaOculta");
            for(let c = 0; c < columnas.length; c++){
                columnas[c].classList.toggle("celdaOculta");
            }
        }
                
            }
        }

function buscarLibros() {
    let textoBuscado  = document.querySelector(".busqueda").value;
    filtrar(textoBuscado);
}

//GENERAR DATOS DE EJEMPLO
//creo datos y retorno el arreglo que los almacena se usa solo para tener una tabla precargada de ejemplo.
function generarDatos() {
    let librosPrecargados = [{
            "titulo": "Bullying y abuso infantil",
            "autor": "Tere Vale",
            "año": "2020"
        },
        {
            "titulo": "Marinka una rusa niña vasca",
            "autor": "Rodolfo Luna Almeida",
            "año": "2019"
        },
        {
            "titulo": "Camino a una tierra extraña",
            "autor": "David Park",
            "año": "2018"
        },
        {
            "titulo": "El sueño del retorno",
            "autor": "Firulais",
            "año": "2017"
        },
        {
            "titulo": "Humanos",
            "autor": "Dios",
            "año": "2020"
        }
    ];
    return librosPrecargados;
}

let baseUrl = "http://web-unicen.herokuapp.com/api/groups/"; //la url base de la api
let grupoId = "grupo126"; //nuestra id
let coleccionId = "libros"; //la id de nuestra coleccion
let borrarTabla = document.querySelector("#borrarTabla");//Boton para borrar tabla y api.
let botonAgregar = document.querySelector("#agrega");//Boton para agregar un libro.
let botonGenerar = document.querySelector("#genera");//boton para generar libros x3.
botonAgregar.addEventListener("click", agregarFila);
botonGenerar.addEventListener("click", generarLibros);
borrarTabla.addEventListener("click", borrarDatos);
let libros = generarDatos();
let buscar = document.querySelector("#filtrar");
buscar.addEventListener("click", buscarLibros);
//enviarDatos(libros); //UNA VEZ USADO COMENTAR Y NO VOLVER A UTILIZAR!!!
obtenerDatos();
