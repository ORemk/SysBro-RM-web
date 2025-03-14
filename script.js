document.addEventListener("DOMContentLoaded", cargarRegistros);

// Función para agregar un nuevo producto
function agregarRegistro(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    let nombre = document.getElementById("nombre-producto").value;
    let cantidad = document.getElementById("cantidad").value;
    let precio = document.getElementById("precio").value;
    let imagen = document.getElementById("imagen").files[0];
    
    // Verificar si se ha seleccionado una imagen
    let imagenData = imagen ? URL.createObjectURL(imagen) : ''; // Si no se selecciona imagen, se guarda vacío

    // Verificar si todos los campos requeridos están completos
    if (nombre && cantidad && precio) {
        let registros = JSON.parse(localStorage.getItem("inventario")) || [];
        // Verificar si el nombre del producto ya existe en los registros
        if (registros.some(registro => registro.nombre === nombre)) {
            alert("Este producto ya está registrado.");
            return; // Si el producto ya existe, no agregamos el registro
        }
        registros.push({ nombre, cantidad, precio, imagen: imagenData });
        localStorage.setItem("inventario", JSON.stringify(registros));
        cargarRegistros(); // Recargar los registros de la tabla
    } else {
        alert("Por favor, complete todos los campos requeridos.");
    }
}

// Función para cargar los productos desde localStorage
function cargarRegistros() {
    let registros = JSON.parse(localStorage.getItem("inventario")) || [];
    let tablaBody = document.getElementById("tabla-body");
    tablaBody.innerHTML = ""; // Limpiar la tabla antes de mostrar los registros

    // Agregar cada registro como una fila en la tabla
    registros.forEach((registro, index) => {
        let row = `<tr>
            <td><img src="${registro.imagen}" alt="Imagen de producto" style="width: 50px; height: 50px;"></td>
            <td>${registro.nombre}</td>
            <td>${registro.cantidad}</td>
            <td>${registro.precio}</td>
            <td>
                <button class="btn-modificar" onclick="modificarRegistro(${index})">Modificar</button>
                <button class="btn-eliminar" onclick="eliminarRegistro(${index})">Eliminar</button>
            </td>
        </tr>`;
        tablaBody.innerHTML += row; // Añadir la fila a la tabla
    });
}

// Función para modificar un registro
function modificarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("inventario"));
    let registro = registros[index];
    let nuevoNombre = prompt("Nuevo nombre:", registro.nombre);
    let nuevaCantidad = prompt("Nueva cantidad:", registro.cantidad);
    let nuevoPrecio = prompt("Nuevo precio:", registro.precio);

    if (nuevoNombre && nuevaCantidad && nuevoPrecio) {
        registros[index] = { ...registro, nombre: nuevoNombre, cantidad: nuevaCantidad, precio: nuevoPrecio };
        localStorage.setItem("inventario", JSON.stringify(registros));
        cargarRegistros();
    } else {
        alert("Todos los campos deben ser completados para modificar el producto.");
    }
}

// Función para eliminar un registro
function eliminarRegistro(index) {
    let registros = JSON.parse(localStorage.getItem("inventario"));
    registros.splice(index, 1); // Eliminar el registro por su índice
    localStorage.setItem("inventario", JSON.stringify(registros)); // Guardar los cambios en localStorage
    cargarRegistros(); // Recargar los registros de la tabla
}

// Agregar el evento de submit al formulario para agregar un producto
document.getElementById("formulario-inventario").addEventListener("submit", agregarRegistro);
