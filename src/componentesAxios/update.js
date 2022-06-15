/**
* comando para que el script se vuelva estricto para recibir y enviar importaciones
*/
'use strict'

/**
*  elementos del DOM
*/
const d = document
const $form = d.querySelector(".crud-form")

/**
* [Metodo con el cual hace una peticion http tipo axios del metodo PUT, 
*   con el cual se actualiza un elemento de la API
* ]
*
* @param nameSanto valor de un atributo del objeto actualizar
* @param constellationSanto valor de un atributo del objeto actualizar
* @param idSanto valor del id del elemento actualizar
* @throws Genera error al momento que el estado de la peticion es menor a 200 y mayor a 299
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
export default async function update(nameSanto, constellationSanto, idSanto) {
    try {
        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: JSON.stringify({
                nombre: nameSanto,
                constelacion: constellationSanto
            })
        }
        let res = await axios(`http://localhost:5555/santos/${idSanto}`, options)
        let json = await res.data
        location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${err.statusText}</b></p>`)
    }
}

