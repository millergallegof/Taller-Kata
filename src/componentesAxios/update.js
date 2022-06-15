'use strict'

const d = document
const $form = d.querySelector(".crud-form")

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

