const platos = document.getElementById("platos");
const contenedorNPlatos = document.getElementById("nPlatos");

platos.addEventListener("change", function(){
    contenedorNPlatos.innerHTML = ""; 
    for(let i = 0; i< Number(platos.value); i++){
        const idPlato = document.createElement("label");
        idPlato.textContent = "Seleccionar plato " + (i+1) + ": ";
        idPlato.classList.add("orpla");

        const selectPlato = document.createElement("select");
        selectPlato.name = "platos";
        selectPlato.classList.add("botm");

        const opciones = ["Pollo asado","Hamburguesa","Sushi","Pizza","Perro caliente","Salchipapa"]
            opciones.forEach(opcion => {
            const opt = document.createElement("option");
            opt.value = opcion;
            opt.textContent = opcion;
            selectPlato.appendChild(opt);
        });

        const idPlatos = document.createElement("label");
        const platos = document.createElement("input");
        idPlatos.textContent = "Cantidad: ";
        idPlatos.classList.add("orpla");
        
        platos.type = "number";
        platos.min = 1;
        platos.max = 100;
        platos.name = "cantidades";

        contenedorNPlatos.appendChild(document.createElement("br"));
        contenedorNPlatos.appendChild(idPlato);
        contenedorNPlatos.appendChild(document.createElement("br"));
        contenedorNPlatos.appendChild(selectPlato);
        contenedorNPlatos.appendChild(document.createElement("br"));
        contenedorNPlatos.appendChild(idPlatos);
        contenedorNPlatos.appendChild(platos);
        contenedorNPlatos.appendChild(document.createElement("br"));
    }
});