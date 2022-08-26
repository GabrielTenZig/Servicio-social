import data_proyectos from "./Data/datos_proyectos.js"

const cards_proyectos_container = document.getElementsByClassName("cards_proyectos")[0]



data_proyectos.forEach(data_proyecto => {
    cards_proyectos_container.innerHTML += `
        <div class="card_proyecto" id="id_proyecto=${data_proyecto.id}">
            <h2> ${data_proyecto.nombre} </h2>
            <span>
                <p> Estado: </p>
                <p> ${data_proyecto.estado} </p>
            </span>
            <span>
                <p> Resumen: </p>
                <p> ${data_proyecto.resumen} </p>
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
    const elem_patrocinador = document.getElementsByClassName('modal__patrocinador')[0]
    const elem_tipo_patrocinador = document.getElementsByClassName('modal__tipo_patrocinador')[0]
    const elem_estado = document.getElementsByClassName('modal__estado')[0]
    const elem_fecha_inicio = document.getElementsByClassName('modal__fecha_inicio')[0]
    const elem_fecha_finalizacion = document.getElementsByClassName('modal__fecha_finalizacion')[0]
    const elem_actividades = document.getElementsByClassName('modal__actividades')[0]
    const elem_container_participantes = document.getElementsByClassName('modal__container_participantes')[0]
    const elem_lgac_del_ca_asociaas = document.getElementsByClassName('modal__lgac_del_ca_asociadas')[0]
    const elem_lgac_indivi_asociadas = document.getElementsByClassName('modal__lgac_indivi_asociadas')[0]
    const elem_container_objetivos = document.getElementsByClassName('modal__container_objetivos')[0]
    const elem_resumen = document.getElementsByClassName('modal__resumen')[0]
    const elem_container_producc_academ = document.getElementsByClassName('modal__container_producc_academ')[0]

    // // Se limpian los campos del modal
    elem_nombre.textContent = ""
    elem_patrocinador.textContent = ""
    elem_tipo_patrocinador.textContent = ""
    elem_estado.textContent = ""
    elem_fecha_inicio.textContent = ""
    elem_fecha_finalizacion.textContent = ""
    elem_actividades.textContent = ""
    elem_container_participantes.innerHTML = ""
    elem_lgac_del_ca_asociaas.textContent = ""
    elem_lgac_indivi_asociadas.textContent = ""
    elem_container_objetivos.innerHTML = ""
    elem_resumen.textContent = ""
    elem_container_producc_academ.innerHTML = ""

    // // Se llenan los campos del modal
    elem_nombre.textContent = data_proyecto.nombre
    elem_patrocinador.textContent = data_proyecto.patrocinador
    elem_tipo_patrocinador.textContent = data_proyecto.tipo_de_patrocinador
    elem_estado.textContent = data_proyecto.estado
    elem_fecha_inicio.textContent = data_proyecto.fecha_de_inicio
    elem_fecha_finalizacion.textContent = data_proyecto.fecha_finalizacion
    elem_actividades.textContent = data_proyecto.actividades

    data_proyecto.integrantes_del_ca_que_participan.forEach(participante => {
        elem_container_participantes.innerHTML += `
            <li>
                <a href="${participante.url}" >${participante.nombre}</a>
            </li>`
    })

    elem_lgac_del_ca_asociaas.textContent = data_proyecto.lgac_del_ca_asociada
    elem_lgac_indivi_asociadas.textContent = data_proyecto.lgac_de_individuales_asociada
    
    data_proyecto.objetivos.forEach(objetivo => {
        elem_container_objetivos.innerHTML += `
        <li>
        ${objetivo}
        </li>`
    })

    elem_resumen.textContent = data_proyecto.resumen
    
    data_proyecto.produccion_academica_relacionada.forEach(articulo => {
        elem_container_producc_academ.innerHTML += `
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

