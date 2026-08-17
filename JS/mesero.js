
// MESERO
// --- Obtener elementos del DOM ---

// Input donde el mesero ingresa cuántos platos quiere pedir
const nPlatosInput = document.getElementById("nPlatos");
// Contenedor donde se generan dinámicamente los selects de platos y cantidades
const contenedorPlatos = document.getElementById("contenedorPlatos");

// Input donde el mesero ingresa cuántas bebidas quiere pedir
const nBebidasInput = document.getElementById("nBebidas");
// Contenedor donde se generan dinámicamente los selects de bebidas y cantidades
const contenedorBebidas = document.getElementById("contenedorBebidas");

// Botón que ejecuta el cálculo del total del pedido
const btnCalcular = document.getElementById("btnCalcular");
// Párrafo donde se muestra el precio total calculado
const totalPedido = document.getElementById("totalPedido");
// Párrafo donde se muestran los mensajes de error de validación
const mensajeError = document.getElementById("mensajeError");

// --- Datos de platos y bebidas ---

// Objeto que almacena los precios de cada plato (nombre -> precio en pesos)
const preciosPlatos = {
    "Pollo asado": 30000,
    "Hamburguesa": 18000,
    "Sushi": 27500,
    "Pizza": 8000,
    "Perro caliente": 12000,
    "Salchipapa": 15000
};

// Lista de nombres de platos disponibles para el select
const opcionesPlatos = ["Pollo asado", "Hamburguesa", "Sushi", "Pizza", "Perro caliente", "Salchipapa"];

// Objeto que almacena los precios de cada bebida (nombre -> precio en pesos)
const preciosBebidas = {
    "Gaseosa": 5000,
    "Cerveza aguila": 5000,
    "Cerveza Poker": 5000,
    "Botella Agua": 5000
};

// Lista de nombres de bebidas disponibles para el select
const opcionesBebidas = ["Gaseosa", "Cerveza aguila", "Cerveza Poker", "Botella Agua"];

// Cuando el mesero cambia el número de platos a pedir, se crean los campos
nPlatosInput.addEventListener("change", function () {
    // Limpiar el contenedor por si ya tenía campos generados antes
    contenedorPlatos.innerHTML = "";
    // Limpiar mensajes de error y total al generar nuevos campos
    mensajeError.textContent = "";
    totalPedido.textContent = "$0";

    // Recorrer la cantidad de platos indicada y crear los campos para cada uno
    for (let i = 0; i < Number(nPlatosInput.value); i++) {

        // --- Crear label "Seleccionar plato X:" ---
        const idPlato = document.createElement("label");
        idPlato.textContent = "Seleccionar plato " + (i + 1) + ": ";
        idPlato.classList.add("orpla");

        // --- Crear select con las opciones de platos ---
        const selectPlato = document.createElement("select");
        selectPlato.name = "plato_" + i;          // nombre único por si se usa en un form
        selectPlato.id = "selectPlato_" + i;      // id único para acceder luego por getElementById
        selectPlato.classList.add("botm");

        // Agregar cada plato como opción dentro del select
        opcionesPlatos.forEach(opcion => {
            const opt = document.createElement("option");
            opt.value = opcion;       // valor enviado al form
            opt.textContent = opcion; // texto visible para el usuario
            selectPlato.appendChild(opt);
        });

        // --- Crear label "Cantidad:" ---
        const idCantidad = document.createElement("label");
        idCantidad.textContent = "Cantidad: ";
        idCantidad.classList.add("orpla");

        // --- Crear input numérico para la cantidad ---
        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.min = 1;                 // mínimo 1 plato
        inputCantidad.max = 100;               // máximo 100 platos
        inputCantidad.name = "cantidad_plato_" + i;
        inputCantidad.id = "cantidadPlato_" + i;

        // --- Agregar todos los elementos al contenedor ---
        contenedorPlatos.appendChild(document.createElement("br"));
        contenedorPlatos.appendChild(idPlato);
        contenedorPlatos.appendChild(document.createElement("br"));
        contenedorPlatos.appendChild(selectPlato);
        contenedorPlatos.appendChild(document.createElement("br"));
        contenedorPlatos.appendChild(idCantidad);
        contenedorPlatos.appendChild(inputCantidad);
        contenedorPlatos.appendChild(document.createElement("br"));
    }
});


