import express from 'express';

const PORT = 3000;

const server = express();

server.get('/', (req, res)=> {
    res.send("My first route using Express.js")
})

server.listen(PORT, ()=> {
    console.log(`Server started on ${PORT}`);
})