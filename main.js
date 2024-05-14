let alumnos = [];

let cont = 0

function cargarAlumno(nombre, edad, curso) {
    let persona = {
        nombre: nombre,
        edad: edad,
        curso: curso
    };

    alumnos.push(persona);
    // guardarAlumnos();
    mostrarAlumnos();
    guardarAlumnosEnJSON(); // intentar f
}

function cargarAlumnos() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            alumnos = data;
            mostrarAlumnos();
        })
        .catch(error => console.error('Error al cargar los alumnos:', error));
}

function mostrarAlumnos() {
    let output = "";
    alumnos.forEach(function (persona, index) {
        output += "<div>";
        output += "<h3>Alumno " + (index + 1) + "</h3>";
        output += "<p>Nombre: " + persona.nombre + "</p>";
        output += "<p>Edad: " + persona.edad + "</p>";
        output += "<p>Curso: " + persona.curso + "</p>";
        output += "<button class='btnEliminar' data-nombre='" + persona.nombre + "'>Eliminar</button>";
        output += "</div>";
    });
    document.getElementById("output").innerHTML = output;

    let btnsEliminar = document.getElementsByClassName("btnEliminar");
    for (let i = 0; i < btnsEliminar.length; i++) {
        btnsEliminar[i].addEventListener("click", function () {
            let nombre = this.getAttribute("data-nombre");
            eliminarAlumno(nombre);
            mostrarAlumnos();
        });
    }
}

window.onload = function () {
    cargarAlumnos();
};

function buscarAlumnoPorNombre(nombre, alumnos) {
    return alumnos.filter(function (persona) {
        return persona.nombre.toLowerCase() === nombre.toLowerCase();
    });
}

function buscarAlumnoPorCurso(curso, alumnos) {
    return alumnos.filter(function (persona) {
        return persona.curso.toLowerCase() === curso.toLowerCase();
    });
}

function eliminarAlumno(nombre) {
    alumnos = alumnos.filter(function (persona) {
        return persona.nombre.toLowerCase() !== nombre.toLowerCase();
    });
}

document.getElementById("alumnoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;
    let curso = document.getElementById("curso").value;
    cargarAlumno(nombre, edad, curso);
});

document.getElementById("btnBuscarNombre").addEventListener("click", function () {
    let nombreABuscar = document.getElementById("buscarNombre").value;
    fetch("data.json")
    .then(response => response.json())
    .then(resultadoBusqueda => {
        let alumnosEncontrados = buscarAlumnoPorNombre(nombreABuscar, resultadoBusqueda);
        if (alumnosEncontrados.length > 0) {
            let output = "";
            alumnosEncontrados.forEach(function (persona, index) {
                output += "<div>";
                output += "<h3>Resultado de la Búsqueda por Nombre:</h3>";
                output += "<p>Nombre: " + persona.nombre + "</p>";
                output += "<p>Edad: " + persona.edad + "</p>";
                output += "<p>Curso: " + persona.curso + "</p>";
                output += "</div>";
            });
            document.getElementById("output").innerHTML = output;
        } else {
            document.getElementById("output").innerHTML = "<p>No se encontró ningún alumno con ese nombre.</p>";
        }
    })
    .catch(error => console.error('Error al buscar alumno por nombre:', error));
});

document.getElementById("btnBuscarCurso").addEventListener("click", function () {
    let cursoABuscar = document.getElementById("buscarCurso").value;
    fetch("data.json")
    .then(response => response.json())
    .then(resultadoBusqueda => {
        let alumnosEncontrados = buscarAlumnoPorCurso(cursoABuscar, resultadoBusqueda);
        if (alumnosEncontrados.length > 0) {
            let output = "";
            alumnosEncontrados.forEach(function (persona, index) {
                output += "<div>";
                output += "<h3>Resultado de la Búsqueda por Curso:</h3>";
                output += "<p>Nombre: " + persona.nombre + "</p>";
                output += "<p>Edad: " + persona.edad + "</p>";
                output += "<p>Curso: " + persona.curso + "</p>";
                output += "</div>";
            });
            document.getElementById("output").innerHTML = output;
        } else {
            document.getElementById("output").innerHTML = "<p>No se encontraron alumnos en ese curso.</p>";
        }
    })
    .catch(error => console.error('Error al buscar alumno por curso:', error));
});

function mostrarTodos() {
    mostrarAlumnos();
}

document.getElementById("btnMostrarTodos").addEventListener("click", mostrarTodos);

mostrarAlumnos();


setInterval(()=> {
	Toastify({
		text: `${++cont}`,
	}).showToast()
}, 1000)

