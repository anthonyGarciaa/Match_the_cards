import express from "express";
import path from "path";
import cors from "cors"
import morgan from "morgan";
import helmet from "helmet";


const puerto=process.env.port || 3000;
const app=express();


app.use(cors()) 
app.use(morgan("dev"));
app.use(helmet())

app.set("views",path.resolve("./views"));
app.set("view engine","pug");

app.use(express.static(path.resolve("public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/",(req,res)=>{
    res.render("une_las_cartas",{title:"une las cartas"})
});

app.listen(puerto,()=>{
    console.log(`Servidor corriendo en: http://localhost:${puerto} `)
})