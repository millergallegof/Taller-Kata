'use strict';
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
