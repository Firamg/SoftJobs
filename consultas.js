const bcrypt = require('bcryptjs')

const { Pool } = require('pg')
const pool = new Pool({
host: 'localhost',
user: 'postgres',
password: '1234',
database: 'softjobs',
allowExitOnIdle: true
})
/* const getData = async () => {
    const consulta="SELECT * FROM usuarios"
    const {rows:result} = await pool.query(consulta)
    console.log(result)
}
getData()
 */

const registrarUsuario=async(usuario)=>{
    try{let {email,password,rol,lenguage}=usuario

    console.log(usuario)
    const passwordEncriptada=bcrypt.hashSync(password)
    password=passwordEncriptada
    const values=[email,passwordEncriptada,rol,lenguage]
    const consulta="INSERT INTO usuarios VALUES (DEFAULT,$1,$2,$3,$4)"
    await pool.query(consulta,values)}catch(e){
        console.log(e)
        
    }


}
/* registrarUsuario({email:"e",password:"2",rol:"2",lenguage:"3"}) */


/* const verificarCredenciales2 = async (email, password) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2"
    const values = [email, password]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount)
    throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" }
    } */

const obtenerUsuario=async(id)=>{
    const values = [id]
    const consult=  "SELECT * FROM usuarios WHERE id=$1"
    const {rows:[usuario],rowCount}=await pool.query(consult,[id])
    if(!rowCount){
        throw { code: 404, message: "Email o contraseña incorrecta" }
        }

        delete usuario.password
        return usuario


    }
    


/* const registrarUsuario2 = async (usuario) => {
    let { email, password } = usuario
    const passwordEncriptada = bcrypt.hashSync(password)
    password = passwordEncriptada
    const values = [email, passwordEncriptada]
    const consulta = "INSERT INTO usuarios2 values (DEFAULT, $1, $2)"
    await pool.query(consulta, values)
    } */

    const verificarCredenciales = async (email, password) => {
        const values = [email]
        const consulta = "SELECT * FROM usuarios WHERE email = $1"
        const { rows: [usuario], rowCount } = await pool.query(consulta, values)
        const { password: passwordEncriptada } = usuario
        const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
        if (!passwordEsCorrecta || !rowCount)
        throw { code: 401, message: "Email o contraseña incorrecta" }
        }

module.exports={registrarUsuario,verificarCredenciales,obtenerUsuario}