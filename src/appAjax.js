/**
* elementos extraidos del DOM
*/
const d = document
const $table = d.querySelector("#crud-table")
const $form = d.querySelector(".crud-form")
const $title = d.querySelector(".crud-title")
const $template = d.getElementById("crud-template").content;
const $fragment = d.createDocumentFragment();

/**
* [funcion por la cual se hacen las diferentes peticiones http con el metodo Ajax, verifica 
    los estados de la peticion y del mismo modo arroja un error sea el caso especifico
* ]
*
* @param options elemento que tiene diferentes objetos y funciones
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
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

/**
* [Metodo con el cual se envia un objeto tipo option, con el metodo get, el cual solicita a 
    la funcion ajax que haga la peticion http y extraiga la info de la API falsa
* ]
*
* @throws genera error cuando el estado de la peticion es diferente de un 200
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
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

/**
* eventos necesarios para realizar diferentes peticiones
*/
d.addEventListener('DOMContentLoaded', getAll)

/**
* [clase anonima incluida en el evento submit, el cual realiza verificaciones del elemento que se esta diligenciando
     y de este modo realiza la creacion(peticion Post) o una actualizacion (peticion Put) que se realiza en la funcion ajax
* ]
*
* @param e elemento que retorna el evento
* @throws genera error cuando el estado de la peticion es diferente de un 200
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
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

/**
* [funcion anonima incluida en el evento click, el cual realiza la busqueda del boton al cual se le realizo el click y ejecuta diferentes acciones
     cuando es el boton editar -> envia el valor de la tabla a los input de creacion
     cuando es el boton delete -> hace una peticion a la funcion ajax tipo delete donde envia el id y realiza el borrado del elemento
* ]
*
* @param e elemento que retorna el evento
* @throws genera error cuando el estado de la peticion es diferente de un 200
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
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