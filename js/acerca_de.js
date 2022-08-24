import data_integrantes from "./Data/datos_integrantes.js"

const cards_integrantes_container = document.getElementsByClassName("cards_integrantes")[0]

data_integrantes.forEach(data_integrante => {
    console.log("AA: ", data_integrante.correos)

    let list_correos = ""
    
    list_correos += data_integrante.correos.map(correo => {
        return `<li>${correo}</li>`
    }).flat().join('')
    
    cards_integrantes_container.innerHTML += `
        <div class="card_integrante">
            <picture class="card_integrante__avatar">
                <img src="./images/avatar-user.png" alt="Avatar de integrante">
            </picture>
            <div class="card_integrante__info">
                <h3> ${data_integrante.nombre} </h3>
                <p> ${data_integrante.grado} </p>
                <p> ${data_integrante.area_del_grado}</p>
                <ul>
                    ${list_correos} 
                </ul>
                <button id="${data_integrante.id}"> Ver más </button>
            </div>
        </div>`;
});

data_integrantes.forEach(data_integrante => {
    document.getElementById(data_integrante.id).addEventListener( "click", (e) => mostrar_modal_integrante(e.target.id) )
})

//////////////////////////////////////////////////////////////////
///////////////  MOSTRAR MODAL CON DATA DEL INTEGRANTE  //////////
//////////////////////////////////////////////////////////////////
const mostrar_modal_integrante = async (id_param) => {
    const id = parseInt(id_param, 10)
    console.log(`Mostrando modal con data del integrante con ID: ${id}`)
    
    const data_integrante = await obtenerIntegrante(id)

    if (!data_integrante) return

    modal.style.display = ""    

    // Se referencían los elementos del modal
    const elem_nombre = document.getElementsByClassName('modal__nombre')[0]
    const elem_grado = document.getElementsByClassName('modal__grado')[0]
    const elem_ies_de_grado = document.getElementsByClassName('modal__ies_de_grado')[0]
    const elem_area_del_grado = document.getElementsByClassName('modal__area_del_grado')[0]
    const elem_nivel_sni = document.getElementsByClassName('modal__nivel_sni')[0]
    const elem_con_perfil_prodep = document.getElementsByClassName('modal__con_perfil_prodep')[0]
    const elem_lgac_individual = document.getElementsByClassName('modal__lgac_individual')[0]
    const elem_lgac_ac = document.getElementsByClassName('modal__lgac_ac')[0]
    const elem_progr_educ_impacta = document.getElementsByClassName('modal__progr_educ_impacta')[0]
    const elem_interes_de_invest = document.getElementsByClassName('modal__interes_de_invest')[0]

    const elem_container_correos = document.getElementsByClassName('modal__container_correos')[0]
    const elem_container_proyectos = document.getElementsByClassName('modal__container_proyectos')[0]
    const elem_container_articulos = document.getElementsByClassName('modal__container_articulos')[0]
    const elem_container_tesis = document.getElementsByClassName('modal__conatiner_tesis')[0]
    const elem_container_producc_academ = document.getElementsByClassName('modal__container_produccion_academica')[0]

    // Se limpian los campos del modal
    elem_nombre.textContent = ""
    elem_grado.textContent = ""
    elem_ies_de_grado.textContent = ""
    elem_area_del_grado.textContent = ""
    elem_nivel_sni.textContent = ""
    elem_con_perfil_prodep.textContent = ""
    elem_lgac_individual.textContent = ""
    elem_lgac_ac.textContent = ""
    elem_progr_educ_impacta.textContent = ""
    elem_interes_de_invest.textContent = ""

    elem_container_correos.innerHTML = ""
    elem_container_proyectos.innerHTML = ""    
    elem_container_articulos.innerHTML = ""
    elem_container_tesis.innerHTML = ""
    elem_container_producc_academ.innerHTML = ""

    // Se llenan los campos del modal
    elem_nombre.textContent = data_integrante.nombre
    elem_grado.textContent = data_integrante.grado
    elem_ies_de_grado.textContent = data_integrante.ies_del_grado
    elem_area_del_grado.textContent = data_integrante.area_del_grado
    elem_nivel_sni.textContent = data_integrante.nivel_sni
    elem_con_perfil_prodep.textContent = data_integrante.con_perfil_prodep
    elem_lgac_individual.textContent = data_integrante.lgac_individual
    elem_lgac_ac.textContent = data_integrante.lgac_ca
    elem_progr_educ_impacta.textContent = data_integrante.programa_educativo_que_impacta
    elem_interes_de_invest.textContent = data_integrante.interes_de_invest

    data_integrante.correos.forEach(correo => {
        elem_container_correos.innerHTML += `<li> ${correo}</li>`
    })

    
    data_integrante.proyectos.forEach(proyecto => {
        elem_container_proyectos.innerHTML += `
        <li>
        <a href="${proyecto.url}" > ${proyecto.nombre} </a>
        </li>`
    })
    
    data_integrante.articulos.forEach(articulo => {
        elem_container_articulos.innerHTML += `
        <li>
            <a href="${articulo.url}"> ${articulo.nombre} </a>
        </li>`
    })
    
    console.log("AA:", data_integrante)
    
    data_integrante.tesis.forEach(tesis => {
        console.log("Entro")
        elem_container_tesis.innerHTML += `
        <li>
            <p>Título: <span>${tesis.nombre}</span></p>
            <p>Autor: <span>${tesis.alumno}</span></p>
            <p>Grado académico: <span>${tesis.grado_academico}</span></p>
            <p>Programa educativo: <span>${tesis.programa_educativo}</span></p>
            <p>Estatus: <span>${tesis.estatus}</span></p>
            <p>Fecha finalización: <span>${tesis.fecha_finalizacion}</span></p>
        </li>
        `
    })

    data_integrante.produccion_academica.forEach(produccion => {
        elem_container_producc_academ.innerHTML += `
        <li>
            <p>${produccion.nombre_produccion}</p>
            <ul>
                ${produccion.lista_producciones.map(producto => `
                    <li>
                        <a href="${producto.link_externo}" target="_blank" rel="noopener noreferrer">
                            ${producto.cita}
                        </a>
                    </li>
                `).flat().join("")}
            </ul>
        </li>
        `
    })
        
    // data_integrantes
    
    // data_integrante.lineas_aplicacion.forEach(linea_aplicacion => {
        //     elem_container_lineas_aplicacion.innerHTML += `<li>${linea_aplicacion}</li>`
        // })
}

////////////  FUNCION PARA RECUPERAR UN INTEGRANTE DADO UN ID  ///////////
const obtenerIntegrante = (id) => data_integrantes.filter(data_integrante => data_integrante.id === id )[0]

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

