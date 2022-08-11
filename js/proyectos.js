import data_proyectos from "./Data/datos_proyectos.js"

const cards_proyectos_container = document.getElementsByClassName("cards_proyectos")[0]

data_proyectos.forEach(data_proyecto => {
    cards_proyectos_container.innerHTML += `
        <div class="card_proyecto">
            <h2> ${data_proyecto.nombre} </h2>
            <span>
                <p> Estado: </p>
                <p> ${data_proyecto.estado} </p>
            </span>
            <span>
                <p> Introducción: </p>
                <p> ${data_proyecto.introduccion} </p>
            </span>
            <button id="${data_proyecto.id}"> Ver Proyecto </button>
        </div>`;
});

data_proyectos.forEach(data_proyecto => {
    document.getElementById(data_proyecto.id).addEventListener( "click", (e) => mostrar_modal_proyecto(e.target.id) )
})

//////////////////////////////////////////////////////////////////
///////////////  MOSTRAR MODAL CON DATA DEL PROYECTO  //////////
//////////////////////////////////////////////////////////////////
const mostrar_modal_proyecto = async (id_param) => {
    const id = parseInt(id_param, 10)
    console.log(`Mostrando modal con data del Proyecto con ID: ${id}`)
    
    const data_proyecto = await obtenerProyecto(id)

    console.log("Resolve:: ", data_proyecto)
    if (!data_proyecto) return

    modal.style.display = ""

    // // Se referencian los elementos del modal
    const elem_nombre = document.getElementsByClassName('modal__nombre')[0]
    const elem_estado = document.getElementsByClassName('modal__estado')[0]
    const elem_container_participantes = document.getElementsByClassName('modal__container_participantes')[0]
    const elem_introduccion = document.getElementsByClassName('modal__introducción')[0]
    const elem_container_objetivos = document.getElementsByClassName('modal__container_objetivos')[0]
    const elem_fecha_finalizacion = document.getElementsByClassName('modal__fecha_finalizacion')[0]
    const elem_container_articulos = document.getElementsByClassName('modal__container_articulos')[0]

    // // Se limpian los campos del modal
    elem_nombre.textContent = ""
    elem_estado.textContent = ""
    elem_container_participantes.innerHTML = ""
    elem_introduccion.textContent = ""
    elem_container_objetivos.innerHTML = ""
    elem_fecha_finalizacion.textContent = ""
    elem_container_articulos.innerHTML = ""

    // // Se llenan los campos del modal
    elem_nombre.textContent = data_proyecto.nombre
    elem_estado.textContent = data_proyecto.estado

    data_proyecto.participantes.forEach(participante => {
        elem_container_participantes.innerHTML += `
            <li>
                <a href="${participante.url}" >${participante.nombre}</a>
            </li>`
    })

    elem_introduccion.textContent = data_proyecto.introduccion

    data_proyecto.objetivos.forEach(objetivo => {
        elem_container_objetivos.innerHTML += `
            <li>
                ${objetivo}
            </li>`
    })

    elem_fecha_finalizacion.textContent = data_proyecto.fecha_estimada_finalizacion
    
    data_proyecto.articulos_escritos.forEach(articulo => {
        elem_container_articulos.innerHTML += `
        <li>
            <a href="${articulo.url}" >${articulo.nombre}</a>
        </li>`
    })

}

////////////  FUNCION PARA RECUPERAR UN INTEGRANTE DADO UN ID  ///////////
const obtenerProyecto = (id) => data_proyectos.filter(data_proyecto => data_proyecto.id === id )[0]

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

