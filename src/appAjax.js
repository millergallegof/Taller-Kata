const d = document
const $table = d.querySelector("#crud-table")
const $form = d.querySelector(".crud-form")
const $title = d.querySelector(".crud-title")
const $template = d.getElementById("crud-template").content;
const $fragment = d.createDocumentFragment();

// funcion para hacer las diferentes peticiones en ajax
function ajax(options) {
    let { url, method, success, error, data } = options;
    const xhr = new XMLHttpRequest();


    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            // traer la respuesta en formato json
            let json = JSON.parse(xhr.responseText);
            success(json)
        } else {
            let message = xhr.statusText || "Ocurrio un error";
            error(`Error ${xhr.status}: ${message}`);
        }
    })

    // si el metodo va vacio automaticamente se ejecuta un GET
    xhr.open(method || "GET", url);
    // tipo de datos que espera la API (heaters)
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    xhr.send(JSON.stringify(data))

}

function getAll() {
    ajax({
        method: 'GET',
        url: 'http://localhost:5555/santos',
        success: (res) => {
            res.forEach(element => {
                $template.querySelector(".name").textContent = element.nombre;
                $template.querySelector(".constellation").textContent = element.constelacion;
                $template.querySelector(".edit").dataset.id = element.id;
                $template.querySelector(".edit").dataset.name = element.nombre;
                $template.querySelector(".edit").dataset.constellation = element.constelacion;
                $template.querySelector(".delete").dataset.id = element.id;
                let $clone = d.importNode($template, true)
                $fragment.appendChild($clone);
            })

            $table.querySelector("tbody").appendChild($fragment);
        },
        error: (err) => {
            $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`)
        },
        data: null
    })
}

d.addEventListener('DOMContentLoaded', getAll)
d.addEventListener('submit', (e) => {
    if (e.target === $form) {
        e.preventDefault();

        // condicional para validar si el elemento esta creado o no
        // realiza los metodos segun si esta creado o no
        if (!e.target.id.value) {
            ajax({
                method: 'POST',
                url: 'http://localhost:5555/santos',
                success: (res) => {
                    location.reload();
                },
                error: () => {
                    $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`)
                },
                data: {
                    nombre: e.target.nombre.value,
                    constelacion: e.target.constelacion.value
                }
            })
        } else {
            ajax({
                method: 'PUT',
                url: `http://localhost:5555/santos/${e.target.id.value}`,
                success: (res) => {
                    location.reload();
                },
                error: () => {
                    $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`)
                },
                data: {
                    nombre: e.target.nombre.value,
                    constelacion: e.target.constelacion.value
                }
            })
        }
    }


})

d.addEventListener('click', (e) => {
    console.log(e);
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Santo";
        $form.nombre.value = e.target.dataset.name
        $form.constelacion.value = e.target.dataset.constellation
        $form.id.value = e.target.dataset.id
    }

    if (e.target.matches(".delete")) {
        let isDelete = confirm(`Esta seguro de eliminar el id ${e.target.dataset.id}`)

        if (isDelete) {
            ajax({
                method: 'DELETE',
                url: `http://localhost:5555/santos/${e.target.dataset.id}`,
                success: (res) => {
                    location.reload();
                },
                error: () => {
                    alert(err)
                },
            })
        }
    }
})