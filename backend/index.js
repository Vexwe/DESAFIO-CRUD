import express from "express"
import cors from "cors"
import sequelize from "./db/conn.js"
import UserRoute from "./Routes/UserRoute.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/", UserRoute)

async function connect() {
    try{
        await sequelize.authenticate();
        await sequelize.sync()
        console.log("Conexão com Mysql feita com sucesso!")
    } catch(err){
        console.log("Conexão falha:", err)
    }
}
    await connect()

app.listen(3000, ()=>{
    console.log("funcionando")
})