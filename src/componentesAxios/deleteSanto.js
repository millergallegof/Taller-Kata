'use strict'

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
            let res = await axios(`http://localhost:5555/santos/${idSanto}`, options)
            let json = await res.data
            location.reload();
        } catch (error) {
            let message = err.statusText || "Ocurrio un error";
            alert(`Error ${err.status}: ${err.statusText}`)
        }
    }
}

