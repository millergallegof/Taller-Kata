const d = document
const $table = d.querySelector("#crud-table")
const $form = d.querySelector(".crud-form")
const $title = d.querySelector(".crud-title")
const $template = d.getElementById("crud-template").content;
const $fragment = d.createDocumentFragment();

async function getAll() {
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
d.addEventListener('DOMContentLoaded', getAll)

d.addEventListener('submit', async (e) => {
    if (e.target === $form) {
        e.preventDefault();
        if (!e.target.id.value) {
            // POST -CREATE
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value
                    })
                }
                let res = await axios('http://localhost:5555/santos', options)
                let json = await res.data;
                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrio un error";
                $form.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${err.statusText}</b></p>`)
            }
        } else {
            //PUT -UPDTAE
            try {
                console.log(e.target.nombre.value,
                    e.target.constelacion.value);
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        nombre: e.target.nombre.value,
                        constelacion: e.target.constelacion.value
                    })
                }
                let res = await axios(`http://localhost:5555/santos/${e.target.id.value}`, options)
                let json = await res.data
                location.reload();
            } catch (err) {
                let message = err.statusText || "Ocurrio un error";
                $form.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${err.statusText}</b></p>`)
            }
        }


    }
})
d.addEventListener('click', async (e) => {
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Santo";
        $form.nombre.value = e.target.dataset.name
        $form.constelacion.value = e.target.dataset.constellation
        $form.id.value = e.target.dataset.id
    }
    if (e.target.matches(".delete")) {
        let isDelete = confirm(`Esta seguro de eliminar el id ${e.target.dataset.id}`)

        if (isDelete) {
            try {
                let options = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }
                let res = await axios(`http://localhost:5555/santos/${e.target.dataset.id}`, options)
                let json = await res.data
                location.reload();
            } catch (error) {
                let message = err.statusText || "Ocurrio un error";
                alert(`Error ${err.status}: ${err.statusText}`)
            }
        }
    }
})