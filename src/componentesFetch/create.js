'use strict';
const d = document
const $form = d.querySelector(".crud-form")
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
