/**
* comando para que el script se vuelva estricto para recibir y enviar importaciones
*/
'use strict';

/**
* [Metodo con el cual hace una peticion http tipo fetch del metodo PUT, 
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
            body: JSON.stringify({
                nombre: nameSanto,
                constelacion: constellationSanto
            })
        }
        let res = await fetch(`http://localhost:5555/santos/${idSanto}`, options)
        let json = await res.json()
        if (!res.ok) throw new { status: res.status, statusText: res.statusText }
        location.reload();
    } catch (error) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${err.statusText}</b></p>`)
    }
}