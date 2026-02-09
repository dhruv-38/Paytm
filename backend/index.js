import express from 'express';
import { router } from './routes';
import cors from 'cors'

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);
app.post("/signup",()=>{

})
app.post("/signin",()=>{

})
app.put("/update",()=>{

})

app.listen(3000);

