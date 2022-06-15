'use strict'

export default async function create(nameSanto, constellationSanto) {
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            data: JSON.stringify({
                nombre: nameSanto,
                constelacion: constellationSanto
            })
        }
        let res = await axios('http://localhost:5555/santos', options)
        let json = await res.data;
        location.reload();
    } catch (err) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${err.statusText}</b></p>`)
    }
}
