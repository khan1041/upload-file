

const  express=require('express')
const db=require('./Datalocation/db')

const app=express()
const fs=require('fs')
const authmidelw=require('./mideleware/Auth-midelware')
const multer=require('multer')

const cors=require('cors')
const port=5000
app.use(express.json())
// const coursOption={
// origin:"http://localhost:3000        ",
// method:"GET,POST,PUT,DELETE,PATCH,HEAD   ",
// credentials:true,
// }
//app.use(express.static('public'))
app.set('view engine','ejs')
  

  //app.use(express.urlencoded({extended:false}))
  
const path=require('path')

app.use(express.urlencoded({extended:true}))

const templete=path.join(__dirname,'views')
const router=require('./router/auth-router')


app.use(cors())
app.use("/app/auth",router)






//------------------//
//uplode file code.$
//------------------//

const storage=multer.diskStorage({

destination:function(req,file,cb){
  cb(null,'public/uplods')
},

filename:function(req,file,cb){

  cb(null,Date.now()+"_"+file.originalname)

}
})


const uplode=multer({storage:storage})

 app.post('/uplod',uplode.single("file"),(req,res)=>{
    res.redirect('/')

 })



 app.get('/',(req,res)=>{

const uplodedirectory=path.join(__dirname,"public/uplods")
fs.readdir(uplodedirectory,(err,files)=>{

  if(err){
    console.log(err)

    return res.status(500).send("internal server")
  }
  else{
    res.render('index',{files:files})
    console.log('ok')
  }
})
})


//-------------//
////over code//
//-------------//


db().then(()=>{

  app.listen(port,()=>{

   console.log(`surver is running at port:${port}`)    

  })

})
























// const express=require("express")
// const router=require("./router/auth-router")
// const conectedDb=require("./skima/db")
// const app=express()
// app.use(express.json())
// app.use("app/auth",router)

// app.get("/",(req,res)=>{

//   res.send("Hello-world")
  
// })

// conectedDb().then(()=>{



// app.listen(5000,()=>{
//   console.log("ok")
// })

// })



