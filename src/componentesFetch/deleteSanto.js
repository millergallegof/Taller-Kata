/**
* comando para que el script se vuelva estricto para recibir y enviar importaciones
*/
'use strict';

/**
* [Metodo con el cual hace una peticion http tipo fetch del metodo DELETE, 
*   con el cual se ELIMINA un elemento en la API
* ]
*
* @param idSanto valor del id del elemento a borrar
* @throws Genera error al momento que el estado de la peticion es menor a 200 y mayor a 299
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
export default async function deleteSanto(idSanto) {
    let isDelete = confirm(`Esta seguro de eliminar el id ${idSanto}`)

    if (isDelete) {
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }
            let res = await fetch(`http://localhost:5555/santos/${idSanto}`, options)
            let json = await res.json()
            if (!res.ok) throw new { status: res.status, statusText: res.statusText }
            location.reload();
        } catch (error) {
            let message = err.statusText || "Ocurrio un error";
            alert(`Error ${err.status}: ${err.statusText}`)
        }
    }
}
