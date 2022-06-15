/**
* importacion de modulos internos del paquete
*/
import create from "./create.js"
import deleteSanto from "./deleteSanto.js"
import getAll from "./getAll.js"
import update from "./update.js"

/**
* elementos extraidos del DOM
*/
const d = document
const $form = d.querySelector(".crud-form")
const $title = d.querySelector(".crud-title")

/**
* Eventos del proyecto
*/

/**
* [funcion anonima incluida en el evento DOMContentLoaded, el cual trae la funcion getAll importada
* ]
*
* @param e elemento que retorna el evento
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
d.addEventListener('DOMContentLoaded', async () => {
    await getAll();
})

/**
* [funcion anonima incluida en el evento submit, el cual hace la verificacion de si el usuario esta creado o es un usuario nuevo
*    creado -> llama la funcion update importada
*    nuevo -> llama la funcion create importada
* ]
*
* @param e elemento que retorna el evento
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
d.addEventListener('submit', async (e) => {
    if (e.target === $form) {
        e.preventDefault();
        if (!e.target.id.value) {
            await create(e.target.nombre.value, e.target.constelacion.value)
        } else {
            await update(e.target.nombre.value, e.target.constelacion.value, e.target.id.value);
        }


    }
})

/**
* [funcion anonima incluida en el evento click, el cual hace la verificacion de si se esta dando click en el boton editar o borrar
*    editar -> envia el valor de la tabla a los input de creacion
*    eliminar -> llama la funcion deleteSanto que es importada
* ]
*
* @param e elemento que retorna el evento
*
* @author Miller Esteban Gallego Forero - miller.gallegof@gmail.com
*
* @since [1.0.0]
*
*/
d.addEventListener('click', async (e) => {
    if (e.target.matches(".edit")) {
        $title.textContent = "Editar Santo";
        $form.nombre.value = e.target.dataset.name
        $form.constelacion.value = e.target.dataset.constellation
        $form.id.value = e.target.dataset.id
    }
    if (e.target.matches(".delete")) {
        await deleteSanto(e.target.dataset.id);
    }
})