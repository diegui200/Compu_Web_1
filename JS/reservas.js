const personas = document.getElementById("personas");
const contenedorEdades = document.getElementById("edades");

personas.addEventListener("change", function(){
    contenedorEdades.innerHTML = "";
    for(let i = 0; i< Number(personas.value); i++){
        const edad = document.createElement("input");

        const idPersona = document.createElement("label");
        idPersona.textContent = "Edad de la persona " + (i+1) + ": ";

        edad.type = "number";
        edad.min = 1;
        edad.max = 100;
        edad.name = "edades";

        idPersona.classList.add("orpla");
        edad.classList.add("botm");
        
        contenedorEdades.appendChild(idPersona);
        contenedorEdades.appendChild(edad);
        contenedorEdades.appendChild(document.createElement("br"));
    }
});