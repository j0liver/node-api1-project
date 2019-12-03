// implement your API here
const express = require('express')

const server = express()
server.use(express.json())
const db = require('./data/db')

server.get("/users", (req,res)=>{
    db.find()
    .then(users=>{
        if(users){
            res.status(200).json(users)
        } 
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})

server.post("/users", (req,res)=>{
    const body = req.body;
    db.insert(body)
    .then(user =>{
        if(body.name && body.bio){
            res.status(201).json(user)
        } else{
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    })
    .catch((err)=>{
        res.status(400).json(err)
    })
})

server.get('/users/:id', (req,res)=>{
    const id = req.params.id;

    db.findById(id)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err =>{
        res.status(404).json(err)
    })
})

server.delete('/users/:id', (req,res)=>{
    const id = req.params.id;
    db.remove(id)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

server.put('/users/:id', (req,res)=>{

    const user = req.body;
    const id = req.params.id;

    db.update(id, user)
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})

const PORT = 5000

server.listen(PORT, ()=>{console.log(`listening: ${PORT}`)})
