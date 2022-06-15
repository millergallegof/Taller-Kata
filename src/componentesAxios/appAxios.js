import create from "./create.js"
import deleteSanto from "./deleteSanto.js"
import getAll from "./getAll.js"
import update from "./update.js"


const d = document
const $form = d.querySelector(".crud-form")
const $title = d.querySelector(".crud-title")

d.addEventListener('DOMContentLoaded', async () => {
    await getAll();
})

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