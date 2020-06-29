"use: strict";



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

//creo datos y retorno el arreglo que los almacena.
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
let grupoId = "grupo129"; //nuestra id
let coleccionId = "libros"; //la id de nuestra coleccion
let libros = generarDatos();
//enviarDatos;(libros); //UNA VEZ USADO COMENTAR Y NO VOLVER A UTILIZAR!!!