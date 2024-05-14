
const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite', // Ruta donde se guardará el archivo de la base de datos
  });

const Libro = sequelize.define('Libro', {
    id: {
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    titulo: { type: DataTypes.STRING },
    autor: { type: DataTypes.STRING },
    genero: { type: DataTypes.STRING },
    año_publicacion: { type: DataTypes.NUMBER },
    editorial: { type: DataTypes.STRING },
},
{
    timestamps: false
})

async function inicializarBaseDeDatos() {
    await sequelize.sync({ force: true });
    await Libro.bulkCreate([
        { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", año_publicacion: 1967, editorial: "Sudamericana" },
        { id: 2, titulo: "1984", autor: "George Orwell", genero: "Distopía", año_publicacion: 1949, editorial: "Secker & Warburg" },
        { id: 3, titulo: "El señor de los anillos", autor: "J.R.R. Tolkien", genero: "Fantasía épica", año_publicacion: 1954, editorial: "Allen & Unwin" },
        { id: 4, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", genero: "Novela satírica", año_publicacion: 1605, editorial: "Juan de la Cuesta" },
        { id: 5, titulo: "Harry Potter y la piedra filosofal", autor: "J.K. Rowling", genero: "Fantasía", año_publicacion: 1997, editorial: "Bloomsbury" },
        { id: 6, titulo: "Orgullo y prejuicio", autor: "Jane Austen", genero: "Novela romántica", año_publicacion: 1813, editorial: "T. Egerton" },
        { id: 7, titulo: "El amor en los tiempos del cólera", autor: "Gabriel García Márquez", genero: "Novela romántica", año_publicacion: 1985, editorial: "Oveja Negra" },
        { id: 8, titulo: "Moby Dick", autor: "Herman Melville", genero: "Novela de aventuras", año_publicacion: 1851, editorial: "Richard Bentley" },
        { id: 9, titulo: "La Odisea", autor: "Homero", genero: "Epopeya", año_publicacion: "Siglo VIII a.C.", editorial: "Desconocida" },
        { id: 10, titulo: "El retrato de Dorian Gray", autor: "Oscar Wilde", genero: "Novela filosófica", año_publicacion: 1890, editorial: "Lippincott's Monthly Magazine" }
    ]);
}

//desarrolle su servidor backend aqui
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

const PORT = 3000;

app.get('/libros', async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.status(200).json(libros)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/libros/:titulo', async (req, res) => {
    try {
        const titulo = req.params.titulo;
        
        const libros = await Libro.findAll({ where: {
            titulo: { [Op.substring]: titulo}
        }});
        res.status(200).json(libros)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

inicializarBaseDeDatos();

app.listen(PORT, () => console.log('Servidor corriendo en http://localhost:' + PORT))