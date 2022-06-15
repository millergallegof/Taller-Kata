/**
* comando para que el script se vuelva estricto para recibir y enviar importaciones
*/
'use strict';

/**
* elementos del DOM
*/
const d = document
const $form = d.querySelector(".crud-form")

/**
* [Metodo con el cual hace una peticion http tipo fetch del metodo POST, 
    con el cual se crea un elemento en la API
* ]
*
* @param nameSanto valor de uno de los atributos del objeto a crear
* @param constellationSanto valor de uno de los atributos del objeto a crear
* @throws Genera error al momento que el estado de la peticion es menor a 200 y mayor a 299
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
export default async function create(nameSanto, constellationSanto) {
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                nombre: nameSanto,
                constelacion: constellationSanto
            })
        }
        let res = await fetch('http://localhost:5555/santos', options)
        let json = await res.json()
        if (!res.ok) throw new { status: res.status, statusText: res.statusText }
        location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${err.statusText}</b></p>`)
    }
}
