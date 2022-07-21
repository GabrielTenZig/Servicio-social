import data_integrantes from "./Data/datos_integrantes.js"

const cards_integrantes_container = document.getElementsByClassName("cards_integrantes")[0]

data_integrantes.forEach(data_integrante => {
    cards_integrantes_container.innerHTML += `
        <div class="card_integrante">
            <picture class="card_integrante__avatar">
                <img src="./images/avatar-user.png" alt="Avatar de integrante">
            </picture>
            <div class="card_integrante__info">
                <h3> ${data_integrante.nombre} </h3>
                <div>
                    <p> Grado </p>
                    <p> ${data_integrante.grado} </p>
                </div>
                <div>
                    <p> Contacto </p>
                    <ul> 
                        <li> correo@dominio </li>
                        <li> correo@dominio </li>
                    </ul>
                </div>
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

    console.log("Resolve:: ", data_integrante)
    if (!data_integrante) return

    modal.style.display = ""

    // Se referencian los elementos del modal
    const elem_nombre = document.getElementsByClassName('modal__nombre')[0]
    const elem_grado = document.getElementsByClassName('modal__grado')[0]
    const elem_container_correos = document.getElementsByClassName('modal__container_correos')[0]
    const elem_container_lineas_aplicacion = document.getElementsByClassName('modal__conatiner_lineas_aplicacion')[0]
    const elem_container_proyectos = document.getElementsByClassName('modal__container_proyectos')[0]
    const elem_container_articulos = document.getElementsByClassName('modal__container_articulos')[0]

    // Se limpian los campos del modal
    elem_nombre.textContent = ""
    elem_grado.textContent = ""
    elem_container_correos.innerHTML = ""
    elem_container_lineas_aplicacion.innerHTML = ""
    elem_container_proyectos.innerHTML = ""    
    elem_container_articulos.innerHTML = ""

    // Se llenan los campos del modal
    elem_nombre.textContent = data_integrante.nombre
    elem_grado.textContent = data_integrante.grado

    data_integrante.correos.forEach(correo => {
        elem_container_correos.innerHTML += `<li> ${correo}</li>`
    })

    data_integrante.lineas_aplicacion.forEach(linea_aplicacion => {
        elem_container_lineas_aplicacion.innerHTML += `<li>${linea_aplicacion}</li>`
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
}

////////////  FUNCION PARA RECUPERAR UN INTEGRANTE DADO UN ID  ///////////
const obtenerIntegrante = (id) => data_integrantes.filter(data_integrante => data_integrante.id === id )[0]

// const obtenerIntegrante = (id) => {
//     console.log("Llego ID: ", id, "Tipo: ", typeof(id))
//     data_integrantes.filter(
//         data_integrante => {
//             if (data_integrante.id === id) {
//                 console.log("Devolviendo:: ", data_integrante)
//                 return data_integrante
//             } else {
//                 console.log("** ", data_integrante)
//             }
//         }
//     )
// }


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

