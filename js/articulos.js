import data_articulos from "./Data/datos_articulos.js"

const cards_articulos_container = document.getElementsByClassName("cards_articulos")[0]

data_articulos.forEach(data_articulo => {
    cards_articulos_container.innerHTML += `
        <div class="card_articulo">
            <h2> ${data_articulo.nombre} </h2>
            <span>
                <p> Publicado al: </p>
                <p> ${data_articulo.fecha_publicacion} </p>
            </span>
            <span>
                <p> Resumen: </p>
                <p> ${data_articulo.resumen} </p>
            </span>
            <button id="${data_articulo.id}"> Ver más </button>
        </div>`;
});

data_articulos.forEach(data_articulo => {
    document.getElementById(data_articulo.id).addEventListener( "click", (e) => mostrar_modal_articulo(e.target.id) )
})

//////////////////////////////////////////////////////////////////
////////////////  MOSTRAR MODAL CON DATA DEL ARTÍCULO  ///////////
//////////////////////////////////////////////////////////////////
const mostrar_modal_articulo = async (id_param) => {
    const id = parseInt(id_param, 10)
    console.log(`Mostrando modal con data del Artículo con ID: ${id}`)
    
    const data_articulo = await obtenerArticulo(id)

    console.log("Resolve:: ", data_articulo)
    if (!data_articulo) return

    modal.style.display = ""

    // Se referencian los elementos del modal
    const elem_nombre = document.getElementsByClassName('modal__nombre')[0]
    const elem_fecha_publicacion = document.getElementsByClassName('modal__fecha_publicacion')[0]
    const elem_container_autores = document.getElementsByClassName('modal__container_autores')[0]
    const elem_resumen = document.getElementsByClassName('modal__resumen')[0]
    const elem_enlace_articulo = document.getElementsByClassName('modal__enlace_articulo')[0]

    // Se limpian los campos del modal
    elem_nombre.textContent = ""
    elem_fecha_publicacion.textContent = ""
    elem_container_autores.innerHTML = ""
    elem_resumen.textContent = ""
    // elem_enlace_articulo.textContent = ""

    // Se llenan los campos del modal
    elem_nombre.textContent = data_articulo.nombre
    elem_fecha_publicacion.textContent = data_articulo.fecha_publicacion
    
    data_articulo.autores.forEach(autor => {

        if (autor.url.length == 0) {

        } else {

        }
        elem_container_autores.innerHTML += (autor.url.length == 0)? `
        <li>
            <p>${autor.nombre}</p>
        </li>` : `
        <li>
            <a href="${autor.url}">${autor.nombre}</a>
        </li>
        `
    })

    elem_resumen.textContent = data_articulo.resumen
    elem_enlace_articulo.textContent = data_articulo.enlace_al_articulo_publicado
    elem_enlace_articulo.href = data_articulo.enlace_al_articulo_publicado
}

////////////  FUNCION PARA RECUPERAR UN INTEGRANTE DADO UN ID  ///////////
const obtenerArticulo = (id) => data_articulos.filter(data_articulo => data_articulo.id === id )[0]

//////////////////////////////////////////////////////////////////
///////  CLICK FUERA DEL AREA DEL MODAL (Oculta el modal)  ///////
//////////////////////////////////////////////////////////////////
const modal = document.getElementsByClassName('modal_container')[0]

modal.style.display = "none" 

modal.addEventListener('click', (e) => {
    [...e.target.classList].forEach((clase) => {

        if (clase === "modal_container" || clase === "modal__exit") {
            modal.style.display = "none"
        }

    })
})

