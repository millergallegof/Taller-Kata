/**
* comando para que el script se vuelva estricto para recibir y enviar importaciones
*/
'use strict';

/**
* elementos del DOM
*/
const d = document;
const $table = d.querySelector("#crud-table")
const $template = d.getElementById("crud-template").content;
const $fragment = d.createDocumentFragment();

/**
* [Metodo con el cual hace una peticion http tipo fetch del metodo GET, 
*   con el cual se traen todos los elementos de la API
* ]
*
* @throws Genera error al momento que el estado de la peticion es menor a 200 y mayor a 299
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
export default async function getAll() {

    try {
        let res = await fetch('http://localhost:5555/santos')
        let json = await res.json()
        if (!res.ok) throw new { status: res.status, statusText: res.statusText }

        json.forEach(element => {
            $template.querySelector(".name").textContent = element.nombre;
            $template.querySelector(".constellation").textContent = element.constelacion;
            $template.querySelector(".edit").dataset.id = element.id;
            $template.querySelector(".edit").dataset.name = element.nombre;
            $template.querySelector(".edit").dataset.constellation = element.constelacion;
            $template.querySelector(".delete").dataset.id = element.id;
            let $clone = d.importNode($template, true)
            $fragment.appendChild($clone)
        });
        $table.querySelector("tbody").appendChild($fragment)

    } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $table.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${err.statusText}</b></p>`)
    }
}
