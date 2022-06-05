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
                <button onclick={'mostrar_modal_integrante'}> Ver más </button>
            </div>
        </div>`    
});


function mostrar_modal_integrante() {
    alert("Se muestra el integrante con ID: ")
}


