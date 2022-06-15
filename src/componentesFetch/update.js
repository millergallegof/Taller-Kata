'use strict';
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