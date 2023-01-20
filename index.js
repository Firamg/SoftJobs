const { registrarUsuario, verificarCredenciales, obtenerUsuario } = require("./consultas")
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require("jsonwebtoken")

app.listen(3000, console.log('Server UP!'))

app.use(express.json())
app.use(cors())

app.get("/usuarios", async (req, res) => {
    const usuarios = await obtenerUsuario()
    res.json(usuarios)
})
app.post("/usuarios", async (req, res) => {
    try {
        const usuario = req.body
        await registrarUsuario(usuario)
        res.send('Usuario agregado con exito!!')

    } catch (e) {
        res.status(500).send(e)
    }
})


//Funciona 
//ruta POST /login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        await verificarCredenciales(email, password)
        const token = jwt.sign({ email }, "az_AZ")
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})

//Arreglar- no me tira los lenguages
//ruta GET /usuarios
app.get("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        console.log(token)
        jwt.verify(token, "az_AZ")
        const { email} = jwt.decode(token)
        
        const usuario = await obtenerUsuario(id)
        console.log(usuario)
        res.send(`El usuario ${email} estudia el lenguage ${usuario.lenguage}`)
    } catch (e) {
        res.status(e.code || 500).send(e)
    }
})