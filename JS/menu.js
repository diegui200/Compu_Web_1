// MENU

// Manejo de eventos: los botones de categoría y el botón "Buscar" llaman
// a las funciones de filtrado cuando el usuario les da click
window.onload = function () {
    document.getElementById("btnBuscar").onclick = aplicarFiltros;
    document.getElementById("btnTodos").onclick = function () { filtrarPorCategoria("todos"); };
    document.getElementById("btnAlmuerzo").onclick = function () { filtrarPorCategoria("almuerzo"); };
    document.getElementById("btnPlatoFuerte").onclick = function () { filtrarPorCategoria("plato fuerte"); };
    document.getElementById("btnComidaRapida").onclick = function () { filtrarPorCategoria("comida rapida"); };
    document.getElementById("btnBebida").onclick = function () { filtrarPorCategoria("bebida"); };
};

// Guarda la categoría que se haya seleccionado
let categoriaActual = "todos";

// Manipulación del DOM
// Revisa cada plato/bebida y decide si se muestra o se oculta, según:
// 1. La categoría activa (categoriaActual)
// 2. El texto que se haya escrito en el buscador
function aplicarFiltros() {
    const texto = document.getElementById("buscarPlato").value.toLowerCase();
    const items = document.querySelectorAll(".caja");

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const nombre = item.querySelector(".plato").innerHTML.toLowerCase();
        const categoria = item.getAttribute("data-categoria");

        const coincideCategoria = (categoriaActual === "todos") || (categoria === categoriaActual);
        const coincideNombre = nombre.indexOf(texto) !== -1;

        if (coincideCategoria && coincideNombre) {
            item.style.display = "inline-block";
        } else {
            item.style.display = "none";
        }
    }
}

function filtrarPorCategoria(categoria) {
    categoriaActual = categoria;
    aplicarFiltros();
}