const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { request } = require('http')
const PORT = process.env.PORT || 3000
const fspromises = require('fs').promises
const fs = require('fs')



app.use(cors())
app.use( (request , response , next) =>{
    console.log(`${request.method} ${request.headers.origin} ${request.path}`)
    next()
})
app.use(express.urlencoded( {extended : false}))
app.use(express.json())
app.use(express.static(path.join(__dirname , './public')))

app.get('^/$|index(.html)?' , (request , response) =>{
    response.sendFile(path.join(__dirname , 'index.html'));
})

app.get('/data(.js)?' , (request , response) =>{
    response.json(data.json());
})


// app.get('/*' , (request , response) =>{
//     response.status(404).sendFile(path.join(__dirname , '404.html'))
// })

app.all('*' , (request , response) =>{
    response.status(404);
    if(request.accepts('html')){
        response.sendFile(path.join(__dirname , '404.html'))
    }
    else if(request.accepts('json')){
        response.json({"Error" : "404 Not Found"})
    }
    else{
        response.type('txt').send("404 Not Found");
    }
})

app.listen(PORT , (error) =>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Server is Running in the PORT : " + PORT)
    }
})