const express=require('express')
const {open}=require("sqlite")
const sqlite3=require("sqlite3")
const path=require("path")
const dbpath=path.join(__dirname,"x.db")
const app=express()
app.use(express.json())

let db=null
const x=async()=>{
    try{
       db=await open ({
        filename:dbpath,
        driver:sqlite3.Database
       })
       app.listen(3006,()=>{
        console.log("server is running at 3006")
       })
       
    }
    catch(e){
    console.log(e)
    }
}
x()
app.get("/",async(request,response)=>{
    
    const query=`select * from player
    ;`
    
    const y= await db.all(query)
    response.send(y)

})
app.get("/:z/",async(request,response)=>{
    const {z}=request.params
    const query=`select * from player
    where age= ${z};`
    
    const y= await db.get(query)
    response.send(y)

})
app.post("/play/",async(request,response)=>{
    const ye=request.body
    const {name,age}=ye
    const query=`insert into player
    values ('${name}',${age});`
    
    const y= await db.run(query)
    response.send(y)

})
app.put("/plays/",async(request,response)=>{
    const ye=request.body
    const {name,age}=ye
    const query=`update player
    set name='${name}'
    where age =${age};`
    
    const y= await db.run(query)
    response.send(y)

})
app.delete("/",async(request,response)=>{
    const query=`delete from player 
    where name like "charan";`
    const y= await db.run(query)
    response.send(y)

})