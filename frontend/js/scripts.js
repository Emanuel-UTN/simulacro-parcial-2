const API_URL = 'http://localhost:3000/libros';

const cargarLibros = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(libros => cargarTabla(libros));
}

function filtrarLibros(){
    const titulo = document.getElementById('filtro-titulo').value;

    fetch(API_URL + `/${titulo}`)
    .then(res => res.json())
    .then(libros => cargarTabla(libros));
}

cargarLibros()

function cargarTabla(libros){
    let contenido = ""

    libros.forEach(l => {
        contenido += `
        <tr>
            <td>${l.titulo}</td>
            <td>${l.autor}</td>
            <td>${l.genero}</td>
            <td>${l.editorial}</td>
            <td>${l.año_publicacion}</td>
        </tr>`;
    });

    document.getElementById('lista-libros').innerHTML = contenido;
}