// Cuando el mesero cambia el número de bebidas a pedir, se crean los campos
nBebidasInput.addEventListener("change", function () {
    contenedorBebidas.innerHTML = "";
    mensajeError.textContent = "";
    totalPedido.textContent = "$0";

    // Recorrer la cantidad de bebidas indicada y crear los campos para cada una
    for (let i = 0; i < Number(nBebidasInput.value); i++) {

        // --- Crear label "Seleccionar bebida X:" ---
        const idBebida = document.createElement("label");
        idBebida.textContent = "Seleccionar bebida " + (i + 1) + ": ";
        idBebida.classList.add("orpla");

        // --- Crear select con las opciones de bebidas ---
        const selectBebida = document.createElement("select");
        selectBebida.name = "bebida_" + i;
        selectBebida.id = "selectBebida_" + i;
        selectBebida.classList.add("botm");

        // Agregar cada bebida como opción dentro del select
        opcionesBebidas.forEach(opcion => {
            const opt = document.createElement("option");
            opt.value = opcion;
            opt.textContent = opcion;
            selectBebida.appendChild(opt);
        });

        // --- Crear label "Cantidad:" ---
        const idCantidad = document.createElement("label");
        idCantidad.textContent = "Cantidad: ";
        idCantidad.classList.add("orpla");

        // --- Crear input numérico para la cantidad ---
        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.min = 1;
        inputCantidad.max = 100;
        inputCantidad.name = "cantidad_bebida_" + i;
        inputCantidad.id = "cantidadBebida_" + i;

        // --- Agregar todos los elementos al contenedor ---
        contenedorBebidas.appendChild(document.createElement("br"));
        contenedorBebidas.appendChild(idBebida);
        contenedorBebidas.appendChild(document.createElement("br"));
        contenedorBebidas.appendChild(selectBebida);
        contenedorBebidas.appendChild(document.createElement("br"));
        contenedorBebidas.appendChild(idCantidad);
        contenedorBebidas.appendChild(inputCantidad);
        contenedorBebidas.appendChild(document.createElement("br"));
    }
});

// CÁLCULO DEL TOTAL DEL PEDIDO
// Al presionar el botón "Calcular total", se valida y suma todo el pedido
btnCalcular.addEventListener("click", function () {

    // --- Validación de platos ---
    const numPlatos = Number(nPlatosInput.value);

    // Verificar que se haya indicado una cantidad válida de platos
    if (!numPlatos || numPlatos <= 0) {
        mensajeError.textContent = "Debe ingresar el número de platos a pedir.";
        totalPedido.textContent = "$0";
        return; // detener ejecución si no hay platos
    }

    // --- Validación de bebidas ---
    const numBebidas = Number(nBebidasInput.value);

    // Verificar que se haya indicado una cantidad válida de bebidas
    if (!numBebidas || numBebidas <= 0) {
        mensajeError.textContent = "Debe ingresar el número de bebidas a pedir.";
        totalPedido.textContent = "$0";
        return; // detener ejecución si no hay bebidas
    }

    let total = 0;       // acumulador del precio total
    let hayError = false; // bandera para detectar errores en los elementos del DOM

    // --- Recorrer cada plato seleccionado y sumar su precio ---
    for (let i = 0; i < numPlatos; i++) {
        const selectPlato = document.getElementById("selectPlato_" + i);
        const inputCantidad = document.getElementById("cantidadPlato_" + i);

        // Si los elementos no existen (algo salió mal al generarlos)
        if (!selectPlato || !inputCantidad) {
            hayError = true;
            break;
        }

        const plato = selectPlato.value;          // nombre del plato seleccionado
        const cantidad = Number(inputCantidad.value); // cantidad ingresada

        // Validar que se haya seleccionado un plato
        if (!plato) {
            mensajeError.textContent = "Debe seleccionar el plato " + (i + 1) + ".";
            totalPedido.textContent = "$0";
            return;
        }

        // Validar que la cantidad sea mayor a cero
        if (!cantidad || cantidad <= 0) {
            mensajeError.textContent = "La cantidad del plato " + (i + 1) + " debe ser mayor a cero.";
            totalPedido.textContent = "$0";
            return;
        }

        // Sumar al total: precio del plato * cantidad pedida
        total += preciosPlatos[plato] * cantidad;
    }

    // --- Recorrer cada bebida seleccionada y sumar su precio ---
    for (let i = 0; i < numBebidas; i++) {
        const selectBebida = document.getElementById("selectBebida_" + i);
        const inputCantidad = document.getElementById("cantidadBebida_" + i);

        if (!selectBebida || !inputCantidad) {
            hayError = true;
            break;
        }

        const bebida = selectBebida.value;
        const cantidad = Number(inputCantidad.value);

        // Validar que se haya seleccionado una bebida
        if (!bebida) {
            mensajeError.textContent = "Debe seleccionar la bebida " + (i + 1) + ".";
            totalPedido.textContent = "$0";
            return;
        }

        // Validar que la cantidad sea mayor a cero
        if (!cantidad || cantidad <= 0) {
            mensajeError.textContent = "La cantidad de la bebida " + (i + 1) + " debe ser mayor a cero.";
            totalPedido.textContent = "$0";
            return;
        }

        // Sumar al total: precio de la bebida * cantidad pedida
        total += preciosBebidas[bebida] * cantidad;
    }

    // Si hubo algún error con los elementos del DOM, mostrar error genérico
    if (hayError) {
        mensajeError.textContent = "Error al procesar el pedido.";
        totalPedido.textContent = "$0";
        return;
    }

    // --- Mostrar el resultado ---
    mensajeError.textContent = "";
    totalPedido.textContent = "$" + total;
});
