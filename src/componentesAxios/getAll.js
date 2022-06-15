'use strict'
const d = document
const $table = d.querySelector("#crud-table")
const $template = d.getElementById("crud-template").content;
const $fragment = d.createDocumentFragment();

export default async function getAll() {
    try {
        let res = await axios.get("http://localhost:5555/santos")
        let json = await res.data
        json.forEach(element => {
            $template.querySelector(".name").textContent = element.nombre;
            $template.querySelector(".constellation").textContent = element.constelacion;
            $template.querySelector(".edit").dataset.id = element.id;
            $template.querySelector(".edit").dataset.name = element.nombre;
            $template.querySelector(".edit").dataset.constellation = element.constelacion;
            $template.querySelector(".delete").dataset.id = element.id;
            let $clone = d.importNode($template, true)
            $fragment.appendChild($clone)
        });
        $table.querySelector("tbody").appendChild($fragment)
    } catch (error) {
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${err.statusText}</b></p>`)
    }
}