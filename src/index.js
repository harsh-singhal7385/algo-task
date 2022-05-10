import fs from 'fs'
import express from "express";
import bodyParser from "body-parser";
import path , { dirname } from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = "5000";
let state;
let state_condition;
let message
let status_state

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'..', 'templates')); 

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname,'..', 'public')))


app.get("/",(req,res)=>{
    res.render('../templates/index',{
        data : []
    })
    
})

app.post("/postdata", (req,res)=>{
    let body = req.body
    console.log(body)
    let  d = JSON.parse(JSON.stringify(body))
    
     fs.readFile('./customer.json','utf-8',(err,data) => {
        if (err){
            console.log(err)
        }else{
            if(data.length==0){
                console.log(" data absent")
                let arr = []
                arr.push(d)
                fs.writeFile('./customer.json',JSON.stringify(arr),(err)=>{
                    console.log("data length = 0, condition , appended data success")
                })
            
            }else{
                console.log("data present")
                console.log(data)
                let arr = JSON.parse(data)
                console.log(typeof(arr))
                for(let a of arr){
                    console.log(a)
                }
                
                arr.push(d)
                fs.writeFile('./customer.json',JSON.stringify(arr),(err)=>{
                    console.log("data length = 1, condition , appended data success")
                })
            }
    } 
    })
  
    res.redirect("/")
})


app.get("/getdata",(req,res)=>{
    let arr = []
    fs.readFile('./customer.json','utf-8',(err,data) => {
        
        if (err){
            console.log(err)
        }else{
            if(data.length==0){
                console.log(" data absent")
                res.render('../templates/load',{
                    data : arr
                })
            }else{
                console.log("data present")
                arr = JSON.parse(data)
                // console.log(arr.length)
                // console.log(arr[0])
                res.render('../templates/load',{
                    data : arr
                })
            }
        } 
    })

})

app.get("/deleterow",(req,res)=>{
    // console.log(id)
    console.log(" inside delete row")
    console.log(req.body)
    console.log(req)
    res.render('../templates/load',{
        data : []
    })
})
 
app.listen(port,(req,res)=>{
    console.log(`hi in port ${port} server running`)
    
})

